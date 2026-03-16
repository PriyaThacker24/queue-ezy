import { createContext, useContext, useMemo } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

function uid() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

const DEFAULT_STATE = {
  business: {
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  },
  categories: [
    { id: "cat_general", name: "General" },
    { id: "cat_consult", name: "Consultation" },
  ],
  services: [
    {
      id: "srv_walkin",
      categoryId: "cat_general",
      name: "Walk-in Service",
      durationMinutes: 10,
      enabled: true,
    },
    {
      id: "srv_consult",
      categoryId: "cat_consult",
      name: "Consultation",
      durationMinutes: 30,
      enabled: true,
    },
  ],
};

const AppStoreContext = createContext(null);

export function AppStoreProvider({ children }) {
  const [state, setState] = useLocalStorageState("queueezy:v1", DEFAULT_STATE);

  const api = useMemo(() => {
    const updateBusiness = (patch) => {
      setState((prev) => ({ ...prev, business: { ...prev.business, ...patch } }));
    };

    const createCategory = ({ name }) => {
      const trimmed = (name ?? "").trim();
      if (!trimmed) return;
      setState((prev) => ({
        ...prev,
        categories: [...prev.categories, { id: uid(), name: trimmed }],
      }));
    };

    const renameCategory = (categoryId, name) => {
      const trimmed = (name ?? "").trim();
      if (!trimmed) return;
      setState((prev) => ({
        ...prev,
        categories: prev.categories.map((c) =>
          c.id === categoryId ? { ...c, name: trimmed } : c
        ),
      }));
    };

    const deleteCategory = (categoryId) => {
      setState((prev) => {
        const hasServices = prev.services.some((s) => s.categoryId === categoryId);
        if (hasServices) return prev;
        return {
          ...prev,
          categories: prev.categories.filter((c) => c.id !== categoryId),
        };
      });
    };

    const createService = ({ categoryId, name, durationMinutes }) => {
      const trimmed = (name ?? "").trim();
      const dur = Number(durationMinutes);
      if (!trimmed || !Number.isFinite(dur) || dur <= 0) return;
      setState((prev) => ({
        ...prev,
        services: [
          ...prev.services,
          {
            id: uid(),
            categoryId,
            name: trimmed,
            durationMinutes: Math.round(dur),
            enabled: true,
          },
        ],
      }));
    };

    const updateService = (serviceId, patch) => {
      setState((prev) => ({
        ...prev,
        services: prev.services.map((s) => (s.id === serviceId ? { ...s, ...patch } : s)),
      }));
    };

    const deleteService = (serviceId) => {
      setState((prev) => ({
        ...prev,
        services: prev.services.filter((s) => s.id !== serviceId),
      }));
    };

    return {
      state,
      updateBusiness,
      createCategory,
      renameCategory,
      deleteCategory,
      createService,
      updateService,
      deleteService,
    };
  }, [state, setState]);

  return <AppStoreContext.Provider value={api}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}

