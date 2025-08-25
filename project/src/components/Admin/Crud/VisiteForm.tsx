import React, { useEffect, useState } from 'react';
import { Visite } from '../../../types';
import DatePicker from '../../Common/DatePicker';
import axios from 'axios';

interface VisiteFormProps {
  visite?: Visite;
  offreId?: number; // Nouvelle prop pour l'ID de l'offre
  onSubmit: (visite: Visite) => void;
  onCancel: () => void;
}

interface Offre {
  id: number;
  titreOffre: string;
}

const VisiteForm: React.FC<VisiteFormProps> = ({ visite, offreId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Visite>>({
    ville: visite?.ville || '',
    dateVisite: visite?.dateVisite || '',
    ordreVisite: visite?.ordreVisite || 1,
    offreId: visite?.offreId || undefined // Utilisation de l'ID de l'offre
  });

  const [offres, setOffres] = useState<Offre[]>([]);
  const [loadingOffres, setLoadingOffres] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffres = async () => {
      setLoadingOffres(true);
      try {
        const response = await axios.get("http://localhost:4005/offre/");
        setOffres(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des visites:", error);
        setError("Impossible de charger les visites");
      } finally {
        setLoadingOffres(false);
      }
    };

    fetchOffres();
  }, []);

  const postVisite = async () =>{
  console.log(formData)
  const req = await axios.post("http://localhost:4005/visite/", formData)
  if (req.data)
  {
    console.log(req.data)
  }else{
    console.log("erreur de creation")
  }
}

const putVisite = async () =>{
  console.log(formData)
  const req = await axios.put(`http://localhost:4005/visite/${visite?.id}`, formData)
  if (req.data)
  {
    console.log("Visite mis à jour :",req.data)
  }else{
    console.log("Erreur de mise à jour :",error)
  }
}

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
 
   if (visite) {
     await putVisite(); // Modification
   } else {
     await postVisite(); // Création
   }
 
   // Mise à jour du parent
   onSubmit({
     id: visite?.id || Date.now(),
     ...formData,
   } as Visite);
 };

  const handleChange = (field: keyof Visite, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {visite ? 'Modifier la Visite' : 'Nouvelle Visite'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ caché pour l'ID de l'offre */}
          {offreId && (
            <input type="hidden" value={offreId} />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ville <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.ville}
              onChange={(e) => handleChange('ville', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Paris"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePicker
              label="Date de visite"
              value={formData.dateVisite || ''}
              onChange={(date) => handleChange('dateVisite', date)}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ordre de visite <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.ordreVisite}
                onChange={(e) => handleChange('ordreVisite', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="1"
              />
            </div>
                {/*affichage la liste de offre associée*/}
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                      Offre associée
               </label>
             {loadingOffres ? (
                <p className="text-gray-500">Chargement des offres...</p>
                  ) : (
             <select
                 value={formData.offreId ?? ''}
                 onChange={(e) => handleChange('offreId', e.target.value ? Number(e.target.value) : null)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
               >
              <option value="">Sélectionnez une offre</option>
                {offres.map((offre) => (
                 <option key={offre.id} value={offre.id}>
                    ID {offre.id} - {offre.titreOffre}
                   </option>
                  ))}
             </select>
                 )}
            </div>
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
              {visite ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisiteForm;