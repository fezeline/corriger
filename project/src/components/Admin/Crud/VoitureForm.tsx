import React, { useEffect, useState } from 'react';
import { Voiture } from '../../../types';
import axios from 'axios';

interface VoitureFormProps {
  voiture?: Voiture;
  onSubmit: (voiture: Voiture) => void;
  onCancel: () => void;
}
interface Offre {
  id: number;
  titreOffre: string;
}

const VoitureForm: React.FC<VoitureFormProps> = ({ voiture, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Voiture>>({
    immatriculation: voiture?.immatriculation || '',
    marque: voiture?.marque || '',
    modele: voiture?.modele || '',
    capacite: voiture?.capacite || 1,
    coutParJours: voiture?.coutParJours || 0,
    nombreJours: voiture?.nombreJours || 1,
    offreId: voiture?.offreId || undefined
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

const postVoiture = async () =>{
  console.log(formData)
  const req = await axios.post("http://localhost:4005/voiture/", formData)
  if (req.data)
  {
    console.log(req.data)
  }else{
    console.log("erreur de creation")
  }
}

const putVoiture = async () =>{
  console.log(formData)
  const req = await axios.put(`http://localhost:4005/voiture/${voiture?.id}`, formData)
  if (req.data)
  {
    console.log("Voiture mis à jour :",req.data)
  }else{
    console.log("Erreur de mise à jour :",error)
  }
}

 const calculerCoutTotal = () => {
    const { coutParJours = 0, nombreJours = 0 } = formData;
    return coutParJours * nombreJours;
  };
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (voiture) {
    await putVoiture(); // Modification
  } else {
    await postVoiture(); // Création
  }

  // Mise à jour du parent
  onSubmit({
    id: voiture?.id || Date.now(),
    ...formData,
  } as Voiture);
};


  const handleChange = (field: keyof Voiture, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {voiture ? 'Modifier la Voiture' : 'Nouvelle Voiture'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Immatriculation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.immatriculation}
              onChange={(e) => handleChange('immatriculation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: AB-123-CD"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marque <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.marque}
                onChange={(e) => handleChange('marque', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Mercedes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Modèle <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.modele}
                onChange={(e) => handleChange('modele', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Classe V"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacité (personnes) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                max="50"
                value={formData.capacite}
                onChange={(e) => handleChange('capacite', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coût par jour (€) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.coutParJours}
                onChange={(e) => handleChange('coutParJours', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="120"
              />
            </div>
                        {/* ✅ Champ Nombre de jours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de jours <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.nombreJours}
                onChange={(e) => handleChange('nombreJours', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="5"
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
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coût total
              </label>
            <p className="text-lg font-semibold text-green-600">
               {calculerCoutTotal()} €
           </p>
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
              {voiture ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoitureForm;