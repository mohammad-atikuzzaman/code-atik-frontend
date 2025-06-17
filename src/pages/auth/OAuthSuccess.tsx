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
      const payload = JSON.parse(atob(token.split(".")[1]));
      dispatch(
        setCredentials({ token, email: payload.email, role: payload.role })
      );
      toast({
        title: "Login Successful!",
        description: "User Is Logged in successfully.",
      });
      navigate("/app");
    }
  }, []);

  return <p>Logging you in...</p>;
};

export default OAuthSuccess;
