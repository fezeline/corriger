import React, { useState } from 'react';
import { Offre } from '../../../types';
import DatePicker from '../../Common/DatePicker';
import axios from 'axios';

interface OffreFormProps {
  offre?: Offre;
  onSubmit: (offre: Offre) => void;
  onCancel: () => void;
  
}

const OffreForm: React.FC<OffreFormProps> = ({ offre, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Offre>>({
    titreOffre: offre?.titreOffre || '',
    prixParPers: offre?.prixParPers || 0,
    dateDepart: offre?.dateDepart || '',
    dateRetour: offre?.dateRetour || '',
    descriptionOffre: offre?.descriptionOffre || '',
    duree: offre?.duree || 0,
    placeDisponible: offre?.placeDisponible || 0,
    imagePrincipale: offre?.imagePrincipale || '',
  });

const postOffre = async () =>{
  console.log(formData)
  const req = await axios.post("http://localhost:4005/offre/", formData)
  if (req.data)
  {
    console.log(req.data)
  }else{
    console.log("erreur de creation")
  }
};

const putOffre = async () =>{
  console.log(formData)
  const req = await axios.put(`http://localhost:4005/offre/${offre?.id}`, formData)
  if (req.data)
  {
    console.log("Hébergement mis à jour :",req.data)
  }else{
    console.log("Erreur de mise à jour :")
  }
}

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
 
   if (offre) {
     await putOffre(); // Modification
   } else {
     await postOffre(); // Création
   }
 
   // Mise à jour du parent
   onSubmit({
     id: offre?.id || Date.now(),
     ...formData,
   } as Offre);
 };

  const handleChange = (field: keyof Offre, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {offre ? 'Modifier l\'Offre' : 'Nouvelle Offre'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre de l'offre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.titreOffre}
                onChange={(e) => handleChange('titreOffre', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Circuit découverte Paris"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix par personne (€) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.prixParPers}
                onChange={(e) => handleChange('prixParPers', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="299"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePicker
              label="Date de départ"
              value={formData.dateDepart || ''}
              onChange={(date) => handleChange('dateDepart', date)}
              required
            />

            <DatePicker
              label="Date de retour"
              value={formData.dateRetour || ''}
              onChange={(date) => handleChange('dateRetour', date)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durée (jours) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.duree}
                onChange={(e) => handleChange('duree', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Places disponibles <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.placeDisponible}
                onChange={(e) => handleChange('placeDisponible', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="15"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description de l'offre <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.descriptionOffre}
              onChange={(e) => handleChange('descriptionOffre', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Décrivez votre offre en détail..."
            />
          </div>

          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Image principale <span className="text-red-500">*</span>
  </label>
  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // reader.result est un DataURL du style: "data:image/png;base64,xxxx"
          const base64String = (reader.result as string).split(",")[1]; 
          handleChange("imagePrincipale", base64String); // envoie seulement le base64 pur
        };
        reader.readAsDataURL(file);
      }
    }}
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  />
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
              {offre ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OffreForm;