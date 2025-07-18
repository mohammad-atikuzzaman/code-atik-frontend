import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/main/Index";
import App from "./pages/main/App";
import NotFound from "./pages/others/NotFound";
import OAuthSuccess from "./pages/auth/OAuthSuccess";
import Unauthorized from "./pages/others/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserDashboard from "./layoutes/UserDashboard";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Profile from "./pages/dashboard/Profile";
import TermsOfService from "./pages/others/TermsOfService";
import PrivacyPolicy from "./pages/others/PrivacyPolicy";
import Projects from "./pages/dashboard/Projects";
import AdminDashboard from "./layoutes/AdminDashboard";
import Users from "./pages/admin-panel/Users";
import AdminPanel from "./pages/admin-panel/AdminPanel";
import Sites from "./pages/admin-panel/Sites";
import CookiePolicy from "./pages/others/CookiePlicy";
import FAQ from "./pages/others/FAQ";

const queryClient = new QueryClient();

const AppComponent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* the main interface of website */}
          <Route path="/" element={<Index />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />

          {/* auth interface of website */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />

          {/* users dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Projects />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          {/* here are admin interface with route protection */}
          <Route
            path="/admin-panel"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminPanel />} />
            <Route path="users" element={<Users />} />
            <Route path="sites" element={<Sites />} />
          </Route>
          {/* others routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppComponent;
