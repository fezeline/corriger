import React, { useEffect, useState } from 'react';
import { Commentaire } from '../../../types';
import { mockOffres } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import DatePicker from '../../Common/DatePicker';
import { Star } from 'lucide-react';
import axios from 'axios';

interface CommentaireFormProps {
  commentaire?: Commentaire;
  onSubmit: (commentaire: Commentaire) => void;
  onCancel: () => void;
}

interface Offre {
  id: number;
  titreOffre: string;
}

const CommentaireForm: React.FC<CommentaireFormProps> = ({ commentaire, onSubmit, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<Commentaire>>({
    dateCommentaire: commentaire?.dateCommentaire || new Date().toISOString().split('T')[0],
    contenuCommentaire: commentaire?.contenuCommentaire || '',
    notes: commentaire?.notes || 5,
    utilisateurId: commentaire?.utilisateurId || user?.id || 0,
    offreId: commentaire?.offreId || 0,
  });

  const [Offres, setOffres] = useState<Offre[]>([]);
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


  const postCommentaire = async () => {
    console.log(formData);
    const req = await axios.post("http://localhost:4005/commentaire/", formData);
    if (req.data) {
      console.log(req.data);
    } else {
      console.log("erreur de creation");
    }
  }; // <-- Cette accolade fermante manquait

  const putCommentaire = async () =>{
    console.log(formData)
    const req = await axios.put(`http://localhost:4005/commentaire/${commentaire?.id}`, formData)
    if (req.data)
    {
      console.log("Message mis à jour :",req.data)
    }else{
      console.log("Erreur de mise à jour :",error)
    }
  }

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
 
   if (commentaire) {
     await putCommentaire(); // Modification
   } else {
     await postCommentaire(); // Création
   }
 
   // Mise à jour du parent
   onSubmit({
     id: commentaire?.id || Date.now(),
     ...formData,
   } as Commentaire);
 };

  const handleChange = (field: keyof Commentaire, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleChange('notes', i + 1)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                i < (formData.notes || 0) 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300 hover:text-yellow-400'
              } transition-colors`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          ({formData.notes}/5)
        </span>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {commentaire ? 'Modifier le Commentaire' : 'Nouveau Commentaire'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Offre <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.offreId}
              onChange={(e) => handleChange('offreId', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sélectionnez une offre</option>
              {Offres.map((offre) => (
                <option key={offre.id} value={offre.id}>
                  {offre.titreOffre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note <span className="text-red-500">*</span>
            </label>
            {renderStarRating()}
          </div>

          <DatePicker
            label="Date du commentaire"
            value={formData.dateCommentaire || ''}
            onChange={(date) => handleChange('dateCommentaire', date)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commentaire <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={formData.contenuCommentaire}
              onChange={(e) => handleChange('contenuCommentaire', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Partagez votre expérience..."
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
              {commentaire ? 'Mettre à jour' : 'Publier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentaireForm;