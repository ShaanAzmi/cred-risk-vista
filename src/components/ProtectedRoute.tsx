
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireBankLink?: boolean;
}

const ProtectedRoute = ({ children, requireBankLink = false }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    if (requireBankLink && !user.isBankLinked) {
      navigate("/link-bank");
    }
  }, [user, navigate, requireBankLink]);

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
