import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { TrendingUp, CheckCircle2, Building2, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface InvestorsDirectoryProps {
  onLogout: () => void;
}

interface Entrepreneur {
  id: number;
  name: string;
  sector: string;
  city: string;
  score: number;
  verified: boolean;
  evidences: number;
}

export function InvestorsDirectory({ onLogout }: InvestorsDirectoryProps) {
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [minScore, setMinScore] = useState<string>("0");
  const [onlyVerified, setOnlyVerified] = useState(false);

  const entrepreneurs: Entrepreneur[] = [
    {
      id: 1,
      name: "Tienda El Progreso",
      sector: "Comercio",
      city: "Medellín",
      score: 45,
      verified: true,
      evidences: 8
    },
    {
      id: 2,
      name: "Cafetería La Esquina",
      sector: "Servicios",
      city: "Envigado",
      score: 62,
      verified: true,
      evidences: 15
    },
    {
      id: 3,
      name: "Carpintería Moderna",
      sector: "Producción",
      city: "Itagüí",
      score: 78,
      verified: true,
      evidences: 22
    },
    {
      id: 4,
      name: "Desarrollo Web Innovador",
      sector: "Tecnología",
      city: "Medellín",
      score: 38,
      verified: false,
      evidences: 6
    },
    {
      id: 5,
      name: "Panadería Artesanal",
      sector: "Comercio",
      city: "Bello",
      score: 52,
      verified: true,
      evidences: 11
    },
    {
      id: 6,
      name: "Consultoría Empresarial",
      sector: "Servicios",
      city: "Sabaneta",
      score: 67,
      verified: true,
      evidences: 18
    }
  ];

  const getSectorIcon = (sector: string) => {
    return <Building2 className="h-4 w-4" aria-hidden="true" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-blue-600" aria-hidden="true" />
              <h1 className="font-bold text-xl md:text-2xl text-gray-900">myScore</h1>
            </div>
            <Button variant="outline" onClick={onLogout} size="sm">
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Explorar emprendimientos
          </h2>
          <p className="text-gray-600">
            Descubre proyectos verificados por entidades bancarias.
          </p>
        </div>

        {/* Filters Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sector-filter">Sector</Label>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger id="sector-filter">
                    <SelectValue placeholder="Todos los sectores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los sectores</SelectItem>
                    <SelectItem value="comercio">Comercio</SelectItem>
                    <SelectItem value="servicios">Servicios</SelectItem>
                    <SelectItem value="produccion">Producción</SelectItem>
                    <SelectItem value="tecnologia">Tecnología</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city-filter">Ciudad</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger id="city-filter">
                    <SelectValue placeholder="Todas las ciudades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las ciudades</SelectItem>
                    <SelectItem value="medellin">Medellín</SelectItem>
                    <SelectItem value="envigado">Envigado</SelectItem>
                    <SelectItem value="itagui">Itagüí</SelectItem>
                    <SelectItem value="bello">Bello</SelectItem>
                    <SelectItem value="sabaneta">Sabaneta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="score-filter">Puntaje mínimo</Label>
                <Select value={minScore} onValueChange={setMinScore}>
                  <SelectTrigger id="score-filter">
                    <SelectValue placeholder="Sin mínimo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Sin mínimo</SelectItem>
                    <SelectItem value="30">30+</SelectItem>
                    <SelectItem value="50">50+</SelectItem>
                    <SelectItem value="70">70+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified-only"
                    checked={onlyVerified}
                    onCheckedChange={(checked) => setOnlyVerified(checked as boolean)}
                  />
                  <Label
                    htmlFor="verified-only"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Solo verificados por banco
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Entrepreneurs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entrepreneurs.map((entrepreneur) => (
            <Card key={entrepreneur.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{entrepreneur.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {getSectorIcon(entrepreneur.sector)}
                    <span>{entrepreneur.sector}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>{entrepreneur.city}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Puntaje crediticio</span>
                    <span className="font-semibold text-blue-600">{entrepreneur.score}/100</span>
                  </div>
                  <Progress value={entrepreneur.score} className="h-2" />
                </div>

                {entrepreneur.verified && (
                  <Badge className="bg-green-600 hover:bg-green-700">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verificado
                  </Badge>
                )}

                <div className="pt-2 border-t text-sm text-gray-600">
                  <strong>{entrepreneur.evidences} evidencias verificadas</strong>
                </div>

                <Button variant="outline" className="w-full">
                  Me interesa
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
