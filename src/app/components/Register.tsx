import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TrendingUp } from "lucide-react";

interface RegisterProps {
  onRegister: (userData: UserRegistrationData) => void;
  onNavigateToLogin: () => void;
}

export interface UserRegistrationData {
  fullName: string;
  username: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  email: string;
  password: string;
}

export function Register({ onRegister, onNavigateToLogin }: RegisterProps) {
  const [formData, setFormData] = useState<UserRegistrationData>({
    fullName: "",
    username: "",
    documentType: "",
    documentNumber: "",
    phone: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (
      !formData.fullName ||
      !formData.username ||
      !formData.documentType ||
      !formData.documentNumber ||
      !formData.phone ||
      !formData.email ||
      !formData.password
    ) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (formData.password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Por favor ingresa un correo electrónico válido");
      return;
    }

    onRegister(formData);
  };

  const updateField = (field: keyof UserRegistrationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6 py-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-12 w-12 text-blue-600" aria-hidden="true" />
          <h1 className="font-bold text-3xl text-gray-900">myScore</h1>
        </div>

        {/* Register Card */}
        <Card>
          <CardHeader>
            <CardTitle>Crear cuenta</CardTitle>
            <CardDescription>
              Completa tus datos personales para empezar a construir tu historial crediticio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre completo *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="Juan Pérez"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Nombre de usuario *</Label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => updateField("username", e.target.value)}
                    placeholder="juanperez"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="documentType">Tipo de documento *</Label>
                  <Select
                    value={formData.documentType}
                    onValueChange={(value) => updateField("documentType", value)}
                  >
                    <SelectTrigger id="documentType">
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CC">C.C. - Cédula de Ciudadanía</SelectItem>
                      <SelectItem value="PPT">P.P.T - Permiso por Protección Temporal</SelectItem>
                      <SelectItem value="CE">C.E. - Cédula de Extranjería</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentNumber">Número de documento *</Label>
                  <Input
                    id="documentNumber"
                    type="text"
                    value={formData.documentNumber}
                    onChange={(e) => updateField("documentNumber", e.target.value)}
                    placeholder="1234567890"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Número de celular *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="3001234567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full">
                Continuar
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={onNavigateToLogin}
                className="text-sm"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
