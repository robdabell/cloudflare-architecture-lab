import { z } from "zod";

export const roles = [
  "Viewer",
  "Architect",
  "Publisher",
  "Administrator",
] as const;
export const roleSchema = z.enum(roles);
export type Role = z.infer<typeof roleSchema>;

export const identitySchema = z.object({
  id: z.string().trim().min(1).max(200),
  email: z.string().email(),
  role: roleSchema,
});
export type Identity = z.infer<typeof identitySchema>;

export interface IdentityProvider {
  authenticate(request: Request): Promise<Identity>;
}

export class AuthenticationError extends Error {}
export class AuthorizationError extends Error {}

export const canWriteProjects = (identity: Identity) =>
  identity.role === "Architect" || identity.role === "Administrator";
