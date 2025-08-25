import React, { useEffect, useState } from 'react';
import { Activite } from '../../../types';
import DatePicker from '../../Common/DatePicker';
import axios from 'axios';

interface ActiviteFormProps {
  activite?: Activite;
  onSubmit: (activite: Activite) => void;
  onCancel: () => void;
}
interface Visite {
  id: number;
  ville: string;
  // autres champs de visite si nécessaire
}

const ActiviteForm: React.FC<ActiviteFormProps> = ({ activite, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Activite>>({
    descriptionActivite: activite?.descriptionActivite || '',
    dateActivite: activite?.dateActivite || '',
    lieuActivite: activite?.lieuActivite || '',
    visiteId: activite?.visiteId || 0,
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
  
  const postActivite = async () =>{
  console.log(formData)
  const req = await axios.post("http://localhost:4005/activite/", formData)
  if (req.data)
  {
    console.log(req.data)
  }else{
    console.log("erreur de creation")
  }
}

const putActivite = async () =>{
  console.log(formData)
  const req = await axios.put(`http://localhost:4005/activite/${activite?.id}`, formData)
  if (req.data)
  {
    console.log("Activite mis à jour :",req.data)
  }else{
    console.log("Erreur de mise à jour :",error)
  }
}


 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
 
   if (activite) {
     await putActivite(); // Modification
   } else {
     await postActivite(); // Création
   }
 
   // Mise à jour du parent
   onSubmit({
     id: activite?.id || Date.now(),
     ...formData,
   } as Activite);
 };

  const handleChange = (field: keyof Activite, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {activite ? 'Modifier l\'Activité' : 'Nouvelle Activité'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description de l'activité <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.descriptionActivite}
              onChange={(e) => handleChange('descriptionActivite', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Visite guidée du Louvre"
            />
          </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             Date de l'activité <span className="text-red-500">*</span>
           </label>
          <input
            type="date"
            required
                value={formData.dateActivite}
             onChange={(e) => handleChange('dateActivite', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
           </div>
        </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lieu de l'activité <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.lieuActivite}
              onChange={(e) => handleChange('lieuActivite', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Musée du Louvre"
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
              {activite ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActiviteForm;