import { PageHeader } from "../components/architecture-lab/PageHeader";
import { EmptyState } from "../components/architecture-lab/EmptyState";
export function AssistantPage() {
  return (
    <>
      <PageHeader
        title="Architecture assistant"
        description="This navigation destination is reserved for a later, source-backed capability."
      />
      <EmptyState
        title="Not configured"
        description="Workers AI, AI Gateway, and Vectorize are deliberately outside this vertical slice. No assistant requests are sent."
      />
    </>
  );
}
