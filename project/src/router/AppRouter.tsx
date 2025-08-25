import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, useAuthState } from '../hooks/useAuth';

// Layouts
import VitrineLayout from '../components/Vitrine/VitrineLayout';

// Pages Vitrine
import Accueil from '../components/Vitrine/Accueil';
import APropos from '../components/Vitrine/APropos';
import Services from '../components/Vitrine/Services';
import Destinations from '../components/Vitrine/Destinations';

// Pages Auth
import LoginPage from '../components/Auth/LoginPage';
import RegisterPage from '../components/Auth/RegisterPage';

// Application principale (dashboard)
import AppDashboard from '../AppDashboard';

const AppRouter: React.FC = () => {
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>
      <Router>
        <Routes>
          {/* Routes publiques avec layout vitrine */}
          <Route path="/" element={<VitrineLayout />}>
            <Route index element={<Accueil />} />
            <Route path="a-propos" element={<APropos />} />
            <Route path="services" element={<Services />} />
            <Route path="destinations" element={<Destinations />} />
          </Route>

          {/* Routes d'authentification */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Routes de l'application (dashboard) */}
          <Route 
            path="/dashboard/*" 
            element={
              authState.user ? (
                <AppDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default AppRouter;