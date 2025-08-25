import React, { useEffect, useState } from 'react';
import { Hebergement } from '../../../types';
import axios from 'axios';

interface HebergementFormProps {
  hebergement?: Hebergement;
  onSubmit: (hebergement: Hebergement) => void;
  onCancel: () => void;
}

interface Visite {
  id: number;
  ville: string;
}

const HebergementForm: React.FC<HebergementFormProps> = ({ hebergement, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Hebergement>>({
    nom: hebergement?.nom || '',
    adresse: hebergement?.adresse || '',
    etoile: hebergement?.etoile || 1,
    fraisParNuit: hebergement?.fraisParNuit || 0,
    nombreNuit: hebergement?.nombreNuit || 1,
    visiteId: hebergement?.visiteId || undefined, // Ajouté ici
  });

const [visites, setVisites] = useState<Visite[]>([]);
  const [loadingVisites, setLoadingVisites] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisites = async () => {
      setLoadingVisites(true);
      try {
        const response = await axios.get("http://localhost:4005/visite/");
        setVisites(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des visites:", error);
        setError("Impossible de charger les visites");
      } finally {
        setLoadingVisites(false);
      }
    };

    fetchVisites();
  }, []);
  
const postHebergement = async () =>{
  console.log(formData)
  const req = await axios.post("http://localhost:4005/hebergement/", formData)
  if (req.data)
  {
    console.log(req.data)
  }else{
    console.log("erreur de creation")
  }
}

const putHebergement = async () =>{
  console.log(formData)
  const req = await axios.put(`http://localhost:4005/hebergement/${hebergement?.id}`, formData)
  if (req.data)
  {
    console.log("Hébergement mis à jour :",req.data)
  }else{
    console.log("Erreur de mise à jour :",error)
  }
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (hebergement) {
    await putHebergement(); // Modification
  } else {
    await postHebergement(); // Création
  }

  // Mise à jour du parent
  onSubmit({
    id: hebergement?.id || Date.now(),
    ...formData,
  } as Hebergement);
};

  const handleChange = (field: keyof Hebergement, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const calculerTotalFrais = () => {
    const nuits = formData.nombreNuit ?? 0;
    return (formData.fraisParNuit ?? 0) * nuits;
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {hebergement ? 'Modifier l\'Hébergement' : 'Nouvel Hébergement'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de l'hébergement <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.nom}
              onChange={(e) => handleChange('nom', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Hôtel de Luxe Paris"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.adresse}
              onChange={(e) => handleChange('adresse', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Adresse complète de l'hébergement"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre d'étoiles <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.etoile}
                onChange={(e) => handleChange('etoile', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={1}>1 étoile</option>
                <option value={2}>2 étoiles</option>
                <option value={3}>3 étoiles</option>
                <option value={4}>4 étoiles</option>
                <option value={5}>5 étoiles</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frais par nuit (€) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.fraisParNuit}
                onChange={(e) => handleChange('fraisParNuit', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="250"
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de nuits <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.nombreNuit}
                onChange={(e) => handleChange('nombreNuit', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

                {/*affichage la liste de visite associée*/}
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visite associée
               </label>
             {loadingVisites ? (
                <p className="text-gray-500">Chargement des visites...</p>
                  ) : (
             <select
                 value={formData.visiteId ?? ''}
                 onChange={(e) => handleChange('visiteId', e.target.value ? Number(e.target.value) : null)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
               >
              <option value="">Sélectionnez une visite</option>
                {visites.map((visite) => (
                 <option key={visite.id} value={visite.id}>
                    ID {visite.id} - {visite.ville}
                   </option>
                  ))}
             </select>
                 )}
            </div>
          </div>
         <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-gray-700 font-medium">
              Total : <span className="text-green-600 font-bold">{calculerTotalFrais()} €</span>
            </p>
          </div>
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {hebergement ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HebergementForm;