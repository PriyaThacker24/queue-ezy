export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <div className="mb-1 flex items-end justify-between gap-3">
        <div className="text-sm font-medium text-slate-900">{label}</div>
        {hint ? <div className="text-xs text-slate-500">{hint}</div> : null}
      </div>
      {children}
    </label>
  );
}

export function TextInput(props) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm",
        "placeholder:text-slate-400 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-100",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export function TextArea(props) {
  return (
    <textarea
      {...props}
      className={[
        "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm",
        "placeholder:text-slate-400 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-100",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export function Select(props) {
  return (
    <select
      {...props}
      className={[
        "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm",
        "focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-100",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export function Button({ variant = "primary", ...props }) {
  const cls =
    variant === "primary"
      ? "bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-soft hover:from-slate-800 hover:to-slate-700 focus:ring-slate-200"
      : variant === "danger"
        ? "bg-rose-600 text-white shadow-soft hover:bg-rose-500 focus:ring-rose-100"
        : "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm focus:ring-slate-100";

  return (
    <button
      {...props}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold",
        "focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50",
        cls,
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export function Card({ title, actions, children }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white/80 shadow-soft backdrop-blur">
      {title ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 px-5 py-4">
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className="px-5 py-5">{children}</div>
    </section>
  );
}

