import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { Login } from "./components/Login";
import { Register, UserRegistrationData } from "./components/Register";
import { BusinessSetup, BusinessData } from "./components/BusinessSetup";
import { Dashboard } from "./components/Dashboard";
import { InvestorsDirectory } from "./components/InvestorsDirectory";

type View = "landing" | "login" | "register" | "businessSetup" | "dashboard" | "directory";

export interface Evidence {
  id: string;
  type: string;
  description: string;
  amount: number;
  date: string;
  status: "approved" | "pending" | "rejected";
}

interface User {
  username: string;
  password: string;
  fullName: string;
  email: string;
  documentType: string;
  documentNumber: string;
  phone: string;
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

export default function App() {
  const [currentView, setCurrentView] = useState<View>("landing");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pendingUserData, setPendingUserData] = useState<UserRegistrationData | null>(null);

  // Usuario de prueba con datos actuales
  const [users, setUsers] = useState<User[]>([
    {
      username: "demo",
      password: "demo123",
      fullName: "Usuario Demo",
      email: "demo@myscore.com",
      documentType: "CC",
      documentNumber: "1234567890",
      phone: "3001234567",
      businessName: "Mi Emprendimiento",
      location: "Medellín",
      sector: "Comercio",
      hasCompletedProfile: true,
      evidences: [
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
      ],
      stats: {
        evidencesSubmitted: 12,
        evidencesApproved: 8,
        evidencesPending: 4,
        creditScore: 45,
      },
    },
  ]);

  const handleLogin = (username: string, password: string): boolean => {
    const user = users.find(
      (u) => (u.username === username || u.email === username) && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      setCurrentView("dashboard");
      return true;
    }
    return false;
  };

  const handleRegister = (userData: UserRegistrationData) => {
    // Verificar si el usuario ya existe
    const existingUser = users.find(
      (u) => u.username === userData.username || u.email === userData.email
    );

    if (existingUser) {
      alert("El nombre de usuario o correo ya está registrado");
      return;
    }

    setPendingUserData(userData);
    setCurrentView("businessSetup");
  };

  const handleBusinessSetupComplete = (businessData: BusinessData) => {
    if (!pendingUserData) return;

    const newUser: User = {
      username: pendingUserData.username,
      password: pendingUserData.password,
      fullName: pendingUserData.fullName,
      email: pendingUserData.email,
      documentType: pendingUserData.documentType,
      documentNumber: pendingUserData.documentNumber,
      phone: pendingUserData.phone,
      businessName: businessData.businessName,
      location: businessData.location,
      sector: businessData.sector,
      hasCompletedProfile: true,
      evidences: [],
      stats: {
        evidencesSubmitted: 0,
        evidencesApproved: 0,
        evidencesPending: 0,
        creditScore: 0,
      },
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setPendingUserData(null);
    setCurrentView("dashboard");
  };

  const handleBusinessSetupSkip = () => {
    if (!pendingUserData) return;

    const newUser: User = {
      username: pendingUserData.username,
      password: pendingUserData.password,
      fullName: pendingUserData.fullName,
      email: pendingUserData.email,
      documentType: pendingUserData.documentType,
      documentNumber: pendingUserData.documentNumber,
      phone: pendingUserData.phone,
      hasCompletedProfile: false,
      evidences: [],
      stats: {
        evidencesSubmitted: 0,
        evidencesApproved: 0,
        evidencesPending: 0,
        creditScore: 0,
      },
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setPendingUserData(null);
    setCurrentView("dashboard");
  };

  const handleAddEvidence = (evidence: Omit<Evidence, "id" | "date" | "status">) => {
    if (!currentUser) return;

    const newEvidence: Evidence = {
      ...evidence,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    const updatedUser = {
      ...currentUser,
      evidences: [newEvidence, ...currentUser.evidences],
      stats: {
        ...currentUser.stats,
        evidencesSubmitted: currentUser.stats.evidencesSubmitted + 1,
        evidencesPending: currentUser.stats.evidencesPending + 1,
      },
    };

    setCurrentUser(updatedUser);
    setUsers((prev) =>
      prev.map((u) => (u.username === currentUser.username ? updatedUser : u))
    );
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("landing");
  };

  return (
    <div className="min-h-screen">
      {currentView === "landing" && (
        <LandingPage
          onGetStarted={() => setCurrentView("register")}
          onLogin={() => setCurrentView("login")}
        />
      )}
      {currentView === "login" && (
        <Login
          onLogin={handleLogin}
          onNavigateToRegister={() => setCurrentView("register")}
        />
      )}
      {currentView === "register" && (
        <Register
          onRegister={handleRegister}
          onNavigateToLogin={() => setCurrentView("login")}
        />
      )}
      {currentView === "businessSetup" && (
        <BusinessSetup
          onComplete={handleBusinessSetupComplete}
          onSkip={handleBusinessSetupSkip}
        />
      )}
      {currentView === "dashboard" && currentUser && (
        <Dashboard
          onLogout={handleLogout}
          user={currentUser}
          onAddEvidence={handleAddEvidence}
        />
      )}
      {currentView === "directory" && (
        <InvestorsDirectory onLogout={handleLogout} />
      )}
    </div>
  );
}