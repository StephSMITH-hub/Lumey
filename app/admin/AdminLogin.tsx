"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigation } from "react-day-picker";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const { login, isLoading, error } = useAuth();
  const navigate = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);

    if (!email || !password) {
      setShowError(true);
      return;
    }

    const success = await login(email, password);

    if (success) {
      navigate.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-lumey-dark px-6 py-8 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lumey-yellow mb-4">
              <Lock className="h-6 w-6 text-lumey-dark" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-gray-300 mt-2">
              Enter your credentials to access the admin area
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {(error || showError) && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {showError ? "Please enter both email and password." : error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@lumey.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-lumey-orange hover:bg-lumey-yellow"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="px-6 py-4 bg-gray-50 border-t text-center text-sm text-gray-600">
            <p>
              Use <b>admin@lumey.com</b> and password <b>admin123</b> to log in
            </p>
            <p className="mt-2">For demonstration purposes only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
