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
import { TrendingUp, Building2 } from "lucide-react";

interface BusinessSetupProps {
  onComplete: (businessData: BusinessData) => void;
  onSkip: () => void;
}

export interface BusinessData {
  businessName: string;
  location: string;
  sector: string;
}

export function BusinessSetup({ onComplete, onSkip }: BusinessSetupProps) {
  const [formData, setFormData] = useState<BusinessData>({
    businessName: "",
    location: "",
    sector: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.businessName || !formData.location || !formData.sector) {
      setError("Por favor completa todos los campos");
      return;
    }

    onComplete(formData);
  };

  const updateField = (field: keyof BusinessData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-12 w-12 text-blue-600" aria-hidden="true" />
          <h1 className="font-bold text-3xl text-gray-900">myScore</h1>
        </div>

        {/* Progress */}
        <div className="text-center">
          <p className="text-sm text-gray-600">Paso 2 de 2</p>
          <div className="mt-2 h-2 bg-gray-200 rounded-full max-w-xs mx-auto">
            <div className="h-full w-full bg-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Business Setup Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-600" aria-hidden="true" />
              <div>
                <CardTitle>Información de tu negocio</CardTitle>
                <CardDescription>
                  Cuéntanos sobre tu emprendimiento para personalizar tu experiencia
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Nombre del negocio *</Label>
                <Input
                  id="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                  placeholder="Ej: Tienda El Progreso"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación *</Label>
                <Input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Ej: Medellín, Antioquia"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Sector económico *</Label>
                <Select
                  value={formData.sector}
                  onValueChange={(value) => updateField("sector", value)}
                >
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="Selecciona tu sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Comercio">Comercio</SelectItem>
                    <SelectItem value="Servicios">Servicios</SelectItem>
                    <SelectItem value="Agro">Agro</SelectItem>
                    <SelectItem value="Confección">Confección</SelectItem>
                    <SelectItem value="Producción">Producción</SelectItem>
                    <SelectItem value="Tecnología">Tecnología</SelectItem>
                    <SelectItem value="Alimentos">Alimentos</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-3 pt-4">
                <Button type="submit" className="w-full">
                  Completar registro
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={onSkip}
                >
                  Completar más tarde
                </Button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Nota:</strong> Si decides completar más tarde, podrás explorar la aplicación
                pero no podrás subir evidencias ni acceder a todas las funcionalidades hasta que
                completes la información de tu negocio.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
