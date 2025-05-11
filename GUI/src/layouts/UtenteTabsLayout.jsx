import { Outlet } from "react-router-dom";
import UtenteTabs from "../compunent/utenteTabs.jsx";

export default function UtenteTabsLayout() {
  return (
    <div className="min-h-screen bg-amber-950 dark:bg-zinc-900 px-0 mt-11">
      <UtenteTabs />
      <div className="w-full px-0">
        <Outlet />
      </div>
    </div>
  );
}