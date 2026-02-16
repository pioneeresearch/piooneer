import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="ml-0 w-full min-h-screen bg-[var(--background)] md:ml-64">

        {/* TOPBAR */}
        <Topbar />

        {/* PAGE CONTENT */}
        <main className="min-h-screen bg-gray-50 p-3 pt-16 dark:bg-slate-950 sm:p-4 sm:pt-16 md:p-6 md:pt-16">
  {children}
</main>

         
      </div>
    </div>
  );
}
