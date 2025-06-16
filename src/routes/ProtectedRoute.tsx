import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../app/store";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: JSX.Element;
  role?: string;
}) => {
  const { token, role: userRole } = useSelector(
    (state: RootState) => state.auth
  );

  if (!token) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/unauthorized" />;
  return children;
};

export default ProtectedRoute;
