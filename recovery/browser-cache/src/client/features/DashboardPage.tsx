import { FolderKanban, Globe2, PawPrint, PencilRuler } from "lucide-react";
import { Link } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { MetricCard } from "../components/architecture-lab/MetricCard";
import { PageHeader } from "../components/architecture-lab/PageHeader";
import { Card } from "../components/ui/card";
import { useProjects } from "../hooks/useProjects";
export function DashboardPage() {
  const { projects, loading, error } = useProjects();
  const statuses = ["draft", "review", "published"].map((name) => ({
    name,
    value: projects.filter((p) => p.status === name).length,
  }));
  return (
    <>
      <PageHeader
        eyebrow="Workspace overview"
        title="Good architecture, made visible."
        description="Track projects, inspect system boundaries, and understand the Cloudflare services supporting this workspace."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          label="Projects"
          value={loading ? "—" : projects.length}
          icon={FolderKanban}
        />
        <MetricCard
          label="Published"
          value={
            loading
              ? "—"
              : projects.filter((p) => p.status === "published").length
          }
          icon={Globe2}
        />
        <MetricCard
          label="In progress"
          value={
            loading
              ? "—"
              : projects.filter((p) => p.status !== "published").length
          }
          icon={PencilRuler}
        />
      </div>
      <Link
        to="/pet-match"
        className="mt-6 flex min-h-20 items-center gap-4 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-white">
          <PawPrint className="size-6" aria-hidden />
        </span>
        <span>
          <strong className="block">Try the Pet Match sample</strong>
          <span className="text-sm text-muted-foreground">
            Find a companion that fits your space, time, and energy.
          </span>
        </span>
      </Link>
      <Card className="mt-6">
        <h2 className="text-lg font-semibold">Project status</h2>
        <p className="text-sm text-muted-foreground">
          Current portfolio distribution
        </p>
        {error ? (
          <p role="alert" className="mt-8 text-destructive">
            {error}
          </p>
        ) : (
          <div className="h-64" data-testid="status-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statuses}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                >
                  {["#64748b", "#d97706", "#15803d"].map((fill) => (
                    <Cell key={fill} fill={fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </>
  );
}
