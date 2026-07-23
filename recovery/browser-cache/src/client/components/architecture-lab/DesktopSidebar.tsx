import { Cloud, FolderKanban, Home, Network, PawPrint } from "lucide-react";
import { NavLink } from "react-router-dom";
const items = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/explore", label: "Explorer", icon: Network },
  { to: "/pet-match", label: "Pet Match", icon: PawPrint },
  { to: "/capabilities", label: "Capabilities", icon: Cloud },
];
export function DesktopSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-surface p-5 md:block">
      <div className="mb-8 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Network className="size-5" />
        </span>
        <div>
          <p className="font-bold">Architecture Lab</p>
          <p className="text-xs text-muted-foreground">Cloudflare workspace</p>
        </div>
      </div>
      <nav className="space-y-1" aria-label="Primary">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex min-h-11 items-center gap-3 rounded-xl px-3 font-medium ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`
            }
          >
            <Icon className="size-5" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
