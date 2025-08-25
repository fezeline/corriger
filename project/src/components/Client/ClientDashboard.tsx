import React, { useEffect, useState } from 'react';
import { 
  Package, 
  Calendar, 
  Star, 
  MessageSquare,
  Clock,
  CreditCard,
  User
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

interface Reservation {
  id: number;
  titre: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
  utilisateurId: number;
}

interface Offre {
  id: number;
  titre: string;
  prix: number;
  image: string;
}

interface Message {
  id: number;
  expediteur: string;
  contenu: string;
  utilisateurId: number;
}

interface Commentaire {
  id: number;
  utilisateur: string;
  texte: string;
  utilisateurId: number;
}

interface Paiement {
  id: number;
  montant: number;
  date: string;
  utilisateurId: number;
}

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    { label: 'Réservations Actives', value: 0, icon: Calendar, color: 'bg-blue-500' },
    { label: 'Offres Favorites', value: 0, icon: Package, color: 'bg-green-500' },
    { label: 'Commentaires', value: 0, icon: Star, color: 'bg-yellow-500' },
    { label: 'Messages', value: 0, icon: MessageSquare, color: 'bg-purple-500' },
    { label: 'Paiements', value: 0, icon: CreditCard, color: 'bg-pink-500' }
  ]);

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [offres, setOffres] = useState<Offre[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);
  const [paiements, setPaiements] = useState<Paiement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        // Récupérer toutes les données
        const [resReservations, resOffres, resMessages, resCommentaires, resPaiements] = await Promise.all([
          axios.get("http://localhost:4005/reservation"),
          axios.get("http://localhost:4005/offre"),
          axios.get("http://localhost:4005/message"),
          axios.get("http://localhost:4005/commentaire"),
          axios.get("http://localhost:4005/paiement")
        ]);

        // Filtrer par utilisateur connecté
        const userReservations = resReservations.data.filter((r: Reservation) => r.utilisateurId === user.id);
        const userMessages = resMessages.data.filter((m: Message) => m.utilisateurId === user.id);
        const userCommentaires = resCommentaires.data.filter((c: Commentaire) => c.utilisateurId === user.id);
        const userPaiements = resPaiements.data.filter((p: Paiement) => p.utilisateurId === user.id);

        // Mettre à jour les états
        setReservations(userReservations);
        setOffres(resOffres.data.slice(0, 3)); // 3 premières offres
        setMessages(userMessages.slice(0, 3)); // 3 derniers messages
        setCommentaires(userCommentaires.slice(0, 3)); // 3 derniers commentaires
        setPaiements(userPaiements.slice(0, 3)); // 3 derniers paiements

        // Mettre à jour les stats
        setStats([
          { label: 'Réservations Actives', value: userReservations.length, icon: Calendar, color: 'bg-blue-500' },
          { label: 'Offres Favorites', value: 0, icon: Package, color: 'bg-green-500' }, // À adapter si vous avez des favoris
          { label: 'Commentaires', value: userCommentaires.length, icon: Star, color: 'bg-yellow-500' },
          { label: 'Messages', value: userMessages.length, icon: MessageSquare, color: 'bg-purple-500' },
          { label: 'Paiements', value: userPaiements.length, icon: CreditCard, color: 'bg-pink-500' }
        ]);

      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Chargement de votre tableau de bord...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* En-tête avec bienvenue personnalisée */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mon Tableau de Bord</h1>
            <p className="text-gray-600">Bienvenue {user?.email}</p>
          </div>
        </div>
      </div>

      {/* Cartes stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Réservations & Offres */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Réservations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mes Prochaines Réservations</h3>
          <div className="space-y-4">
            {reservations.length > 0 ? (
              reservations.map((resa, i) => (
                <div key={i} className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{resa.titre || `Réservation #${resa.id}`}</p>
                    <p className="text-xs text-gray-500">
                      {resa.dateDebut ? new Date(resa.dateDebut).toLocaleDateString('fr-FR') : 'Date non définie'}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    resa.statut === "confirme" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {resa.statut === "confirme" ? "Confirmé" : "En attente"}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Calendar className="w-12 h-12 mx-auto mb-2" />
                <p>Aucune réservation</p>
              </div>
            )}
          </div>
        </div>

        {/* Offres Recommandées */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Offres Recommandées</h3>
          <div className="space-y-4">
            {offres.length > 0 ? (
              offres.map((offre, i) => (
                <div key={i} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <img
                    src={offre.image || "/placeholder-image.jpg"}
                    alt={offre.titre}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{offre.titre}</p>
                    <p className="text-xs text-gray-500">À partir de {offre.prix}€</p>
                  </div>
                  <button className="text-xs text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    Voir plus
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Package className="w-12 h-12 mx-auto mb-2" />
                <p>Aucune offre disponible</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages, Commentaires, Paiements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages récents</h3>
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((msg, i) => (
                <div key={i} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm font-medium text-gray-900">{msg.expediteur || "Expéditeur inconnu"}</p>
                  <p className="text-xs text-gray-600 truncate">{msg.contenu || "Aucun contenu"}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Aucun message</p>
              </div>
            )}
          </div>
        </div>

        {/* Commentaires */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Derniers Commentaires</h3>
          <div className="space-y-4">
            {commentaires.length > 0 ? (
              commentaires.map((c, i) => (
                <div key={i} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-gray-900">{c.utilisateur || "Utilisateur"}</p>
                  <p className="text-xs text-gray-600">"{c.texte || "Aucun texte"}"</p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Aucun commentaire</p>
              </div>
            )}
          </div>
        </div>

        {/* Paiements */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Derniers Paiements</h3>
          <div className="space-y-4">
            {paiements.length > 0 ? (
              paiements.map((p, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-pink-50 rounded-lg border border-pink-200">
                  <span className="text-sm font-medium text-gray-900">{p.montant}€</span>
                  <span className="text-xs text-gray-600">
                    {p.date ? new Date(p.date).toLocaleDateString('fr-FR') : 'Date inconnue'}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                <CreditCard className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Aucun paiement</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;