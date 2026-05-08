import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { CheckCircle2, User } from "lucide-react";

interface User {
  businessName?: string;
  location?: string;
  sector?: string;
  stats: {
    evidencesApproved: number;
    creditScore: number;
  };
}

interface InvestorsTabProps {
  user: User;
}

export function InvestorsTab({ user }: InvestorsTabProps) {
  const interests = [
    {
      id: 1,
      investorName: "Inversionista A",
      date: "3 de Mayo, 2026"
    },
    {
      id: 2,
      investorName: "Inversionista B",
      date: "1 de Mayo, 2026"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Toggle para mostrar perfil */}
      <Card>
        <CardHeader>
          <CardTitle>Visibilidad de tu perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50 border-green-200">
            <div className="flex-1 space-y-1">
              <Label htmlFor="visibility-toggle" className="text-base font-semibold cursor-pointer">
                Mostrar mi perfil a inversionistas
              </Label>
              <p className="text-sm text-gray-600">
                Tu información verificada será visible en el directorio de inversionistas.
                No se compartirán tus documentos ni datos personales.
              </p>
            </div>
            <Switch
              id="visibility-toggle"
              defaultChecked={true}
              className="ml-4"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vista previa del perfil */}
      <Card>
        <CardHeader>
          <CardTitle>Así verán tu perfil</CardTitle>
          <CardDescription>
            Vista previa de cómo aparecerás en el directorio de inversionistas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6 space-y-4 bg-white">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="font-semibold text-xl">{user.businessName || "Mi Emprendimiento"}</h3>
                <p className="text-sm text-gray-600">
                  {user.sector || "Comercio"} • {user.location || "Medellín"}
                </p>
              </div>
              {user.stats.evidencesApproved > 0 && (
                <Badge className="bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Verificado por banco
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Puntaje crediticio</span>
                <span className="font-semibold text-blue-600">{user.stats.creditScore}/100</span>
              </div>
              <Progress value={user.stats.creditScore} className="h-2" />
            </div>

            <div className="pt-2 border-t">
              <p className="text-sm text-gray-600">
                <strong>{user.stats.evidencesApproved} evidencias verificadas</strong> • Miembro desde Mayo 2026
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones de interés */}
      <Card>
        <CardHeader>
          <CardTitle>Inversionistas interesados</CardTitle>
          <CardDescription>
            Estos inversionistas han expresado interés en tu emprendimiento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {interests.map((interest) => (
            <div
              key={interest.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold">{interest.investorName}</p>
                  <p className="text-sm text-gray-600">Interesado el {interest.date}</p>
                </div>
              </div>
              <Button size="sm">
                Responder
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
