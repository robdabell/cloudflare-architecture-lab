import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ProjectDetail, ProjectInput } from "@/shared/contracts";
import { ArchitectureCanvas } from "../components/architecture-lab/ArchitectureCanvas";
import { PageHeader } from "../components/architecture-lab/PageHeader";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { api } from "../lib/api";
export function ProjectDetailPage() {
  const { id = "" } = useParams();
  const [project, setProject] = useState<ProjectDetail>();
  const [form, setForm] = useState<ProjectInput>();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    api
      .getProject(id)
      .then((data) => {
        setProject(data);
        setForm(data);
      })
      .catch((e: Error) => setError(e.message));
  }, [id]);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    try {
      await api.updateProject(id, form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.");
    }
  }
  if (error && !project)
    return (
      <p role="alert" className="text-destructive">
        {error}
      </p>
    );
  if (!project || !form)
    return <p className="text-muted-foreground">Loading project…</p>;
  return (
    <>
      <PageHeader
        eyebrow="Project workspace"
        title={project.name}
        description="Edit core details and inspect the stored architecture nodes."
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <section>
          <h2 className="mb-3 text-lg font-semibold">Architecture explorer</h2>
          {project.nodes.length ? (
            <ArchitectureCanvas nodes={project.nodes} />
          ) : (
            <Card className="text-muted-foreground">
              No architecture nodes have been stored for this project.
            </Card>
          )}
        </section>
        <Card>
          <form onSubmit={save}>
            <h2 className="text-lg font-semibold">Project details</h2>
            <label className="mt-4 block text-sm font-semibold">
              Name
              <Input
                className="mt-1"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="mt-4 block text-sm font-semibold">
              Summary
              <Textarea
                className="mt-1"
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
              />
            </label>
            <label className="mt-4 block text-sm font-semibold">
              Status
              <select
                className="mt-1 min-h-11 w-full rounded-xl border border-border bg-surface px-3"
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as ProjectInput["status"],
                  })
                }
              >
                <option value="draft">Draft</option>
                <option value="review">In review</option>
                <option value="published">Published</option>
              </select>
            </label>
            {error && (
              <p role="alert" className="mt-3 text-sm text-destructive">
                {error}
              </p>
            )}
            <Button className="mt-5 w-full" type="submit">
              {saved ? "Saved" : "Save changes"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
