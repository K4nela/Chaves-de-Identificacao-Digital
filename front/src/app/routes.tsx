import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import GuidedIdentification from "./pages/GuidedIdentification";
import FilterSearch from "./pages/FilterSearch";
import SpeciesResult from "./pages/SpeciesResult";
import Login from "./pages/Login";
import ProtectedAdmin from "./pages/ProtectedAdmin";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "guided", Component: GuidedIdentification },
      { path: "filter", Component: FilterSearch },
      { path: "result/:speciesId", Component: SpeciesResult },
      { path: "login", Component: Login },
      { path: "admin", Component: ProtectedAdmin },
    ],
  },
]);