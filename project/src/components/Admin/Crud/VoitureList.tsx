import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Users, Car } from 'lucide-react';
import { Voiture } from '../../../types';
import { useAuth } from '../../../hooks/useAuth';
import ActionButtons from '../../Common/ActionButtons';
import axios from 'axios';

interface VoituresListProps {
  onEdit: (voiture: Voiture) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const VoituresList: React.FC<VoituresListProps> = ({ onEdit, onAdd, onDelete }) => {
  const [voitures, setVoiture] = useState<Voiture[]>([]);
  const { isAdmin } = useAuth();

  const calculerCoutTotal = (voiture: Voiture) => {
    const jours = voiture.nombreJours ?? 0;
    return voiture.coutParJours * jours;
  };

  // Fonction pour obtenir l'image de fond selon la marque ou le modèle
  const getVoitureImage = (marque: string, modele: string): string => {
    const imageMap: Record<string, string> = {
      'mutsibus': '/images/voitures/mutsibus.jpg',
      'paaz': '/images/voitures/paaz.jpg',
      'karenjy': '/images/voitures/karenjy.jpg'
    };
    
    return imageMap[marque.toLowerCase()] || imageMap.default;
  };

  const getVoiture = async () => {
    try {
      const res = await axios.get("http://localhost:4005/voiture/");
      console.log("Réponse brute :", res.data);
      if (Array.isArray(res.data)) {
        setVoiture(res.data);
      } else if (Array.isArray(res.data.voitures)) {
        setVoiture(res.data.voitures);
      } else {
        console.error("Format inattendu :", res.data);
      }
    } catch (error) {
      console.error("Erreur API :", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4005/voiture/${id}`);
      setVoiture(voitures.filter(h => h.id !== id));
      onDelete(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de la voiture:", error);
    }
  };

  useEffect(() => {
    console.log("Chargement des voitures depuis l'API...");
    getVoiture();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Voitures</h1>
        {isAdmin && (
          <ActionButtons
            onAdd={onAdd}
            showEdit={false}
            showDelete={false}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {voitures.map((voiture) => (
          <div 
            key={voiture.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Image de fond */}
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{ 
                backgroundImage: `url(${getVoitureImage(voiture.marque, voiture.modele)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Overlay pour meilleure lisibilité */}
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* Titre sur l'image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold">
                  {voiture.marque} {voiture.modele}
                </h3>
                <p className="text-sm opacity-90">{voiture.immatriculation}</p>
              </div>
            </div>
            
            {/* Contenu sous l'image */}
            <div className="p-6">
              <div className="flex items-center mb-3 text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {voiture.capacite} personnes
                </span>
              </div>

              <div className="mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Coût/jour: {voiture.coutParJours} €
                </span>
              </div>

              {voiture.nombreJours && voiture.nombreJours > 0 && (
                <div className="mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Jours: {voiture.nombreJours}
                  </span>
                </div>
              )}

              {voiture.offreId && (
                <div className="mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Offre ID: {voiture.offreId}
                  </span>
                </div>
              )}

              {calculerCoutTotal(voiture) > 0 && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Total: {calculerCoutTotal(voiture)} €
                  </span>
                </div>
              )}
              
              {isAdmin && (
                <div className="flex space-x-2 pt-4 border-t">
                  <button
                    onClick={() => onEdit(voiture)}
                    className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                   
                  </button>
                  <button
                    onClick={() => handleDelete(voiture.id)}
                    className="flex items-center px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                 
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoituresList;