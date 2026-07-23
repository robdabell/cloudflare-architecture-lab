import { Bot, FolderKanban, Home, Menu, Network } from "lucide-react";
import { NavLink } from "react-router-dom";
const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/explore", label: "Explore", icon: Network },
  { to: "/assistant", label: "Assistant", icon: Bot },
  { to: "/capabilities", label: "More", icon: Menu },
];
export function MobileNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium ${isActive ? "text-accent" : "text-muted-foreground"}`
          }
        >
          <Icon className="size-5" aria-hidden />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
