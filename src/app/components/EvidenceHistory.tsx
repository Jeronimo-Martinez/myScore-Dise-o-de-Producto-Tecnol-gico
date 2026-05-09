import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { CheckCircle2, Clock, XCircle, FileText, Receipt, CreditCard, Building2, Inbox } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Evidence {
  id: string;
  type: string;
  description: string;
  amount: number;
  date: string;
  status: "approved" | "pending" | "rejected";
}

interface EvidenceHistoryProps {
  evidences: Evidence[];
}

const typeConfig = {
  utility: { label: "Servicio público", icon: Receipt, color: "bg-blue-100 text-blue-800" },
  supplier: { label: "Proveedor", icon: FileText, color: "bg-green-100 text-green-800" },
  bank: { label: "Bancaria", icon: CreditCard, color: "bg-purple-100 text-purple-800" },
  sales: { label: "Ventas", icon: Building2, color: "bg-orange-100 text-orange-800" },
  rent: { label: "Arriendo", icon: Building2, color: "bg-indigo-100 text-indigo-800" },
  other: { label: "Otro", icon: FileText, color: "bg-gray-100 text-gray-800" }
};

const statusConfig = {
  approved: { label: "Aprobada", icon: CheckCircle2, color: "bg-green-100 text-green-800 border-green-200" },
  pending: { label: "En revisión", icon: Clock, color: "bg-orange-100 text-orange-800 border-orange-200" },
  rejected: { label: "Rechazada", icon: XCircle, color: "bg-red-100 text-red-800 border-red-200" }
};

export function EvidenceHistory({ evidences }: EvidenceHistoryProps) {
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-CO')}`;
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: es });
  };

  const totalAmount = evidences
    .filter(e => e.status === "approved")
    .reduce((sum, e) => sum + e.amount, 0);

  if (evidences.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Inbox className="h-12 w-12 text-gray-400 mb-4" aria-hidden="true" />
          <h3 className="font-semibold text-lg mb-2">No hay evidencias aún</h3>
          <p className="text-gray-600 max-w-md">
            Comienza a subir tus evidencias para construir tu historial crediticio.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total reconocido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalAmount)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Basado en evidencias aprobadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Evidencias totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {evidences.length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Registradas en el sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tasa de aprobación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {evidences.length > 0
                ? Math.round((evidences.filter(e => e.status === "approved").length / evidences.length) * 100)
                : 0}%
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {evidences.filter(e => e.status === "approved").length > 0 ? "Muy buen desempeño" : "Comienza a subir evidencias"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de evidencias</CardTitle>
          <CardDescription>
            Todas las evidencias que has enviado y su estado actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {evidences.map((evidence) => {
              const TypeIcon = typeConfig[evidence.type as keyof typeof typeConfig].icon;
              const StatusIcon = statusConfig[evidence.status].icon;

              return (
                <Card key={evidence.id} className="border">
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <TypeIcon className="h-5 w-5 text-gray-600 mt-0.5" aria-hidden="true" />
                        <div>
                          <p className="font-medium text-gray-900">{evidence.description}</p>
                          <p className="text-sm text-gray-500">{formatDate(evidence.date)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(evidence.amount)}
                      </span>
                      <Badge variant="outline" className={statusConfig[evidence.status].color}>
                        <StatusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                        {statusConfig[evidence.status].label}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evidences.map((evidence) => {
                  const TypeIcon = typeConfig[evidence.type as keyof typeof typeConfig].icon;
                  const StatusIcon = statusConfig[evidence.status].icon;

                  return (
                    <TableRow key={evidence.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                          <span className="text-sm">
                            {typeConfig[evidence.type as keyof typeof typeConfig].label}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{evidence.description}</TableCell>
                      <TableCell className="text-gray-600">
                        {formatDate(evidence.date)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(evidence.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusConfig[evidence.status].color}>
                          <StatusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                          {statusConfig[evidence.status].label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
