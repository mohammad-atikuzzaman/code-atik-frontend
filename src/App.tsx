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
import AdminPanel from "./pages/AdminPanel";
import UserDashboard from "./layoutes/UserDashboard";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Profile from "./components/shared/Profile";

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
          <Route path="/app" element={<App />} />
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
            <Route index element={<div>user dashboard</div>} />
            <Route
              path="generated-sites"
              element={
                <div>here will render all of the users generated sites</div>
              }
            />
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* here are admin interface with route protection */}
          <Route
            path="/admin-panel"
            element={
              <ProtectedRoute role="admin">
                <AdminPanel />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminPanel />} />
          </Route>
          {/* others routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppComponent;
