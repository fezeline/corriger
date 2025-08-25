import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth(); // ✅ on récupère logout ici

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Système de Gestion Touristique
        </h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {user?.nom}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {user?.role}
            </span>
          </div>

          {/* ✅ Bouton Déconnexion intégré */}
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
