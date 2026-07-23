import {
  Archive,
  Database,
  ListRestart,
  PackageOpen,
  Server,
  TableProperties,
} from "lucide-react";
import { CapabilityCard } from "../components/architecture-lab/CapabilityCard";
import { PageHeader } from "../components/architecture-lab/PageHeader";
export function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform transparency"
        title="Cloudflare capabilities"
        description="Only services configured for this vertical slice are shown here. Planned extension points are documented, not presented as active."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <CapabilityCard
          name="Workers"
          icon={Server}
          description="One full-stack Worker owns API routing, policy, and the application boundary."
        />
        <CapabilityCard
          name="Workers Static Assets"
          icon={PackageOpen}
          description="The Vite-built React application is served alongside the Worker."
        />
        <CapabilityCard
          name="D1"
          icon={Database}
          description="Relational project records and architecture nodes live in the configured database binding."
        />
        <CapabilityCard
          name="Workers KV"
          icon={TableProperties}
          description="The Technology Playground exposes key-value reads and writes and explains deployed eventual consistency."
        />
        <CapabilityCard
          name="R2"
          icon={Archive}
          description="The local object-store emulator persists JSON artifacts and asynchronous queue receipts."
        />
        <CapabilityCard
          name="Queues"
          icon={ListRestart}
          description="HTTP requests enqueue messages for a separate consumer invocation with observable completion state."
        />
      </div>
    </>
  );
}
