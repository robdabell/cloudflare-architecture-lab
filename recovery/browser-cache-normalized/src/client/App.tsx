import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApplicationShell } from "./components/architecture-lab/ApplicationShell";
import { AssistantPage } from "./features/AssistantPage";
import { CapabilitiesPage } from "./features/CapabilitiesPage";
import { DashboardPage } from "./features/DashboardPage";
import { ExplorePage } from "./features/ExplorePage";
import { ProjectDetailPage } from "./features/ProjectDetailPage";
import { ProjectsPage } from "./features/ProjectsPage";
import { PetMatchPage } from "./features/PetMatchPage";
import { SportsCarFinderPage } from "./features/SportsCarFinderPage";
import { TechnologyPlaygroundPage } from "./features/TechnologyPlaygroundPage";
const router = createBrowserRouter([
  {
    element: <ApplicationShell />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/:id", element: <ProjectDetailPage /> },
      { path: "/explore", element: <ExplorePage /> },
      { path: "/capabilities", element: <CapabilitiesPage /> },
      { path: "/assistant", element: <AssistantPage /> },
      { path: "/pet-match", element: <PetMatchPage /> },
      { path: "/sports-car-finder", element: <SportsCarFinderPage /> },
      { path: "/technology-playground", element: <TechnologyPlaygroundPage /> },
    ],
  },
]);
export function App() {
  return <RouterProvider router={router} />;
}
