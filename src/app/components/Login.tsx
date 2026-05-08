import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { TrendingUp } from "lucide-react";

interface LoginProps {
  onLogin: (username: string, password: string) => boolean;
  onNavigateToRegister: () => void;
}

export function Login({ onLogin, onNavigateToRegister }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    const success = onLogin(username, password);
    if (!success) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-12 w-12 text-blue-600" aria-hidden="true" />
          <h1 className="font-bold text-3xl text-gray-900">myScore</h1>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de usuario o correo</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="usuario123"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <Button
                variant="link"
                onClick={onNavigateToRegister}
                className="text-sm"
              >
                ¿No tienes cuenta? Regístrate aquí
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-800">
              <strong>Usuario de prueba:</strong><br />
              Usuario: <code className="bg-blue-100 px-1 rounded">demo</code><br />
              Contraseña: <code className="bg-blue-100 px-1 rounded">demo123</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
