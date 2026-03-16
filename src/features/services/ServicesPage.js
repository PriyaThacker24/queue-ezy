import { useMemo, useState } from "react";
import { useAppStore } from "../../store/AppStore";
import { Button, Card, Field, Select, TextInput } from "../../shared/ui/Form";

function Badge({ children }) {
  return (
    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
      {children}
    </span>
  );
}

export function ServicesPage() {
  const {
    state,
    createCategory,
    renameCategory,
    deleteCategory,
    createService,
    updateService,
    deleteService,
  } = useAppStore();

  const [activeCategoryId, setActiveCategoryId] = useState(
    state.categories[0]?.id ?? ""
  );

  const activeCategory = state.categories.find((c) => c.id === activeCategoryId);

  const servicesForActiveCategory = useMemo(() => {
    return state.services
      .filter((s) => s.categoryId === activeCategoryId)
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [state.services, activeCategoryId]);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [renameDraft, setRenameDraft] = useState("");

  const [serviceDraft, setServiceDraft] = useState({
    name: "",
    durationMinutes: 10,
  });

  const canDeleteActiveCategory = useMemo(() => {
    return !state.services.some((s) => s.categoryId === activeCategoryId);
  }, [state.services, activeCategoryId]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-2xl font-semibold tracking-tight text-slate-900">
          Service Management
        </div>
        <div className="mt-1 text-sm text-slate-600">
          Create service categories, configure durations, and enable/disable services.
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Service categories">
          <div className="space-y-4">
            <div className="space-y-2">
              <Field label="New category">
                <div className="flex gap-2">
                  <TextInput
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="e.g. Hair, Clinic, Support"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      createCategory({ name: newCategoryName });
                      setNewCategoryName("");
                    }}
                  >
                    Add
                  </Button>
                </div>
              </Field>
            </div>

            <div className="space-y-1">
              {state.categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setActiveCategoryId(c.id);
                    setRenameDraft("");
                  }}
                  className={[
                    "flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm",
                    c.id === activeCategoryId
                      ? "border-slate-300 bg-slate-50 text-slate-900"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  <span className="truncate">{c.name}</span>
                  <Badge>
                    {state.services.filter((s) => s.categoryId === c.id).length}
                  </Badge>
                </button>
              ))}
            </div>

            {activeCategory ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Manage category
                </div>
                <div className="mt-2 space-y-2">
                  <TextInput
                    value={renameDraft}
                    onChange={(e) => setRenameDraft(e.target.value)}
                    placeholder={`Rename "${activeCategory.name}"`}
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        if (!renameDraft.trim()) return;
                        renameCategory(activeCategory.id, renameDraft);
                        setRenameDraft("");
                      }}
                      disabled={!renameDraft.trim()}
                    >
                      Rename
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => deleteCategory(activeCategory.id)}
                      disabled={!canDeleteActiveCategory}
                      title={
                        canDeleteActiveCategory
                          ? "Delete category"
                          : "Move/delete services in this category first"
                      }
                    >
                      Delete
                    </Button>
                  </div>
                  {!canDeleteActiveCategory ? (
                    <div className="text-xs text-slate-600">
                      You can only delete an empty category.
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card title="Create service">
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Category">
                <Select
                  value={activeCategoryId}
                  onChange={(e) => setActiveCategoryId(e.target.value)}
                >
                  {state.categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Service name">
                <TextInput
                  value={serviceDraft.name}
                  onChange={(e) =>
                    setServiceDraft((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="e.g. Oil change"
                />
              </Field>

              <Field label="Duration (minutes)">
                <TextInput
                  type="number"
                  min={1}
                  value={serviceDraft.durationMinutes}
                  onChange={(e) =>
                    setServiceDraft((p) => ({
                      ...p,
                      durationMinutes: e.target.value,
                    }))
                  }
                />
              </Field>

              <div className="md:col-span-3">
                <Button
                  type="button"
                  onClick={() => {
                    createService({
                      categoryId: activeCategoryId,
                      name: serviceDraft.name,
                      durationMinutes: serviceDraft.durationMinutes,
                    });
                    setServiceDraft({ name: "", durationMinutes: 10 });
                  }}
                  disabled={!serviceDraft.name.trim()}
                >
                  Add service
                </Button>
              </div>
            </div>
          </Card>

          <Card
            title={
              activeCategory
                ? `Services in "${activeCategory.name}"`
                : "Services"
            }
          >
            {servicesForActiveCategory.length === 0 ? (
              <div className="text-sm text-slate-600">
                No services yet. Create one above.
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {servicesForActiveCategory.map((s) => (
                  <div key={s.id} className="flex flex-col gap-3 py-4 md:flex-row md:items-center">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="truncate text-sm font-semibold text-slate-900">
                          {s.name}
                        </div>
                        {s.enabled ? (
                          <Badge>Enabled</Badge>
                        ) : (
                          <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">
                            Disabled
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-slate-600">
                        Duration: {s.durationMinutes} min
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => updateService(s.id, { enabled: !s.enabled })}
                      >
                        {s.enabled ? "Disable" : "Enable"}
                      </Button>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-600">Minutes</span>
                        <TextInput
                          className="w-28"
                          type="number"
                          min={1}
                          value={s.durationMinutes}
                          onChange={(e) =>
                            updateService(s.id, {
                              durationMinutes: Number(e.target.value),
                            })
                          }
                        />
                      </div>

                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => deleteService(s.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

