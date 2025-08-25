import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, Eye, Filter, X } from 'lucide-react';
import { Offre, Reservation } from '../../../types';
import { mockOffres } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import ActionButtons from '../../Common/ActionButtons';
import ReservationForm from '../../Client/Crud/ReservationForm';
import axios from 'axios';

interface OffresListProps {
  onEdit: (offre: Offre) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
  onSubmit: (offre: Offre) => void;
}

const OffresList: React.FC<OffresListProps> = ({ onEdit, onAdd, onDelete, onSubmit }) => {
  const [offres, setOffre] = useState<Offre[]>(mockOffres);
  const { isAdmin, user } = useAuth();
  const [selectedOffre, setSelectedOffre] = useState<Offre | null>(null);
  const [showReservation, setShowReservation] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [prixMax, setPrixMax] = useState<number>(0);
  
  // Filtrer les offres selon le prix maximum
  const offresFiltrees = prixMax > 0 
    ? offres.filter(o => o.prixParPers <= prixMax)
    : offres;

  const handleReserveClick = (offre: Offre) => {
    setSelectedOffre(offre);
    setShowReservation(true);
  };

  const handleReservationSubmit = async (reservationData: any) => {
    try {
      // Préparer les données pour l'API
      const reservationPayload = {
        offreId: selectedOffre?.id,
        utilisateurId: user?.id,
        nombrePers: reservationData.nombrePers,
        dateReservation: reservationData.dateReservation,
        prixParPersonne: selectedOffre?.prixParPers,
        statut: 'en_attente'
      };

      const res = await axios.post("http://localhost:4005/reservation/", reservationPayload);

      if (res.data) {
        console.log("Réservation enregistrée avec succès :", res.data);
        alert('Réservation effectuée avec succès !');
      } else {
        console.error("Erreur lors de l'enregistrement de la réservation");
        alert('Erreur lors de la réservation');
      }
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      alert('Erreur lors de la réservation');
    }

    setShowReservation(false);
    setSelectedOffre(null);
  };

  const resetPriceFilter = () => {
    setPrixMax(0);
  };

  const getOffre = async () => {
    try {
      const res = await axios.get("http://localhost:4005/offre/")
      if (res.data) {
        setOffre(res.data)
      }
    } catch (error) {
      console.error("Erreur lors du chargement des offres:", error);
    }
  }

  useEffect(() => {
    getOffre();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isAdmin ? 'Gestion des Offres' : 'Offres Disponibles'}
        </h1>
        <div className="flex space-x-4">
          {!isAdmin && (
            <button
              onClick={() => setShowPriceFilter(!showPriceFilter)}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtre par prix
            </button>
          )}
          {isAdmin && (
            <ActionButtons
              onAdd={onAdd}
              showEdit={false}
              showDelete={false}
            />
          )}
        </div>
      </div>

      {/* Filtre par prix */}
      {showPriceFilter && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filtrer par prix maximum</h2>
            <button 
              onClick={resetPriceFilter}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Réinitialiser
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix maximum: {prixMax > 0 ? `${prixMax}€` : 'Aucun filtre'}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={prixMax}
                onChange={(e) => setPrixMax(Number(e.target.value))}
                className="flex-1"
              />
              <input
                type="number"
                min="0"
                value={prixMax || ''}
                onChange={(e) => setPrixMax(Number(e.target.value) || 0)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Prix max"
              />
            </div>
          </div>
          
          {prixMax > 0 && (
            <div className="text-sm text-gray-600">
              {offresFiltrees.length} offre(s) correspondant à ce critère
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offresFiltrees.map((offre) => (
          <div key={offre.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={offre.imagePrincipale}
              alt={offre.titreOffre}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {offre.titreOffre}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {offre.descriptionOffre}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Prix par personne:</span>
                  <span className={`font-semibold ${
                    prixMax > 0 && offre.prixParPers > prixMax 
                      ? 'text-red-600' 
                      : 'text-blue-600'
                  }`}>
                    {offre.prixParPers}€
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Durée:</span>
                  <span className="text-gray-900">{offre.duree} jours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Places disponibles:</span>
                  <span className="text-gray-900">{offre.placeDisponible}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Départ:</span>
                  <span className="text-gray-900">
                    {new Date(offre.dateDepart).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Retour:</span>
                  <span className="text-gray-900">
                    {new Date(offre.dateRetour).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                {isAdmin ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(offre)}
                      className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Modifier
                    </button>
                    <button
                      onClick={() => onDelete(offre.id)}
                      className="flex items-center px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2 w-full">
                    <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                      <Eye className="w-4 h-4 mr-1" />
                      Détails
                    </button>
                    <button
                      onClick={() => handleReserveClick(offre)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                    >
                      Réserver
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de réservation - CORRECTION ICI */}
      {showReservation && selectedOffre && (
        <ReservationForm
          onSubmit={handleReservationSubmit} // Changé de onSubmit à onReserve
          onCancel={() => {
            setShowReservation(false);
            setSelectedOffre(null);
          }}
          offre={selectedOffre}
          utilisateurId={user?.id || 0}
        />
      )}
    </div>
  );
};

export default OffresList;