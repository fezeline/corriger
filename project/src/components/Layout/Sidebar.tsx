import React from 'react';
import { 
  Home, 
  Calendar, 
  Car, 
  MapPin, 
  Activity, 
  Star, 
  MessageSquare, 
  CreditCard, 
  Users,
  Package
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const { isAdmin, logout } = useAuth();

  const adminSections = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'offres', label: 'Offres', icon: Package },
    { id: 'hebergements', label: 'Hébergements', icon: Home },
    { id: 'voitures', label: 'Voitures', icon: Car },
    { id: 'activites', label: 'Activités', icon: Activity },
    { id: 'visites', label: 'Visites', icon: MapPin },
    { id: 'reservations', label: 'Réservations', icon: Calendar },
    { id: 'paiements', label: 'Paiements', icon: CreditCard },
    { id: 'commentaires', label: 'Commentaires', icon: Star },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'utilisateurs', label: 'Utilisateurs', icon: Users }
  ];

  const clientSections = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'offres', label: 'Offres Disponibles', icon: Package },
    { id: 'reservations', label: 'Mes Réservations', icon: Calendar },
    { id: 'paiements', label: 'Mes Paiements', icon: CreditCard },
    { id: 'commentaires', label: 'Mes Commentaires', icon: Star },
    { id: 'messages', label: 'Messages', icon: MessageSquare }
  ];

  const sections = isAdmin ? adminSections : clientSections;

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-center">
          {isAdmin ? 'Administration' : 'Mon Espace Client'}
        </h2>
      </div>

      <nav className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
};

export default Sidebar;