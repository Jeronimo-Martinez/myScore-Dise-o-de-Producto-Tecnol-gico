import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Upload, FileText, CheckCircle2, X } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export function UploadEvidence() {
  const [evidenceType, setEvidenceType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate upload
    setShowSuccess(true);

    // Reset form
    setTimeout(() => {
      setEvidenceType("");
      setAmount("");
      setDescription("");
      setSelectedFile(null);
      setShowSuccess(false);
    }, 3000);
  };

  const isFormValid = evidenceType && amount && selectedFile;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Subir nueva evidencia</CardTitle>
          <CardDescription>
            Completa la información y adjunta una foto o escaneo de tu documento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                ¡Evidencia enviada correctamente! Recibirás una notificación cuando sea revisada.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Evidence Type */}
            <div className="space-y-2">
              <Label htmlFor="evidenceType">
                Tipo de evidencia <span className="text-red-500" aria-label="requerido">*</span>
              </Label>
              <Select value={evidenceType} onValueChange={setEvidenceType} required>
                <SelectTrigger id="evidenceType" aria-required="true">
                  <SelectValue placeholder="Selecciona el tipo de evidencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utility">Servicio público (luz, agua, gas)</SelectItem>
                  <SelectItem value="supplier">Factura de proveedor</SelectItem>
                  <SelectItem value="bank">Transacción bancaria</SelectItem>
                  <SelectItem value="sales">Registro de ventas</SelectItem>
                  <SelectItem value="rent">Pago de arriendo local</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">
                Monto (COP) <span className="text-red-500" aria-label="requerido">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                  required
                  min="0"
                  step="100"
                  aria-required="true"
                />
              </div>
              <p className="text-sm text-gray-500">
                Ingresa el valor total del documento o transacción
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Descripción (opcional)
              </Label>
              <Textarea
                id="description"
                placeholder="Ej: Pago de luz del mes de abril, compra de telas para producción..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file">
                Adjuntar documento <span className="text-red-500" aria-label="requerido">*</span>
              </Label>

              {!selectedFile ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    id="file"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                    required
                    aria-required="true"
                  />
                  <label
                    htmlFor="file"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-10 w-10 text-gray-400" aria-hidden="true" />
                    <span className="font-medium text-gray-700">
                      Haz clic para seleccionar archivo
                    </span>
                    <span className="text-sm text-gray-500">
                      o arrastra y suelta aquí
                    </span>
                    <span className="text-xs text-gray-400 mt-2">
                      PNG, JPG, PDF (máx. 10MB)
                    </span>
                  </label>
                </div>
              ) : (
                <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-600" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    aria-label="Remover archivo"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!isFormValid}
              >
                <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                Enviar evidencia
              </Button>
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                Consejos para una mejor revisión:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Asegúrate de que la foto esté clara y legible</li>
                <li>Captura todo el documento completo</li>
                <li>Verifica que se vea la fecha y el monto</li>
                <li>Si es un recibo, incluye el nombre del establecimiento</li>
              </ul>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
