import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  TrendingUp,
  Upload,
  FileText,
  Receipt,
  CreditCard,
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { UploadEvidence } from "./UploadEvidence";
import { EvidenceHistory } from "./EvidenceHistory";
import { InvestorsTab } from "./InvestorsTab";

interface Evidence {
  id: string;
  type: string;
  description: string;
  amount: number;
  date: string;
  status: "approved" | "pending" | "rejected";
}

interface User {
  username: string;
  fullName: string;
  businessName?: string;
  location?: string;
  sector?: string;
  hasCompletedProfile: boolean;
  evidences: Evidence[];
  stats: {
    evidencesSubmitted: number;
    evidencesApproved: number;
    evidencesPending: number;
    creditScore: number;
  };
}

interface DashboardProps {
  onLogout: () => void;
  user: User;
  onAddEvidence: (evidence: Omit<Evidence, "id" | "date" | "status">) => void;
}

export function Dashboard({ onLogout, user, onAddEvidence }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = user.stats;

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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido, {user.fullName}!
          </h2>
          <p className="text-gray-600">
            {user.hasCompletedProfile
              ? "Aquí puedes gestionar tus evidencias y ver el progreso de tu historial crediticio."
              : "Completa la información de tu negocio para acceder a todas las funcionalidades."}
          </p>
        </div>

        {/* Incomplete Profile Warning */}
        {!user.hasCompletedProfile && (
          <Card className="mb-6 bg-orange-50 border-orange-200">
            <CardContent className="flex gap-3 pt-6">
              <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-2 flex-1">
                <h4 className="font-semibold text-orange-900">Perfil incompleto</h4>
                <p className="text-sm text-orange-800">
                  Para subir evidencias y acceder a todas las funcionalidades, necesitas completar
                  la información de tu negocio. Puedes hacerlo más tarde desde tu perfil.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-grid">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="upload">Subir evidencia</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="investors">Inversionistas</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Credit Score Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Tu Progreso Crediticio</CardTitle>
                <CardDescription>
                  Estás construyendo tu historial. Sigue subiendo evidencias para mejorar tu puntaje.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Puntaje actual</span>
                    <span className="font-semibold text-blue-600">{stats.creditScore}/100</span>
                  </div>
                  <Progress value={stats.creditScore} className="h-3" />
                </div>
                <p className="text-sm text-gray-600">
                  <strong>¡Vas bien!</strong> Con {stats.evidencesApproved} evidencias aprobadas,
                  estás cerca de acceder a tus primeros beneficios financieros.
                </p>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Evidencias enviadas
                  </CardTitle>
                  <FileText className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stats.evidencesSubmitted}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Aprobadas
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-600" aria-hidden="true" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.evidencesApproved}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    En revisión
                  </CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" aria-hidden="true" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{stats.evidencesPending}</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Tipos de evidencias que puedes subir</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Receipt className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold mb-1">Servicios públicos</h4>
                    <p className="text-sm text-gray-600">Recibos de luz, agua, gas, internet</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold mb-1">Facturas de proveedores</h4>
                    <p className="text-sm text-gray-600">Compras de materia prima, inventario</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <CreditCard className="h-6 w-6 text-purple-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold mb-1">Transacciones bancarias</h4>
                    <p className="text-sm text-gray-600">Extractos de cuentas personales</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Building2 className="h-6 w-6 text-orange-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold mb-1">Registros de ventas</h4>
                    <p className="text-sm text-gray-600">Cuadernos, notas de venta, recibos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Alert */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="flex gap-3 pt-6">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-blue-900">¿Cómo se revisan mis evidencias?</h4>
                  <p className="text-sm text-blue-800">
                    Las entidades bancarias verifican que tus documentos sean legibles y correspondan
                    a actividad económica real. Este proceso toma entre 2-5 días hábiles. Tus datos
                    están protegidos y solo se comparten de forma segura.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload">
            {user.hasCompletedProfile ? (
              <UploadEvidence onAddEvidence={onAddEvidence} />
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="h-12 w-12 text-orange-600 mb-4" aria-hidden="true" />
                  <h3 className="font-semibold text-lg mb-2">Funcionalidad no disponible</h3>
                  <p className="text-gray-600 max-w-md">
                    Para subir evidencias necesitas completar la información de tu negocio.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <EvidenceHistory evidences={user.evidences} />
          </TabsContent>

          {/* Investors Tab */}
          <TabsContent value="investors">
            {user.hasCompletedProfile ? (
              <InvestorsTab user={user} />
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="h-12 w-12 text-orange-600 mb-4" aria-hidden="true" />
                  <h3 className="font-semibold text-lg mb-2">Funcionalidad no disponible</h3>
                  <p className="text-gray-600 max-w-md">
                    Para conectar con inversionistas necesitas completar la información de tu negocio.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
