import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { CheckCircle2, Clock, XCircle, FileText, Receipt, CreditCard, Building2 } from "lucide-react";
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

const mockEvidences: Evidence[] = [
  {
    id: "1",
    type: "utility",
    description: "Recibo de luz - Abril 2026",
    amount: 85000,
    date: "2026-05-05",
    status: "approved"
  },
  {
    id: "2",
    type: "supplier",
    description: "Compra de telas - Proveedor TextilCo",
    amount: 350000,
    date: "2026-05-03",
    status: "approved"
  },
  {
    id: "3",
    type: "sales",
    description: "Ventas semanales - Semana 18",
    amount: 450000,
    date: "2026-05-01",
    status: "pending"
  },
  {
    id: "4",
    type: "utility",
    description: "Recibo de agua - Abril 2026",
    amount: 45000,
    date: "2026-04-28",
    status: "approved"
  },
  {
    id: "5",
    type: "bank",
    description: "Transferencia recibida - Cliente",
    amount: 120000,
    date: "2026-04-25",
    status: "pending"
  },
  {
    id: "6",
    type: "supplier",
    description: "Materia prima - Distribuidor ABC",
    amount: 280000,
    date: "2026-04-20",
    status: "approved"
  },
  {
    id: "7",
    type: "utility",
    description: "Internet - Abril 2026",
    amount: 65000,
    date: "2026-04-18",
    status: "approved"
  },
  {
    id: "8",
    type: "sales",
    description: "Ventas semanales - Semana 16",
    amount: 380000,
    date: "2026-04-15",
    status: "approved"
  },
  {
    id: "9",
    type: "supplier",
    description: "Insumos de producción",
    amount: 195000,
    date: "2026-04-12",
    status: "pending"
  },
  {
    id: "10",
    type: "bank",
    description: "Pago recibido - Servicio prestado",
    amount: 250000,
    date: "2026-04-10",
    status: "approved"
  },
  {
    id: "11",
    type: "utility",
    description: "Recibo de gas - Marzo 2026",
    amount: 38000,
    date: "2026-04-05",
    status: "approved"
  },
  {
    id: "12",
    type: "sales",
    description: "Ventas semanales - Semana 14",
    amount: 420000,
    date: "2026-04-01",
    status: "pending"
  }
];

const typeConfig = {
  utility: { label: "Servicio público", icon: Receipt, color: "bg-blue-100 text-blue-800" },
  supplier: { label: "Proveedor", icon: FileText, color: "bg-green-100 text-green-800" },
  bank: { label: "Bancaria", icon: CreditCard, color: "bg-purple-100 text-purple-800" },
  sales: { label: "Ventas", icon: Building2, color: "bg-orange-100 text-orange-800" }
};

const statusConfig = {
  approved: { label: "Aprobada", icon: CheckCircle2, color: "bg-green-100 text-green-800 border-green-200" },
  pending: { label: "En revisión", icon: Clock, color: "bg-orange-100 text-orange-800 border-orange-200" },
  rejected: { label: "Rechazada", icon: XCircle, color: "bg-red-100 text-red-800 border-red-200" }
};

export function EvidenceHistory() {
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-CO')}`;
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: es });
  };

  const totalAmount = mockEvidences
    .filter(e => e.status === "approved")
    .reduce((sum, e) => sum + e.amount, 0);

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
              {mockEvidences.length}
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
              {Math.round((mockEvidences.filter(e => e.status === "approved").length / mockEvidences.length) * 100)}%
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Muy buen desempeño
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
            {mockEvidences.map((evidence) => {
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
                {mockEvidences.map((evidence) => {
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
