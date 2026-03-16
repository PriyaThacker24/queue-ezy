import { NavLink, Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <div className="min-h-full">
      <header className="border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-b from-brand-600 to-brand-700 text-sm font-bold text-white shadow-soft">
              A
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-slate-900">
                Admin Panel
              </div>
              <div className="text-xs text-slate-500">QueueEzy</div>
            </div>
          </div>

          <nav className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white/70 p-1 shadow-sm">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                [
                  "rounded-lg px-3 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-slate-900 text-white shadow-soft"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                [
                  "rounded-lg px-3 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-slate-900 text-white shadow-soft"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")
              }
            >
              Register
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}

