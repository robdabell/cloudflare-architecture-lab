import { createRemoteJWKSet, jwtVerify } from "jose";
import {
  AuthenticationError,
  identitySchema,
  roleSchema,
  type Identity,
  type IdentityProvider,
  type Role,
} from "./identity";

type AccessClaims = { sub?: unknown; email?: unknown; type?: unknown };

export class LocalIdentityProvider implements IdentityProvider {
  constructor(private readonly encodedIdentity?: string) {}

  async authenticate(): Promise<Identity> {
    if (!this.encodedIdentity)
      throw new AuthenticationError("Local identity is not configured.");
    let value: unknown;
    try {
      value = JSON.parse(this.encodedIdentity);
    } catch {
      throw new AuthenticationError("Local identity data is malformed.");
    }
    const parsed = identitySchema.safeParse(value);
    if (!parsed.success)
      throw new AuthenticationError("Local identity data is malformed.");
    return parsed.data;
  }
}

export class AccessIdentityProvider implements IdentityProvider {
  private readonly jwks;
  private readonly issuer: string;
  private readonly roleMap: Record<string, Role>;

  constructor(
    teamDomain: string,
    private readonly audience: string,
    roleMapJson?: string,
  ) {
    const domain = teamDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");
    if (!domain || !audience)
      throw new AuthenticationError("Cloudflare Access is not configured.");
    this.issuer = `https://${domain}`;
    this.jwks = createRemoteJWKSet(
      new URL(`${this.issuer}/cdn-cgi/access/certs`),
    );
    try {
      const raw = JSON.parse(roleMapJson ?? "{}") as Record<string, unknown>;
      this.roleMap = Object.fromEntries(
        Object.entries(raw).map(([email, role]) => {
          const parsed = roleSchema.safeParse(role);
          if (!parsed.success) throw new Error();
          return [email.toLowerCase(), parsed.data];
        }),
      );
    } catch {
      throw new AuthenticationError("ACCESS_ROLE_MAP is malformed.");
    }
  }

  async authenticate(request: Request): Promise<Identity> {
    const token = request.headers.get("cf-access-jwt-assertion");
    if (!token)
      throw new AuthenticationError("Cloudflare Access identity is required.");
    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: this.issuer,
        audience: this.audience,
        algorithms: ["RS256"],
      });
      const claims = payload as AccessClaims;
      if (
        claims.type !== "app" ||
        typeof claims.sub !== "string" ||
        typeof claims.email !== "string"
      ) {
        throw new Error();
      }
      const role = this.roleMap[claims.email.toLowerCase()];
      if (!role) throw new Error();
      return identitySchema.parse({
        id: claims.sub,
        email: claims.email,
        role,
      });
    } catch (error) {
      if (error instanceof AuthenticationError) throw error;
      throw new AuthenticationError("Cloudflare Access identity is invalid.");
    }
  }
}
