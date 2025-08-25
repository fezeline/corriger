import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, Star } from 'lucide-react';
import { Hebergement } from '../../../types';
import { mockHebergements } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import ActionButtons from '../../Common/ActionButtons';
import axios from 'axios';

interface HebergementsListProps {
  onEdit: (hebergement: Hebergement) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const HebergementsList: React.FC<HebergementsListProps> = ({ onEdit, onAdd, onDelete }) => {
  const [hebergements, setHebergement] = useState<Hebergement[]>(mockHebergements);
  const { isAdmin } = useAuth();

  // Fonction pour obtenir l'image de fond selon le nom de l'hébergement
  const getHebergementImage = (nom: string): string => {
    const imageMap: Record<string, string> = {
      'hotel': '/images/hebergements/hotel.jpg',
      'etoiles': '/images/hebergements/etoiles.jpg',
      'safir': '/images/hebergements/safir.jpg'
      
    };
    
    const nomLower = nom.toLowerCase();
    if (nomLower.includes('hotel')) return imageMap.hotel;
    if (nomLower.includes('etoiles')) return imageMap.etoiles;
    if (nomLower.includes('safir')) return imageMap.safir;

    return imageMap.default;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const calculerTotalFrais = (hebergement: Hebergement) => {
    const nuits = hebergement.nombreNuit ?? 0;
    return hebergement.fraisParNuit * nuits;
  };

  const getHebergement = async () => {
    const res = await axios.get("http://localhost:4005/hebergement/")
    if (res.data) {
      console.log(res.data)
      setHebergement(res.data)
    } else {
      console.log("erreur hebergement")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4005/hebergement/${id}`);
      setHebergement(hebergements.filter(h => h.id !== id));
      onDelete(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'hébergement:", error);
    }
  };

  useEffect(() => {
    getHebergement()
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Hébergements</h1>
        {isAdmin && (
          <ActionButtons
            onAdd={onAdd}
            showEdit={false}
            showDelete={false}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hebergements.map((hebergement) => (
          <div key={hebergement.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image de fond */}
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{ 
                backgroundImage: `url(${getHebergementImage(hebergement.nom)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Overlay pour meilleure lisibilité */}
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* Titre et étoiles sur l'image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold">
                  {hebergement.nom}
                </h3>
                <div className="flex items-center mt-1">
                  {renderStars(hebergement.etoile)}
                  <span className="ml-2 text-sm">({hebergement.etoile} étoiles)</span>
                </div>
              </div>
            </div>
            
            {/* Contenu sous l'image */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4">
                {hebergement.adresse}
              </p>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  {hebergement.fraisParNuit}€
                </span>
                <span className="text-sm text-gray-500">par nuit</span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-700">
                  {hebergement.nombreNuit ?? '—'} nuit(s)
                </span>
                <span className="text-lg font-semibold text-green-600">
                  {calculerTotalFrais(hebergement) > 0
                    ? `${calculerTotalFrais(hebergement)} €`
                    : '—'}
                </span>
              </div>
              
              {/* Affichage de la liste de visite associée */}
              {hebergement.visiteId && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-700">
                    Visite ID: {hebergement.visiteId}
                  </span>
                </div>
              )}

              {isAdmin && (
                <div className="flex space-x-2 pt-4 border-t">
                  <button
                    onClick={() => onEdit(hebergement)}
                    className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    
                  </button>
                  <button
                    onClick={() => handleDelete(hebergement.id)}
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

export default HebergementsList;