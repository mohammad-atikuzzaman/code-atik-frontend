import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  User,
  LogOut,
  ChevronRight,
  Menu,
  X,
  LayoutPanelLeft,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";

const AdminDashboard = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin-panel",
      icon: LayoutDashboard,
      current: location.pathname === "/admin-panel",
    },
    {
      name: "Users",
      href: "/admin-panel/users",
      icon: User,
      current: location.pathname === "/admin-panel/users",
    },
    {
      name: "Sites",
      href: "/admin-panel/sites",
      icon: Globe,
      current: location.pathname === "/admin-panel/sites",
    },
    {
      name: "App",
      href: "/app",
      icon: LayoutPanelLeft
    },
    {
      name: "Home",
      href: "/",
      icon: Home,
      current: location.pathname === "/",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b r from-slate-900  to-slate-800  text-slate-900 flex">
      {/* Mobile menu button */}
      <button
        type="button"
        className="md:hidden fixed top-3 left-4 z-50 p-2 rounded-md bg-slate-800 text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CodeAtik
            </span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                item.current
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
              {item.current && <ChevronRight className="h-4 w-4 ml-auto" />}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Sign out</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        {/* Top navigation */}
        <header className="bg-slate-900 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-end items-center">
            <h1 className="text-xl font-semibold text-gray-200">
              {navigation.find((item) => item.current)?.name || "Dashboard"}
            </h1>
          </div>
        </header>

        {/* Content area */}
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
