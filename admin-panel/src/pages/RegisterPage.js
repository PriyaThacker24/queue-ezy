import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Field, TextInput } from "../shared/ui/Form";
import { registerAdmin } from "../auth/adminAuth";

function normalizePhone(input) {
  return String(input ?? "").replace(/[^\d+]/g, "").trim();
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const phoneNormalized = useMemo(() => normalizePhone(phoneNumber), [phoneNumber]);
  const canSubmit = phoneNormalized.length >= 8 && password.length >= 4 && !isSaving;

  function onSubmit(e) {
    e.preventDefault();
    setError("");

    const pn = normalizePhone(phoneNumber);
    if (pn.length < 8) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setIsSaving(true);
    try {
      registerAdmin({ phoneNumber: pn, password });
      navigate("/login", { replace: true });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Card title="Create admin account">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Phone number" hint="Digits only">
          <TextInput
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g. 9876543210"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Field>

        <Field label="Password">
          <TextInput
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
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
            Already have an account?{" "}
            <Link className="font-semibold text-brand-700 hover:underline" to="/login">
              Login
            </Link>
          </div>
          <Button type="submit" disabled={!canSubmit}>
            {isSaving ? "Saving..." : "Register"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

