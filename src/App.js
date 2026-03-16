import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./app/layout/AppLayout";
import { BusinessProfilePage } from "./features/businessProfile/BusinessProfilePage";
import { ServicesPage } from "./features/services/ServicesPage";
import { QrCodesPage } from "./features/qr/QrCodesPage";
import { AppStoreProvider } from "./store/AppStore";

export default function App() {
  return (
    <AppStoreProvider>
      <BrowserRouter>
        <Routes>
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

