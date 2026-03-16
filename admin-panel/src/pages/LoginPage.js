import { useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Field, TextInput } from "../shared/ui/Form";
import { getAdminSession, loginAdmin } from "../auth/adminAuth";

function normalizePhone(input) {
  return String(input ?? "").replace(/[^\d+]/g, "").trim();
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const session = getAdminSession();
  const phoneNormalized = useMemo(() => normalizePhone(phoneNumber), [phoneNumber]);
  const canSubmit = phoneNormalized.length >= 8 && password.length >= 1 && !isSubmitting;

  const from = location.state?.from;

  if (session) return <Navigate to="/dashboard" replace />;

  function onSubmit(e) {
    e.preventDefault();
    setError("");

    const pn = normalizePhone(phoneNumber);
    if (pn.length < 8) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = loginAdmin({ phoneNumber: pn, password });
      if (!res.ok) {
        setError(
          res.reason === "NO_ACCOUNT"
            ? "No account found. Please register."
            : "Invalid credentials."
        );
        return;
      }
      navigate(from || "/dashboard", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card title="Admin login">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Phone number">
          <TextInput
            inputMode="tel"
            autoComplete="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Field>

        <Field label="Password">
          <TextInput
            type="password"
            autoComplete="current-password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
            {error}
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-slate-600">
            New here?{" "}
            <Link className="font-semibold text-brand-700 hover:underline" to="/register">
              Register
            </Link>
          </div>
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "Signing in..." : "Login"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

