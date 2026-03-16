import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./app/layout/AppLayout";
import { BusinessProfilePage } from "./features/businessProfile/BusinessProfilePage";
import { ServicesPage } from "./features/services/ServicesPage";
import { QrCodesPage } from "./features/qr/QrCodesPage";
import { AppStoreProvider } from "./store/AppStore";
import { AdminLayout } from "./admin-panel/layout/AdminLayout";
import { LoginPage } from "./admin-panel/pages/LoginPage";
import { RegisterPage } from "./admin-panel/pages/RegisterPage";
import { DashboardPage } from "./admin-panel/pages/DashboardPage";
import { RequireAdminAuth } from "./admin-panel/routes/RequireAdminAuth";
import { isAdminAuthed } from "./admin-panel/auth/adminAuth";

export default function App() {
  return (
    <AppStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Navigate to={isAdminAuthed() ? "/admin/dashboard" : "/admin/login"} replace />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/register" element={<RegisterPage />} />
            <Route element={<RequireAdminAuth />}>
              <Route path="/admin/dashboard" element={<DashboardPage />} />
            </Route>
          </Route>

          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/profile" replace />} />
            <Route path="/profile" element={<BusinessProfilePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/qr" element={<QrCodesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppStoreProvider>
  );
}

