import { useMemo, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useAppStore } from "../../store/AppStore";
import { Button, Card, Field, Select } from "../../shared/ui/Form";

function buildQrPayload({ businessName, service }) {
  // Keep it stable + easily parseable for scanners.
  return JSON.stringify({
    v: 1,
    businessName: businessName || undefined,
    serviceId: service.id,
    serviceName: service.name,
    durationMinutes: service.durationMinutes,
  });
}

function QrCard({ title, value, filename }) {
  const canvasRef = useRef(null);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    a.click();
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900">{title}</div>
          <div className="mt-1 truncate text-xs text-slate-500">{filename}</div>
        </div>
        <Button type="button" variant="secondary" onClick={download}>
          Download PNG
        </Button>
      </div>

      <div className="mt-4 grid place-items-center rounded-lg bg-slate-50 p-4">
        <QRCodeCanvas
          value={value}
          size={220}
          includeMargin
          level="M"
          ref={canvasRef}
        />
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-xs font-medium text-slate-700">
          QR payload (for debugging)
        </summary>
        <pre className="mt-2 overflow-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">
          {value}
        </pre>
      </details>
    </div>
  );
}

export function QrCodesPage() {
  const { state } = useAppStore();
  const enabledServices = useMemo(
    () => state.services.filter((s) => s.enabled),
    [state.services]
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    state.categories[0]?.id ?? ""
  );

  const servicesInSelectedCategory = useMemo(() => {
    return enabledServices
      .filter((s) => s.categoryId === selectedCategoryId)
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [enabledServices, selectedCategoryId]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-2xl font-semibold tracking-tight text-slate-900">
          QR Code System
        </div>
        <div className="mt-1 text-sm text-slate-600">
          Generate and download QR codes per service. Only enabled services appear here.
        </div>
      </div>

      <Card title="Filter">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Category">
            <Select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              {state.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>

          <div className="flex items-end">
            <div className="text-xs text-slate-600">
              Tip: disable a service in the Services tab to hide its QR code here.
            </div>
          </div>
        </div>
      </Card>

      {enabledServices.length === 0 ? (
        <Card title="No enabled services">
          <div className="text-sm text-slate-600">
            Go to Services and enable at least one service to generate QR codes.
          </div>
        </Card>
      ) : servicesInSelectedCategory.length === 0 ? (
        <Card title="No enabled services in this category">
          <div className="text-sm text-slate-600">
            Enable services in this category (or choose another category).
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {servicesInSelectedCategory.map((service) => {
            const payload = buildQrPayload({
              businessName: state.business.name,
              service,
            });
            const safeName = service.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            const filename = `qr_${safeName || service.id}.png`;

            return (
              <QrCard
                key={service.id}
                title={service.name}
                value={payload}
                filename={filename}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

