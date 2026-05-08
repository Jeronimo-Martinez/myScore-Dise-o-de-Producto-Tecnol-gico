import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, Shield, Sparkles, TrendingUp, Users, Eye, MessageCircle } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-blue-600" aria-hidden="true" />
            <h1 className="font-bold text-xl md:text-2xl text-gray-900">myScore</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={onLogin} variant="outline" size="sm">
              Iniciar sesión
            </Button>
            <Button onClick={onGetStarted} size="sm">
              Comenzar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Tu negocio merece crecer
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Construye tu historial crediticio sin complicaciones. Registra tus ventas,
            pagos y compras para acceder a beneficios financieros diseñados para emprendedores como tú.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={onGetStarted} className="text-lg px-8">
              Empezar ahora
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Ver cómo funciona
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
          ¿Por qué usar myScore?
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CheckCircle2 className="h-10 w-10 text-green-600 mb-2" aria-hidden="true" />
              <CardTitle>Sin papeleos complicados</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                No necesitas cámara de comercio ni RUT. Solo evidencias simples de tu día a día.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-blue-600 mb-2" aria-hidden="true" />
              <CardTitle>Tu información segura</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Tus datos están protegidos y solo se comparten con entidades autorizadas que tú elijas.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Sparkles className="h-10 w-10 text-purple-600 mb-2" aria-hidden="true" />
              <CardTitle>Fácil de usar</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Toma fotos de tus facturas y recibos. Nosotros nos encargamos del resto.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-orange-600 mb-2" aria-hidden="true" />
              <CardTitle>Crece tu negocio</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Accede a microcréditos y beneficios para expandir tu emprendimiento.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-blue-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
            Cómo funciona
          </h3>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h4 className="font-semibold text-lg">Registra evidencias</h4>
              <p className="text-gray-600">
                Sube fotos de tus recibos, facturas de servicios, compras a proveedores y ventas.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h4 className="font-semibold text-lg">Construye historial</h4>
              <p className="text-gray-600">
                Las entidades bancarias revisan y reconocen tus movimientos económicos.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h4 className="font-semibold text-lg">Accede a beneficios</h4>
              <p className="text-gray-600">
                Recibe ofertas de crédito, ahorro y otros servicios para tu negocio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Connection Process */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900">
          Conéctate con inversionistas
        </h3>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Tu historial verificado abre puertas a oportunidades de inversión
        </p>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Eye className="h-10 w-10 text-blue-600 mb-2" aria-hidden="true" />
              <CardTitle>Hazte visible</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Una vez tengas evidencias verificadas por entidades bancarias, activa la visibilidad
                de tu perfil en el directorio de inversionistas. Tu información crediticia respaldada
                genera confianza.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-green-600 mb-2" aria-hidden="true" />
              <CardTitle>Recibe interés</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Inversionistas interesados en tu sector y ubicación pueden ver tu puntaje crediticio
                y el número de evidencias verificadas. No compartimos tus documentos ni datos personales,
                solo tu perfil público.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageCircle className="h-10 w-10 text-purple-600 mb-2" aria-hidden="true" />
              <CardTitle>Conecta directamente</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Cuando un inversionista expresa interés, recibes una notificación. Tú decides con
                quién conectar y cuándo. El control siempre está en tus manos para hacer crecer tu negocio.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl text-white">
              Empieza a construir tu futuro financiero hoy
            </CardTitle>
            <CardDescription className="text-blue-100 text-base">
              Miles de emprendedores ya están creando su historial crediticio con myScore
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-8">
            <Button
              size="lg"
              variant="secondary"
              onClick={onGetStarted}
              className="text-lg px-8"
            >
              Comenzar gratis
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2026 myScore. Impulsando el crecimiento de emprendedores en Medellín y Antioquia.</p>
        </div>
      </footer>
    </div>
  );
}
