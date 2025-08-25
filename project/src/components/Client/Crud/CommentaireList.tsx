import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, Star, User } from 'lucide-react';
import { Commentaire } from '../../../types';
import { mockCommentaires, mockOffres } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import ActionButtons from '../../Common/ActionButtons';
import axios from 'axios';

interface CommentairesListProps {
  onEdit: (commentaire: Commentaire) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const CommentairesList: React.FC<CommentairesListProps> = ({ onEdit, onAdd, onDelete }) => {
  const [commentaires, setCommentaire] = useState<Commentaire[]>(mockCommentaires);
  const { isAdmin, user } = useAuth();

  // Filter comments based on user role
  const filteredCommentaires = isAdmin 
    ? commentaires 
    : commentaires.filter(c => c.utilisateurId === user?.id);

  const getOffreTitre = (offreId: number) => {
    const offre = mockOffres.find(o => o.id === offreId);
    return offre?.titreOffre || 'Offre inconnue';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

const getCommentaire = async () =>{
  const res = await axios.get("http://localhost:4005/commentaire/")
  if (res.data)
  {
    console.log(res.data)
    setCommentaire(res.data)
  }else{
    console.log("erreur commentaire")
  }

}

const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4005/commentaire/${id}`);
      // Mettre à jour l'état local après la suppression
      setCommentaire(commentaires.filter(h => h.id !== id));
      // Appeler la prop onDelete si nécessaire
      onDelete(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de commentaire:", error);
    }
  };

useEffect(()  =>{
  getCommentaire();
}, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isAdmin ? 'Gestion des Commentaires' : 'Mes Commentaires'}
        </h1>
        {!isAdmin && (
          <ActionButtons
            onAdd={onAdd}
            showEdit={false}
            showDelete={false}
          />
        )}
      </div>

      <div className="space-y-6">
        {filteredCommentaires.map((commentaire) => (
          <div key={commentaire.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <User className="w-8 h-8 text-gray-400" />
                <div>
                    {/*affichage la liste d'offre associée*/}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {commentaire.offreId}
                    </span>
                 </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {commentaire.utilisateurId}
                    </span>
                 </div>
                  <p className="text-sm text-gray-500">
                    {new Date(commentaire.dateCommentaire).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {renderStars(commentaire.notes)}
                <span className="ml-2 text-sm text-gray-600">
                  ({commentaire.notes}/5)
                </span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              {commentaire.contenuCommentaire}
            </p>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-sm text-gray-500">
                Commentaire #{commentaire.id}
              </span>
              
              {!isAdmin && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(commentaire)}
                    className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(commentaire.id)}
                    className="flex items-center px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredCommentaires.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun commentaire trouvé</p>
            {!isAdmin && (
              <button
                onClick={onAdd}
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter mon premier commentaire
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentairesList;