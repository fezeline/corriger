import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, CheckCircle, XCircle, Calendar, Users, CreditCard, ArrowRight, Filter, Download, Search } from 'lucide-react';
import { Reservation } from '../../../types';
import { mockReservations, mockOffres } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import ActionButtons from '../../Common/ActionButtons';
import axios from 'axios';

interface ReservationsListProps {
  onEdit: (reservation: Reservation) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const ReservationsList: React.FC<ReservationsListProps> = ({ onEdit, onAdd, onDelete }) => {
  const [reservations, setReservation] = useState<Reservation[]>(mockReservations);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { isAdmin, user } = useAuth();

  // Appliquer les filtres initiaux
  useEffect(() => {
    const filtered = isAdmin 
      ? reservations 
      : reservations.filter(r => r.utilisateurId === user?.id);
    setFilteredReservations(filtered);
  }, [reservations, isAdmin, user]);

  // Filtrer les réservations en fonction des critères
  useEffect(() => {
    let result = isAdmin 
      ? reservations 
      : reservations.filter(r => r.utilisateurId === user?.id);
    
    // Filtre par recherche
    if (searchTerm) {
      result = result.filter(reservation => 
        getOffreTitre(reservation.offreId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.id.toString().includes(searchTerm) ||
        reservation.statut.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtre par statut
    if (statusFilter !== 'all') {
      result = result.filter(reservation => reservation.statut === statusFilter);
    }
    
    setFilteredReservations(result);
  }, [reservations, searchTerm, statusFilter, isAdmin, user]);

  const getOffreTitre = (offreId: number) => {
    const offre = mockOffres.find(o => o.id === offreId);
    return offre?.titreOffre || 'Offre inconnue';
  };

  const getTotalPrice = (reservation: Reservation) => {
    return Number(reservation.prixParPersonne) * Number(reservation.nombrePers);
  };

  const getReservation = async () => {
    const res = await axios.get("http://localhost:4005/reservation/")
    if (res.data) {
      console.log(res.data)
      setReservation(res.data)
    } else {
      console.log("erreur reservation")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4005/reservation/${id}`);
      setReservation(reservations.filter(h => h.id !== id));
      onDelete(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de la réservation:", error);
    }
  };

  const getStatusStyle = (statut: string) => {
    switch (statut) {
      case 'confirme':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'annule':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'en attente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'confirme':
        return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'annule':
        return <XCircle className="w-4 h-4 mr-1" />;
      default:
        return <div className="w-2 h-2 mr-2 bg-yellow-500 rounded-full animate-pulse"></div>;
    }
  };

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'confirme':
        return 'Confirmé';
      case 'annule':
        return 'Annulé';
      case 'en attente':
        return 'En attente';
      default:
        return statut;
    }
  };

  useEffect(() => {
    getReservation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isAdmin ? 'Gestion des Réservations' : 'Mes Réservations'}
              </h1>
              <p className="text-gray-600 mt-2">
                {filteredReservations.length} réservation(s) {isAdmin ? 'au total' : 'effectuée(s)'}
              </p>
            </div>
           {!isAdmin && (
          <button
           onClick={onAdd}
           className="mt-4 md:mt-0 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md"
          >
           <Plus className="w-5 h-5" />
             Nouvelle réservation
          </button>
          )}
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une réservation..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="confirme">Confirmé</option>
                <option value="en attente">En attente</option>
                <option value="annule">Annulé</option>
              </select>
              
            </div>
          </div>
        </div>

        {/* Cartes de réservations */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReservations.map((reservation) => (
            <div key={reservation.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              {/* En-tête de la carte */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{getOffreTitre(reservation.offreId)}</h3>
                    <p className="text-sm text-gray-500">Réf: #{reservation.id}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(reservation.statut)}`}>
                    {getStatusIcon(reservation.statut)}
                    {getStatusText(reservation.statut)}
                  </span>
                </div>
              </div>

              {/* Détails de la réservation */}
              <div className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{new Date(reservation.dateReservation).toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 mr-3 text-green-500" />
                    <span>{reservation.nombrePers} personne(s)</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <CreditCard className="w-5 h-5 mr-3 text-purple-500" />
                    <span>{Number(reservation.prixParPersonne)}€ / personne</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total:</span>
                      <span className="text-lg font-bold text-blue-600">{getTotalPrice(reservation)}€</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 py-4 bg-gray-50 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Utilisateur #{reservation.utilisateurId}
                </div>
               {!isAdmin && (
                <div className="flex space-x-2">
                  <button
                   onClick={() => onEdit(reservation)}
                   className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                   title="Modifier"
                    >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                   onClick={() => handleDelete(reservation.id)}
                   className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                   title="Supprimer"
                  >
                 <Trash2 className="w-4 h-4" />
                 </button>
              </div>
               )}
              </div>
            </div>
          ))}
        </div>

        {filteredReservations.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Calendar className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune réservation</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {isAdmin 
                ? "Aucune réservation n'a été effectuée pour le moment." 
                : "Vous n'avez encore effectué aucune réservation. Réservez dès maintenant !"
              }
            </p>
            <button
              onClick={onAdd}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md"
            >
              <Plus className="w-5 h-5" />
              Créer ma première réservation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsList;