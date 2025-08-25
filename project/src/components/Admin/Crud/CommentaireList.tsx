import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, Star, User, MessageSquare, Heart, Share } from 'lucide-react';
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
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());

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
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const toggleLike = (id: number) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedComments(newLiked);
  };

  const toggleExpand = (id: number) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedComments(newExpanded);
  };

  const getCommentaire = async () => {
    const res = await axios.get("http://localhost:4005/commentaire/")
    if (res.data) {
      console.log(res.data)
      setCommentaire(res.data)
    } else {
      console.log("erreur hebergement")
    }
  }

  useEffect(() => {
    getCommentaire();
  }, []);

  // Fonction pour générer une couleur aléatoire basée sur l'ID utilisateur
  const getUserColor = (userId: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800'
    ];
    return colors[userId % colors.length];
  };

  // Fonction pour obtenir les initiales d'un utilisateur
  const getUserInitials = (userId: number) => {
    return `U${userId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isAdmin ? 'Gestion des Commentaires' : 'Mes Commentaires'}
              </h1>
              <p className="text-gray-600 mt-2">
                {filteredCommentaires.length} commentaire(s) {isAdmin ? 'au total' : 'posté(s)'}
              </p>
            </div>
            {!isAdmin && (
              <button
                onClick={onAdd}
                className="mt-4 md:mt-0 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md"
              >
                <Plus className="w-5 h-5" />
                Nouveau commentaire
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCommentaires.map((commentaire) => {
            const isExpanded = expandedComments.has(commentaire.id);
            const isLiked = likedComments.has(commentaire.id);
            const userColor = getUserColor(commentaire.utilisateurId);
            
            return (
              <div key={commentaire.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                {/* En-tête avec avatar et informations */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${userColor}`}>
                        {getUserInitials(commentaire.utilisateurId)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Utilisateur #{commentaire.utilisateurId}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(commentaire.dateCommentaire).toLocaleDateString('fr-FR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center">
                        {renderStars(commentaire.notes)}
                        <span className="ml-2 text-sm font-medium text-gray-700">
                          ({commentaire.notes}/5)
                        </span>
                      </div>
                      <span className="mt-1 inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">
                        Offre #{commentaire.offreId}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contenu du commentaire */}
                <div className="p-5">
                  <p className={`text-gray-700 ${isExpanded ? '' : 'line-clamp-3'}`}>
                    {commentaire.contenuCommentaire}
                  </p>
                  {commentaire.contenuCommentaire.length > 150 && (
                    <button 
                      onClick={() => toggleExpand(commentaire.id)}
                      className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-800"
                    >
                      {isExpanded ? 'Voir moins' : 'Lire la suite'}
                    </button>
                  )}
                </div>

                {/* Actions et métadonnées */}
                <div className="px-5 py-3 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => toggleLike(commentaire.id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-red-600' : ''}`} />
                        <span className="text-sm">{isLiked ? 'Aimé' : 'Aimer'}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                        <Share className="w-4 h-4" />
                        <span className="text-sm">Partager</span>
                      </button>
                    </div>

                    {!isAdmin && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEdit(commentaire)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(commentaire.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCommentaires.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun commentaire</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {isAdmin 
                ? "Aucun commentaire n'a été posté pour le moment." 
                : "Vous n'avez encore posté aucun commentaire. Partagez votre expérience !"
              }
            </p>
            {!isAdmin && (
              <button
                onClick={onAdd}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md"
              >
                <Plus className="w-5 h-5" />
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