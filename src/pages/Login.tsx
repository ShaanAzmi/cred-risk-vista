
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md p-8 bg-black border border-cred-yellow/20">
        <div className="flex flex-col items-center space-y-2 mb-8">
          <CreditCard className="h-12 w-12 text-cred-yellow mb-2 bg-cred-yellow/10 p-2 rounded" />
          <h1 className="text-2xl font-bold text-cred-yellow text-center">Cred Risk Predict</h1>
          <p className="text-cred-silver text-sm text-center">
            Login to manage your credit risk profile
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black border-cred-yellow/20 focus:border-cred-yellow focus:ring-cred-yellow text-cred-silver"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-sm text-cred-yellow hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset functionality would be here in a real app.");
                }}
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-black border-cred-yellow/20 focus:border-cred-yellow focus:ring-cred-yellow text-cred-silver"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-cred-yellow hover:bg-cred-yellow/90 text-black font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
