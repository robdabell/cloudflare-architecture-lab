import { useEffect, useState } from "react";
import { Archive, DatabaseZap, RefreshCw, Send } from "lucide-react";
import type { TechnologyLabState } from "@/shared/contracts";
import { PageHeader } from "../components/architecture-lab/PageHeader";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { api } from "../lib/api";

export function TechnologyPlaygroundPage() {
  const [state, setState] = useState<TechnologyLabState>();
  const [label, setLabel] = useState("hello from the local lab");
  const [trace, setTrace] = useState<Record<string, unknown>>();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  async function refresh() {
    try {
      setState(await api.getTechnologyState());
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Could not load lab state.",
      );
    }
  }
  useEffect(() => {
    let active = true;
    api
      .getTechnologyState()
      .then((data) => {
        if (active) setState(data);
      })
      .catch((cause: unknown) => {
        if (active)
          setError(
            cause instanceof Error
              ? cause.message
              : "Could not load lab state.",
          );
      });
    return () => {
      active = false;
    };
  }, []);

  async function run(
    name: string,
    operation: () => Promise<Record<string, unknown>>,
  ) {
    setBusy(name);
    setError("");
    try {
      setTrace(await operation());
      await new Promise((resolve) => setTimeout(resolve, 1200));
      await refresh();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Demo operation failed.",
      );
    } finally {
      setBusy("");
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Local Cloudflare emulation"
        title="Technology Playground"
        description="Invoke real Worker bindings locally, inspect their state, and follow an asynchronous message from HTTP request to Queue consumer."
        action={
          <Button
            type="button"
            className="bg-muted text-foreground"
            onClick={() => void refresh()}
          >
            <RefreshCw className="mr-2 size-4" aria-hidden /> Refresh
          </Button>
        }
      />
      <Card className="mb-5 border-warning/30 bg-warning/10 text-sm">
        <strong>Local only.</strong> Miniflare is emulating KV, R2, and Queues
        on this machine. No Cloudflare account resource or network service is
        being used yet.
      </Card>
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-xl bg-destructive/10 p-3 text-destructive"
        >
          {error}
        </p>
      )}
      <label className="mb-5 block max-w-xl text-sm font-semibold">
        Payload label
        <Input
          className="mt-2"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
        />
      </label>
      <div className="grid gap-4 lg:grid-cols-3">
        <DemoCard
          icon={DatabaseZap}
          title="Workers KV"
          description="Read a counter by key, increment it, and write the JSON value back. Deployed KV is globally distributed and eventually consistent."
          value={`${state?.kv.counter ?? 0} increments`}
          button="Run get → put"
          busy={busy === "kv"}
          onClick={() => void run("kv", api.incrementKvCounter)}
        />
        <DemoCard
          icon={Archive}
          title="R2 Object Storage"
          description="Write a JSON object with HTTP and custom metadata, then list objects by prefix without exposing the bucket to the browser."
          value={`${state?.r2.objects.length ?? 0} objects`}
          button="Put an object"
          busy={busy === "r2"}
          onClick={() => void run("r2", () => api.createR2Object(label))}
        />
        <DemoCard
          icon={Send}
          title="Cloudflare Queues"
          description="Return HTTP 202 after enqueueing. A separate consumer invocation writes a receipt to R2 and completion state to KV."
          value={state?.queue.recent[0]?.status ?? "No messages"}
          button="Send message"
          busy={busy === "queue"}
          onClick={() => void run("queue", () => api.sendQueueMessage(label))}
        />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-semibold">Last HTTP operation</h2>
          <pre className="mt-3 max-h-80 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-200">
            {JSON.stringify(
              trace ?? { hint: "Run a demo to inspect its response." },
              null,
              2,
            )}
          </pre>
        </Card>
        <Card>
          <h2 className="font-semibold">Observable state</h2>
          <div className="mt-3 space-y-3 text-sm">
            {state?.queue.recent.map((item) => (
              <div key={item.id} className="rounded-xl bg-muted p-3">
                <strong>{item.label}</strong>
                <p className="text-muted-foreground">
                  Queue status: {item.status}
                </p>
              </div>
            ))}
            {state?.r2.objects.slice(0, 5).map((object) => (
              <div key={object.key} className="rounded-xl bg-muted p-3">
                <strong className="break-all">{object.key}</strong>
                <p className="text-muted-foreground">
                  {object.size} bytes in R2
                </p>
              </div>
            ))}
            {!state?.queue.recent.length && !state?.r2.objects.length && (
              <p className="text-muted-foreground">
                Run an R2 or Queue demo to create state.
              </p>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

function DemoCard({
  icon: Icon,
  title,
  description,
  value,
  button,
  busy,
  onClick,
}: {
  icon: typeof Archive;
  title: string;
  description: string;
  value: string;
  button: string;
  busy: boolean;
  onClick: () => void;
}) {
  return (
    <Card>
      <Icon className="size-7 text-accent" aria-hidden />
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <p className="mt-2 min-h-20 text-sm text-muted-foreground">
        {description}
      </p>
      <p className="mt-4 text-2xl font-bold">{value}</p>
      <Button
        type="button"
        className="mt-4 w-full"
        disabled={busy}
        onClick={onClick}
      >
        {busy ? "Running…" : button}
      </Button>
    </Card>
  );
}
