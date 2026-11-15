import { setCredentials } from "@/features/auth/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const payload = JSON.parse(jsonPayload);
        dispatch(
          setCredentials({ token, email: payload.email, role: payload.role })
        );
        toast({
          title: "Login Successful!",
          description: "User is logged in successfully.",
        });
        navigate("/app");
      } catch (err) {
        console.error("OAuth token parsing error:", err);
        toast({
          title: "Authentication Error",
          description: "Failed to process login token. Please try again.",
          variant: "destructive",
        });
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [searchParams, dispatch, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-400 text-sm">Logging you in...</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
