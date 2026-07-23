import { useMemo, useState } from "react";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/architecture-lab/PageHeader";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { matchPets, type PetPreferences } from "../lib/petMatcher";

const initialPreferences: PetPreferences = {
  home: "compact",
  time: "moderate",
  energy: "balanced",
  allergies: false,
  noise: "quiet",
  experience: "first-time",
};

const fieldClass =
  "mt-2 min-h-11 w-full rounded-xl border border-border bg-surface px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function PetMatchPage() {
  const [preferences, setPreferences] = useState(initialPreferences);
  const matches = useMemo(() => matchPets(preferences), [preferences]);
  const best = matches[0];

  return (
    <>
      <PageHeader
        eyebrow="Sample application"
        title="Find your pet match"
        description="Tell us what everyday life looks like and get a friendly, explainable shortlist—no mysterious algorithm or AI guesswork."
        action={
          <Button
            type="button"
            className="bg-muted text-foreground"
            onClick={() => setPreferences(initialPreferences)}
          >
            <RotateCcw className="mr-2 size-4" aria-hidden />
            Reset
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(300px,0.85fr)_minmax(0,1.15fr)]">
        <Card>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-accent/15 text-accent">
              <Heart className="size-5" aria-hidden />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Your lifestyle</h2>
              <p className="text-sm text-muted-foreground">
                Results update as you answer.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <label className="text-sm font-semibold">
              Living space
              <select
                className={fieldClass}
                value={preferences.home}
                onChange={(event) =>
                  setPreferences({
                    ...preferences,
                    home: event.target.value as PetPreferences["home"],
                  })
                }
              >
                <option value="compact">Flat or compact home</option>
                <option value="spacious">Spacious home</option>
                <option value="outdoor">Home with outdoor space</option>
              </select>
            </label>

            <label className="text-sm font-semibold">
              Daily care time
              <select
                className={fieldClass}
                value={preferences.time}
                onChange={(event) =>
                  setPreferences({
                    ...preferences,
                    time: event.target.value as PetPreferences["time"],
                  })
                }
              >
                <option value="low">Under 30 minutes</option>
                <option value="moderate">30–90 minutes</option>
                <option value="high">More than 90 minutes</option>
              </select>
            </label>

            <label className="text-sm font-semibold">
              Preferred energy
              <select
                className={fieldClass}
                value={preferences.energy}
                onChange={(event) =>
                  setPreferences({
                    ...preferences,
                    energy: event.target.value as PetPreferences["energy"],
                  })
                }
              >
                <option value="calm">Calm companion</option>
                <option value="balanced">A little of both</option>
                <option value="active">Active sidekick</option>
              </select>
            </label>

            <label className="text-sm font-semibold">
              Sound tolerance
              <select
                className={fieldClass}
                value={preferences.noise}
                onChange={(event) =>
                  setPreferences({
                    ...preferences,
                    noise: event.target.value as PetPreferences["noise"],
                  })
                }
              >
                <option value="quiet">Prefer a quiet home</option>
                <option value="flexible">Some noise is fine</option>
              </select>
            </label>

            <label className="text-sm font-semibold">
              Pet experience
              <select
                className={fieldClass}
                value={preferences.experience}
                onChange={(event) =>
                  setPreferences({
                    ...preferences,
                    experience: event.target
                      .value as PetPreferences["experience"],
                  })
                }
              >
                <option value="first-time">First-time pet carer</option>
                <option value="experienced">Experienced pet carer</option>
              </select>
            </label>

            <label className="flex min-h-11 items-center gap-3 rounded-xl border border-border bg-muted/50 px-3 text-sm font-semibold">
              <input
                type="checkbox"
                className="size-5 accent-accent"
                checked={preferences.allergies}
                onChange={(event) =>
                  setPreferences({
                    ...preferences,
                    allergies: event.target.checked,
                  })
                }
              />
              Fur allergies are a concern
            </label>
          </div>
        </Card>

        <section aria-live="polite">
          <Card className="overflow-hidden border-primary bg-primary text-primary-foreground">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-orange-300">
                  <Sparkles className="size-4" aria-hidden /> Best match
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  {best.emoji} {best.name}
                </h2>
                <p className="mt-2 text-sm text-slate-300">{best.watchOut}</p>
              </div>
              <div className="grid size-16 shrink-0 place-items-center rounded-full bg-white/10 text-xl font-bold">
                {best.score}%
              </div>
            </div>
            <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-3">
              {best.reasons.map((reason) => (
                <li key={reason} className="rounded-xl bg-white/10 p-3">
                  {reason}
                </li>
              ))}
            </ul>
          </Card>

          <h2 className="mb-3 mt-6 text-lg font-semibold">Your shortlist</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {matches.slice(1, 5).map((match) => (
              <Card key={match.id} className="flex items-center gap-4 p-4">
                <span className="text-3xl" aria-hidden>
                  {match.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">{match.name}</h3>
                    <span className="text-sm font-bold text-accent">
                      {match.score}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${match.score}%` }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-4 bg-muted/50 text-sm text-muted-foreground">
            This is a conversation starter, not a welfare guarantee. Meet
            individual animals, check tenancy rules and allergies, and talk to a
            reputable rescue or vet before choosing. The sample architecture is
            modelled in the{" "}
            <Link
              className="font-semibold text-accent underline underline-offset-4"
              to="/projects/pet-match"
            >
              Pet Match project
            </Link>
            .
          </Card>
        </section>
      </div>
    </>
  );
}
