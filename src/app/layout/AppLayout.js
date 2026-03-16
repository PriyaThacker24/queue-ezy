import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/profile", label: "Business Profile" },
  { to: "/services", label: "Services" },
  { to: "/qr", label: "QR Codes" },
];

export function AppLayout() {
  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-b from-brand-600 to-brand-700 text-sm font-bold text-white shadow-soft">
                Q
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight text-slate-900">
                  QueueEzy
                </div>
                <div className="text-xs text-slate-500">
                  No more waiting in line
                </div>
              </div>
            </div>
            <div className="sr-only">
              Business setup, services, and QR codes
            </div>
          </div>

          <nav className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white/70 p-1 shadow-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "rounded-lg px-3 py-2 text-sm font-semibold transition",
                    isActive
                      ? "bg-slate-900 text-white shadow-soft"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

