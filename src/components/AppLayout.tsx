
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, CreditCard, PieChart, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-cred-silver">
      {/* Header */}
      <header className="border-b border-cred-yellow/20 py-4 bg-black">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-cred-yellow bg-cred-yellow/10 p-1 rounded" />
            <h1 className="text-xl font-bold text-cred-yellow">Cred Risk Predict</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-cred-silver text-sm">
              {user.name}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="hover:text-cred-yellow"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-48 shrink-0">
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-black hover:text-cred-yellow hover:border-cred-yellow border border-transparent"
                onClick={() => navigate("/dashboard")}
              >
                <PieChart className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-black hover:text-cred-yellow hover:border-cred-yellow border border-transparent"
                onClick={() => navigate("/profile")}
              >
                <User className="h-4 w-4" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-black hover:text-cred-yellow hover:border-cred-yellow border border-transparent"
                onClick={() => navigate("/settings")}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
