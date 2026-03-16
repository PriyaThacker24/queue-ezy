import { useNavigate } from "react-router-dom";
import { Button, Card } from "../shared/ui/Form";
import { getAdminSession, logoutAdmin } from "../auth/adminAuth";

export function DashboardPage() {
  const navigate = useNavigate();
  const session = getAdminSession();

  function onLogout() {
    logoutAdmin();
    navigate("/login", { replace: true });
  }

  return (
    <Card
      title="Dashboard"
      actions={
        <Button variant="secondary" onClick={onLogout}>
          Logout
        </Button>
      }
    >
      <div className="space-y-3">
        <div className="text-sm text-slate-700">
          You are logged in as{" "}
          <span className="font-semibold text-slate-900">{session?.phoneNumber ?? "—"}</span>.
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 shadow-sm">
          This is a starter admin dashboard page. Add your admin features here.
        </div>
      </div>
    </Card>
  );
}

