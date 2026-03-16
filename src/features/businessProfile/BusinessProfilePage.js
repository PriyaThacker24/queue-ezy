import { useMemo, useState } from "react";
import { useAppStore } from "../../store/AppStore";
import { Button, Card, Field, TextArea, TextInput } from "../../shared/ui/Form";

export function BusinessProfilePage() {
  const { state, updateBusiness } = useAppStore();
  const [draft, setDraft] = useState(state.business);

  const isDirty = useMemo(() => {
    return JSON.stringify(draft) !== JSON.stringify(state.business);
  }, [draft, state.business]);

  const save = (e) => {
    e.preventDefault();
    updateBusiness(draft);
  };

  const reset = () => setDraft(state.business);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-2xl font-semibold tracking-tight text-slate-900">
          Business Profile
        </div>
        <div className="mt-1 text-sm text-slate-600">
          Create and edit your business details. These will be used across your services
          and QR codes.
        </div>
      </div>

      <Card
        title="Business details"
        actions={
          <div className="flex items-center gap-2">
            <Button type="button" variant="secondary" onClick={reset} disabled={!isDirty}>
              Reset
            </Button>
            <Button type="submit" form="businessProfileForm" disabled={!isDirty}>
              Save changes
            </Button>
          </div>
        }
      >
        <form id="businessProfileForm" onSubmit={save} className="grid gap-4 md:grid-cols-2">
          <Field label="Business name">
            <TextInput
              value={draft.name}
              onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. QueueEzy Clinic"
              autoComplete="organization"
            />
          </Field>

          <Field label="Phone">
            <TextInput
              value={draft.phone}
              onChange={(e) => setDraft((p) => ({ ...p, phone: e.target.value }))}
              placeholder="e.g. +1 555 123 4567"
              autoComplete="tel"
            />
          </Field>

          <Field label="Email">
            <TextInput
              value={draft.email}
              onChange={(e) => setDraft((p) => ({ ...p, email: e.target.value }))}
              placeholder="e.g. contact@yourbusiness.com"
              autoComplete="email"
            />
          </Field>

          <Field label="Address">
            <TextInput
              value={draft.address}
              onChange={(e) => setDraft((p) => ({ ...p, address: e.target.value }))}
              placeholder="Street, city, state"
              autoComplete="street-address"
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Description" hint="Optional">
              <TextArea
                value={draft.description}
                onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))}
                placeholder="A short description of your business"
                rows={4}
              />
            </Field>
          </div>
        </form>
      </Card>
    </div>
  );
}

