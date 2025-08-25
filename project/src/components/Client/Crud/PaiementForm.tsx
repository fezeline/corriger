import React, { useEffect, useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Paiement } from '../../../types';
import { mockReservations } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import DatePicker from '../../Common/DatePicker';
import axios from 'axios';

interface PaiementFormProps {
  paiement?: Paiement;
  onSubmit: (paiement: Paiement) => void;
  onCancel: () => void;
}

const PaiementForm: React.FC<PaiementFormProps> = ({ paiement, onSubmit, onCancel }) => {
  const { user, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Paiement>>({
    montant: paiement?.montant || 0,
    date: paiement?.date || new Date().toISOString().split('T')[0],
    modePayement: paiement?.modePayement || 'carte',
    status: paiement?.status || 'pending',
    reservationId: paiement?.reservationId || 0,
    utilisateurId: paiement?.utilisateurId ||0,
  });

  const availableReservations = isAdmin 
    ? mockReservations 
    : mockReservations.filter(r => r.utilisateurId === user?.id);

  const handleChange = (field: keyof Paiement, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'reservationId') {
        const selectedReservation = availableReservations.find(r => r.id === value);
        if (selectedReservation) {
          updated.montant = selectedReservation.montantTotal;
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation de traitement
    await new Promise(res => setTimeout(res, 1500));

    onSubmit({
      id: paiement?.id || Date.now(),
      ...formData,
    } as Paiement);

    setIsLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {paiement ? 'Modifier le Paiement' : 'Nouveau Paiement'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sélection réservation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Réservation <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={formData.reservationId}
            onChange={(e) => handleChange('reservationId', Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Sélectionnez une réservation</option>
            {availableReservations.map((reservation) => (
              <option key={reservation.id} value={reservation.id}>
                Réservation #{reservation.id} - {reservation.prixParPersonne}€
              </option>
            ))}
          </select>
        </div>

        {/* Montant & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePicker
            label="Date de paiement"
            value={formData.date || ''}
            onChange={(date) => handleChange('date', date)}
            required
          />
        </div>

        {/* Méthode de paiement */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mode de paiement
          </label>
          <div className="space-y-2">
            {[
              { id: 'carte', label: 'Carte de crédit' },
            ].map(method => (
              <label key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="methodePayment"
                  value={method.id}
                  checked={formData.modePayement === method.id}
                  onChange={(e) => handleChange('modePayement', e.target.value)}
                />
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span>{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Champs carte bancaire si carte sélectionnée */}
        {formData.modePayement === 'carte' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Numéro de carte</label>
              <input type="text" placeholder="1234 5678 9012 3456" className="mt-1 w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <input type="text" placeholder="123" className="mt-1 w-full px-3 py-2 border rounded-md" />
              </div>
            </div>
          </div>
        )}

        {/* Statut paiement */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut du paiement
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value as 'pending' | 'completed' | 'failed')}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="pending">En attente</option>
            <option value="completed">Complété</option>
            <option value="failed">Échoué</option>
          </select>
        </div>
        {/* Montant récap */}
        <div className="bg-blue-50 p-4 rounded-lg flex justify-between font-bold text-blue-800">
          <span>Montant</span>
          <span>{formData.montant}€</span>
        </div>

        {/* Boutons */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Traitement...' : paiement ? 'Mettre à jour' : 'Payer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaiementForm;
