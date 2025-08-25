import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, CheckCircle, XCircle } from 'lucide-react';
import { Reservation, Offre } from '../../../types';
import { useAuth } from '../../../hooks/useAuth';
import ActionButtons from '../../Common/ActionButtons';
import axios from 'axios';

interface ReservationsListProps {
  onEdit: (reservation: Reservation) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const ReservationsList: React.FC<ReservationsListProps> = ({ onEdit, onAdd, onDelete }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [offres, setOffres] = useState<Offre[]>([]);
  const { isAdmin, user } = useAuth();

  // Récupérer les réservations
  const getReservations = async () => {
    try {
      const res = await axios.get("http://localhost:4005/reservation/");
      if (res.data) {
        console.log("Réservations:", res.data);
        setReservations(res.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
    }
  };

  // Récupérer les offres
  const getOffres = async () => {
    try {
      const res = await axios.get("http://localhost:4005/offre/");
      if (res.data) {
        console.log("Offres:", res.data);
        setOffres(res.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des offres:", error);
    }
  };

  // Trouver le titre de l'offre
  const getTitreOffre = (offreId: number) => {
    const offre = offres.find(o => o.id === offreId);
    return offre ? offre.titreOffre : `Offre #${offreId}`;
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4005/reservation/${id}`);
      setReservations(reservations.filter(r => r.id !== id));
      onDelete(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de la réservation:", error);
    }
  };
  

  useEffect(() => {
    getReservations();
    getOffres();
  }, []);

  // Filtrer les réservations selon le rôle
  const filteredReservations = isAdmin 
    ? reservations 
    : reservations.filter(r => r.utilisateurId === user?.id);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isAdmin ? 'Gestion des Réservations' : 'Mes Réservations'}
        </h1>
        <ActionButtons
          onAdd={onAdd}
          showEdit={false}
          showDelete={false}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Offre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               Utilisateur ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NombrePersonne
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de réservation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                prixParPersonne
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{reservation.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getTitreOffre(reservation.offreId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {reservation.utilisateurId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {reservation.nombrePers}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(reservation.dateReservation).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {Number(reservation.prixParPersonne)}€
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    reservation.statut
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reservation.statut ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Confirmé
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        En attente
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(reservation)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                    </button>
                    <button
                      onClick={() => handleDelete(reservation.id)}
                      className="text-red-600 hover:text-red-900 flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                    </button> 
                                       
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsList;