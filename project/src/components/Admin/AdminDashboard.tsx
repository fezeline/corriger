import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Home, 
  Car, 
  Activity, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Star, 
  MessageSquare,
  Users,
  RefreshCw,
  AlertCircle,
  Bell,
  X,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import axios from 'axios';

interface DashboardStats {
  offres: number;
  hebergements: number;
  voitures: number;
  activites: number;
  reservations: number;
  utilisateurs: number;
  paiements: number;
  revenuTotal: number;
}

interface RecentActivity {
  type: string;
  message: string;
  timestamp: string;
  user?: string;
}

interface RecentMessage {
  subject: string;
  email: string;
  timestamp: string;
  status: string;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    offres: 0,
    hebergements: 0,
    voitures: 0,
    activites: 0,
    reservations: 0,
    utilisateurs: 0,
    paiements: 0,
    revenuTotal: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Charger les notifications depuis le localStorage au chargement
  useEffect(() => {
    const savedNotifications = localStorage.getItem('adminNotifications');
    if (savedNotifications) {
      try {
        const parsedNotifications = JSON.parse(savedNotifications).map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
        setNotifications(parsedNotifications);
      } catch (error) {
        console.error('Erreur lors du chargement des notifications:', error);
      }
    }
  }, []);

  // Sauvegarder les notifications dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (type: Notification['type'], title: string, message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [
        offresRes, 
        hebergementsRes, 
        voituresRes, 
        activitesRes, 
        reservationsRes, 
        utilisateursRes,
        paiementsRes
      ] = await Promise.all([
        axios.get('http://localhost:4005/offre'),
        axios.get('http://localhost:4005/hebergement'),
        axios.get('http://localhost:4005/voiture'),
        axios.get('http://localhost:4005/activite'),
        axios.get('http://localhost:4005/reservation'),
        axios.get('http://localhost:4005/utilisateur'),
        axios.get('http://localhost:4005/payement')
      ]);

      // Calculate total revenue
      const paiements = paiementsRes.data || [];
      const revenuTotal = paiements.reduce((total: number, paiement: any) => 
        total + (paiement.montant || 0), 0
      );

      const newStats = {
        offres: offresRes.data?.length || 0,
        hebergements: hebergementsRes.data?.length || 0,
        voitures: voituresRes.data?.length || 0,
        activites: activitesRes.data?.length || 0,
        reservations: reservationsRes.data?.length || 0,
        utilisateurs: utilisateursRes.data?.length || 0,
        paiements: paiements.length,
        revenuTotal
      };

      setStats(newStats);

      // Générer une notification si le revenu a augmenté significativement
      if (stats.revenuTotal > 0 && revenuTotal > stats.revenuTotal * 1.2) {
        addNotification(
          'success', 
          'Revenu en hausse', 
          `Votre revenu a augmenté de ${((revenuTotal - stats.revenuTotal) / stats.revenuTotal * 100).toFixed(1)}% depuis la dernière actualisation`
        );
      }

      // Générer une notification pour les nouvelles réservations
      if (newStats.reservations > stats.reservations) {
        const newReservations = newStats.reservations - stats.reservations;
        addNotification(
          'info',
          'Nouvelles réservations',
          `${newReservations} nouvelle(s) réservation(s) depuis la dernière actualisation`
        );
      }

      // Generate recent activities from reservations
      const reservations = reservationsRes.data || [];
      const activities: RecentActivity[] = reservations
        .slice(0, 5)
        .map((res: any) => ({
          type: 'reservation',
          message: `Nouvelle réservation #${res.id}`,
          timestamp: new Date(res.createdAt || res.dateReservation).toLocaleString('fr-FR'),
          user: `User ${res.utilisateurId}`
        }));

      setRecentActivities(activities);

      // Simulate recent messages (you can replace with actual API call)
      const messages: RecentMessage[] = [
        {
          subject: 'Question sur le circuit Paris',
          email: 'client@email.com',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toLocaleString('fr-FR'),
          status: 'new'
        },
        {
          subject: 'Demande de modification',
          email: 'user@example.com',
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toLocaleString('fr-FR'),
          status: 'in-progress'
        },
        {
          subject: 'Réclamation hébergement',
          email: 'contact@client.fr',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString('fr-FR'),
          status: 'resolved'
        }
      ];
      setRecentMessages(messages);

      // Ajouter une notification de succès
      addNotification('success', 'Données actualisées', 'Les données du tableau de bord ont été mises à jour avec succès');

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      addNotification('error', 'Erreur de chargement', 'Impossible de charger les données du tableau de bord');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Ajouter une notification de bienvenue au premier chargement
    addNotification('info', 'Bienvenue', 'Bienvenue dans votre tableau de bord administratif');

    // Refresh data every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const statsConfig = [
    { label: 'Offres', value: stats.offres, icon: Package, color: 'bg-blue-500' },
    { label: 'Hébergements', value: stats.hebergements, icon: Home, color: 'bg-green-500' },
    { label: 'Voitures', value: stats.voitures, icon: Car, color: 'bg-yellow-500' },
    { label: 'Activités', value: stats.activites, icon: Activity, color: 'bg-purple-500' },
    { label: 'Réservations', value: stats.reservations, icon: Calendar, color: 'bg-red-500' },
    { label: 'Utilisateurs', value: stats.utilisateurs, icon: Users, color: 'bg-indigo-500' },
    { label: 'Paiements', value: stats.paiements, icon: CreditCard, color: 'bg-teal-500' },
    { label: 'Revenu Total', value: `${stats.revenuTotal.toFixed(2)}€`, icon: CreditCard, color: 'bg-emerald-500' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'reservation': return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'payment': return <CreditCard className="w-5 h-5 text-green-500" />;
      case 'review': return <Star className="w-5 h-5 text-yellow-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'border-blue-500';
      case 'in-progress': return 'border-yellow-500';
      case 'resolved': return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mr-3" />
          <div className="text-lg text-gray-600">Chargement des données...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Notifications Bell and Dropdown */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <Bell className="w-6 h-6 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Notifications</h3>
              <div className="flex space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Tout marquer comme lu
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Tout effacer
                  </button>
                )}
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 ${getNotificationBgColor(notification.type)} ${notification.read ? 'opacity-75' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.timestamp.toLocaleString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {!notification.read && (
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Marquer comme lu
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Aucune notification</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Administration</h1>
          <p className="text-gray-600 mt-2">Vue d'ensemble de votre système de gestion touristique</p>
          <p className="text-sm text-gray-500 mt-1">
            Dernière mise à jour: {lastUpdated.toLocaleString('fr-FR')}
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </button>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsConfig.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`${stat.color} rounded-lg p-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                {stat.label === 'Revenu Total' && (
                  <div className="text-right">
                    <p className="text-sm text-green-600 font-medium">+2.5%</p>
                    <p className="text-xs text-gray-500">vs mois dernier</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart (Placeholder) */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenu Mensuel</h3>
          <div className="bg-gray-100 rounded-lg p-4 h-48 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <CreditCard className="w-12 h-12 mx-auto mb-2" />
              <p>Graphique de revenu</p>
              <p className="text-sm">(Intégration chart.js à venir)</p>
            </div>
          </div>
        </div>

        {/* Reservation Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statuts des Réservations</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Confirmées</span>
              <span className="text-lg font-bold text-green-600">
                {Math.round(stats.reservations * 0.7)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">En attente</span>
              <span className="text-lg font-bold text-yellow-600">
                {Math.round(stats.reservations * 0.2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Annulées</span>
              <span className="text-lg font-bold text-red-600">
                {Math.round(stats.reservations * 0.1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities and Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">
                      {activity.user} • {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <AlertCircle className="w-12 h-12 mx-auto mb-2" />
                <p>Aucune activité récente</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages Récents</h3>
          <div className="space-y-4">
            {recentMessages.map((message, index) => (
              <div key={index} className={`border-l-4 ${getStatusColor(message.status)} pl-4`}>
                <p className="text-sm font-medium">{message.subject}</p>
                <p className="text-xs text-gray-500">
                  {message.email} • {message.timestamp}
                </p>
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-gray-100 rounded">
                  {message.status === 'new' ? 'Nouveau' : 
                   message.status === 'in-progress' ? 'En cours' : 'Résolu'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;