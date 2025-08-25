import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, CreditCard, CheckCircle, XCircle, Clock, Download, Filter, Search, Eye, Receipt, Calendar, User, Euro } from 'lucide-react';
import { Paiement } from '../../../types';
import { mockPaiements, mockReservations } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import axios from 'axios';

interface PaiementsListProps {
  onEdit?: (paiement: Paiement) => void;
  onAdd?: () => void;
  onDelete?: (id: number) => void;
}

const PaiementsList: React.FC<PaiementsListProps> = ({ onEdit, onAdd, onDelete }) => {
  const [paiements, setPaiement] = useState<Paiement[]>(mockPaiements);
  const [filteredPaiements, setFilteredPaiements] = useState<Paiement[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { isAdmin, user } = useAuth();

  // Appliquer les filtres initiaux
  useEffect(() => {
    const filtered = isAdmin 
      ? paiements 
      : paiements.filter(p => {
          const reservation = mockReservations.find(r => r.id === p.reservationId);
          return reservation?.utilisateurId === user?.id;
        });
    setFilteredPaiements(filtered);
  }, [paiements, isAdmin, user]);

  // Filtrer les paiements en fonction des critères
  useEffect(() => {
    let result = isAdmin 
      ? paiements 
      : paiements.filter(p => {
          const reservation = mockReservations.find(r => r.id === p.reservationId);
          return reservation?.utilisateurId === user?.id;
        });
    
    // Filtre par recherche
    if (searchTerm) {
      result = result.filter(paiement => 
        paiement.id.toString().includes(searchTerm) ||
        paiement.montant.toString().includes(searchTerm) ||
        paiement.modePayement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paiement.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtre par statut
    if (statusFilter !== 'all') {
      result = result.filter(paiement => paiement.status === statusFilter);
    }
    
    setFilteredPaiements(result);
  }, [paiements, searchTerm, statusFilter, isAdmin, user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Complété';
      case 'failed':
        return 'Échoué';
      default:
        return 'En attente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'carte':
        return <CreditCard className="w-4 h-4" />;
      case 'paypal':
        return <div className="w-4 h-4 bg-blue-500 rounded"></div>;
      case 'virement':
        return <div className="w-4 h-4 bg-green-500 rounded"></div>;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case 'carte':
        return 'bg-blue-100 text-blue-800';
      case 'paypal':
        return 'bg-indigo-100 text-indigo-800';
      case 'virement':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPayement = async () => {
    const res = await axios.get("http://localhost:4005/payement/")
    if (res.data) {
      console.log(res.data)
      setPaiement(res.data)
    } else {
      console.log("erreur paiement")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4005/payement/${id}`);
      setPaiement(paiements.filter(p => p.id !== id));
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error("Erreur lors de la suppression du paiement:", error);
    }
  };

  const getTotalAmount = () => {
    return filteredPaiements
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + Number(p.montant), 0);
  };

  useEffect(() => {
    getPayement();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isAdmin ? 'Gestion des Paiements' : 'Mes Paiements'}
              </h1>
              <p className="text-gray-600 mt-2">
                {filteredPaiements.length} paiement(s) {isAdmin ? 'au total' : 'effectué(s)'}
              </p>
            </div>
            {onAdd && (
              <button
                onClick={onAdd}
                className="mt-4 md:mt-0 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md"
              >
                <Plus className="w-5 h-5" />
                Nouveau paiement
              </button>
            )}
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center">
                <Euro className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-blue-800">Total payé</p>
                  <p className="text-xl font-bold text-blue-800">{getTotalAmount()}€</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-green-800">Paiements réussis</p>
                  <p className="text-xl font-bold text-green-800">
                    {filteredPaiements.filter(p => p.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-center">
                <XCircle className="w-8 h-8 text-red-600 mr-3" />
                <div>
                  <p className="text-sm text-red-800">Paiements échoués</p>
                  <p className="text-xl font-bold text-red-800">
                    {filteredPaiements.filter(p => p.status === 'failed').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un paiement..."
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
                <option value="completed">Complété</option>
                <option value="en attente">En attente</option>
                <option value="failed">Échoué</option>
              </select>
              
              {isAdmin && (
                <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Cartes de paiements */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPaiements.map((paiement) => (
            <div key={paiement.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              {/* En-tête de la carte */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Paiement #{paiement.id}</h3>
                    <p className="text-sm text-gray-500">Réservation: #{paiement.reservationId}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(paiement.status)}`}>
                    {getStatusIcon(paiement.status)}
                    <span className="ml-1">{getStatusLabel(paiement.status)}</span>
                  </span>
                </div>
              </div>

              {/* Détails du paiement */}
              <div className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Euro className="w-5 h-5 mr-3 text-green-500" />
                    <span className="font-semibold">{paiement.montant}€</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{new Date(paiement.date).toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <User className="w-5 h-5 mr-3 text-purple-500" />
                    <span>Utilisateur #{paiement.utilisateurId}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentMethodColor(paiement.modePayement)} mr-3`}>
                      {getPaymentMethodIcon(paiement.modePayement)}
                      <span className="ml-1">{paiement.modePayement}</span>
                    </span>
                  </div>
                  
                  {paiement.description && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600">{paiement.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 py-4 bg-gray-50 flex justify-between items-center">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Voir les détails">
                  <Eye className="w-4 h-4" />
                </button>
                <div className="flex space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(paiement)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => handleDelete(paiement.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Télécharger reçu">
                    <Receipt className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPaiements.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <CreditCard className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun paiement</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {isAdmin 
                ? "Aucun paiement n'a été effectué pour le moment." 
                : "Vous n'avez encore effectué aucun paiement."
              }
            </p>
            {onAdd && (
              <button
                onClick={onAdd}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md"
              >
                <Plus className="w-5 h-5" />
                Effectuer un paiement
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaiementsList;