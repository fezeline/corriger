import React, { useEffect, useState } from 'react';
import { X, Users, Euro, Calendar } from 'lucide-react';
import { Reservation } from '../../../types';
import { useAuth } from '../../../hooks/useAuth';
import axios from 'axios';

interface Offre {
  id: number;
  titreOffre: string;
  PrixParPersonne: number;
}

interface Utilisateur {
  id: number;
  email: string;
}

interface ReservationFormProps {
  reservation?: Reservation;
  onReserve: (reservation: Reservation) => void; // Changé de onSubmit à onReserve
  onCancel: () => void;
  utilisateurId: number;
  offreId: number;
  utilisateur?: { id: number; email: string } | null;
  offre?: { id: number; titreOffre: string; PrixParPersonne: number } | null;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ reservation,  onReserve, onCancel }) => {
  const { user } = useAuth();

  const [offres, setOffres] = useState<Offre[]>([]);
  const [loadingOffres, setLoadingOffres] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [users, setUsers] = useState<Utilisateur[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);

  const [offreId, setOffreId] = useState(reservation?.offreId || 0);
  const [utilisateurId, setUtilisateurId] = useState(reservation?.utilisateurId || user?.id || 0);
  const [nombrePers, setNombrePers] = useState(reservation?.nombrePers || 1);
  const [prixParPersonne, setPrixParPersonne] = useState(reservation?.prixParPersonne || 0);
  const [dateReservation, setDateReservation] = useState(reservation?.dateReservation || new Date().toISOString().split('T')[0]);
  const [statut, setStatut] = useState(reservation?.statut || 'en_attente');
  const [isLoading, setIsLoading] = useState(false);

  const selectedOffre = offres.find(o => o.id === offreId);
  const montantTotal = nombrePers * prixParPersonne;

  useEffect(() => {
    const fetchOffres = async () => {
      setLoadingOffres(true);
      try {
        const response = await axios.get("http://localhost:4005/offre/");
        setOffres(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des offres:", error);
        setError("Impossible de charger les offres");
      } finally {
        setLoadingOffres(false);
      }
    };

    fetchOffres();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const res = await axios.get("http://localhost:4005/utilisateur");
        setUsers(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        setErrorUsers("Impossible de charger les utilisateurs");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const handleReservationSubmit = async () => {
    try {
      setIsLoading(true);
      
      const formData = {
        offreId,
        utilisateurId,
        nombrePers,
        dateReservation,
        prixParPersonne,
        statut: 'en_attente' // Toujours en attente, pas de paiement
      };

      if (reservation?.id) {
        // MODIFICATION d'une réservation existante
        const reservationRes = await axios.put(`http://localhost:4005/reservation/${reservation.id}`, formData);
        
        onReserve({
          ...reservation,
          ...formData,
          montantTotal,
          offre: offres.find(o => o.id === offreId) || null,
          utilisateur: users.find(u => u.id === utilisateurId) || null
        } as Reservation);
        
      } else {
        // CRÉATION d'une nouvelle réservation (SANS PAIEMENT)
        const reservationRes = await axios.post("http://localhost:4005/reservation/", formData);
        
       onReserve({
          id: reservationRes.data.id,
          ...formData,
          montantTotal,
          offre: offres.find(o => o.id === offreId) || null,
          utilisateur: users.find(u => u.id === utilisateurId) || null
        } as Reservation);
      }
      
      // Fermer le modal après succès
      onCancel();
    } catch (err) {
      setError("Erreur lors de " + (reservation?.id ? "la modification" : "la création") + " de la réservation");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => (
    <div className="space-y-6">
      {/* Sélection utilisateur */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Utilisateur</label>
        <select
          value={utilisateurId}
          onChange={(e) => setUtilisateurId(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Sélectionnez un utilisateur</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              ID: {u.id} — {u.email}
            </option>
          ))}
        </select>
        {loadingUsers && <p className="text-sm text-gray-500 mt-1">Chargement des utilisateurs...</p>}
        {errorUsers && <p className="text-sm text-red-500 mt-1">{errorUsers}</p>}
      </div>

      {/* Sélection de l'offre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Offre</label>
        <select
          value={offreId}
          onChange={(e) => {
            const selectedId = Number(e.target.value);
            setOffreId(selectedId);
            const offre = offres.find(o => o.id === selectedId);
            if (offre) {
              setPrixParPersonne(offre.PrixParPersonne);
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Sélectionnez une offre</option>
          {offres.map(offre => (
            <option key={offre.id} value={offre.id}>
              {offre.titreOffre} - {offre.PrixParPersonne}€/personne
            </option>
          ))}
        </select>
        {loadingOffres && <p className="text-sm text-gray-500 mt-1">Chargement des offres...</p>}
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>

      {offreId > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4">
            {/* Nombre de personnes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de personnes</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setNombrePers(Math.max(1, nombrePers - 1))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >-</button>
                <span className="text-lg font-semibold w-8 text-center">{nombrePers}</span>
                <button
                  onClick={() => setNombrePers(nombrePers + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >+</button>
              </div>
            </div>

            {/* Prix par personne */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix par personne</label>
              <div className="flex items-center space-x-1">
                <Euro className="w-4 h-4 text-green-600" />
                <span className="text-lg font-semibold text-green-600">{prixParPersonne}€</span>
              </div>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de réservation</label>
            <input
              type="date"
              value={dateReservation}
              onChange={(e) => setDateReservation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Statut de la réservation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select 
              value={statut} 
              onChange={(e) => setStatut(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en_attente">En attente</option>
              <option value="confirme">Confirmé</option>
              <option value="annule">Annulé</option>
            </select>
          </div>

          {/* Total */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Sous-total ({nombrePers} × {prixParPersonne}€)</span>
              <span className="font-medium">{montantTotal}€</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span className="text-green-600">{montantTotal}€</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >Annuler</button>
            <button
              onClick={handleReservationSubmit}
              disabled={!offreId || isLoading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Traitement...' : 'Réserver'}
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Réservation</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenu */}
        {renderForm()}
      </div>
    </div>
  );
};

export default ReservationForm;