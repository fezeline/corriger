import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, MessageSquare, Car, Star, Calendar, Users, Clock } from 'lucide-react';
import { Offre, Visite, Commentaire, Voiture } from '../../../types';
import axios from 'axios';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [offre, setOffre] = useState<Offre | null>(null);
  const [visites, setVisites] = useState<Visite[]>([]);
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);
  const [voitures, setVoitures] = useState<Voiture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffreDetails = async () => {
      try {
        setLoading(true);
        
        // Récupérer les données séparément avec les bons endpoints
        const [offreRes, visitesRes, commentairesRes, voituresRes] = await Promise.all([
          axios.get(`http://localhost:4005/offre/${id}`),
          axios.get(`http://localhost:4005/visites`).catch(() => ({ data: [] })), // Endpoint à corriger
          axios.get(`http://localhost:4005/commentaires`).catch(() => ({ data: [] })), // Endpoint à corriger
          axios.get(`http://localhost:4005/voitures`).catch(() => ({ data: [] })) // Endpoint à corriger
        ]);

        const offreData: Offre = offreRes.data;
        
        // Filtrer les données côté frontend en attendant les bonnes routes
        const visitesData: Visite[] = Array.isArray(visitesRes.data) 
          ? visitesRes.data.filter((v: Visite) => v.offreId === parseInt(id!))
          : [];
        
        const commentairesData: Commentaire[] = Array.isArray(commentairesRes.data) 
          ? commentairesRes.data.filter((c: Commentaire) => c.offreId === parseInt(id!))
          : [];
        
        const voituresData: Voiture[] = Array.isArray(voituresRes.data) 
          ? voituresRes.data.filter((v: Voiture) => v.offreId === parseInt(id!))
          : [];

        setOffre(offreData);
        setVisites(visitesData);
        setCommentaires(commentairesData);
        setVoitures(voituresData);

      } catch (err) {
        console.error('Erreur lors du chargement des détails:', err);
        setError('Impossible de charger les détails de l\'offre');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOffreDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !offre) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Offre non trouvée'}</p>
          <button
            onClick={() => navigate('/offres')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retour aux offres
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bouton retour */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/offres')}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux offres
          </button>
        </div>

        {/* Image principale */}
        <div className="mb-8">
          <img
            src={offre.imagePrincipale}
            alt={offre.titreOffre}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Informations principales */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{offre.titreOffre}</h1>
          
          <p className="text-gray-700 text-lg mb-6">{offre.descriptionOffre}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-xl font-bold text-blue-600">{offre.prixParPers}€</div>
              <div className="text-sm text-gray-600">par personne</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-xl font-bold text-green-600">{offre.duree}</div>
              <div className="text-sm text-gray-600">jours</div>
            </div>

            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-sm font-bold text-yellow-600">
                {new Date(offre.dateDepart).toLocaleDateString('fr-FR')}
              </div>
              <div className="text-xs text-gray-600">Départ</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-sm font-bold text-purple-600">
                {new Date(offre.dateRetour).toLocaleDateString('fr-FR')}
              </div>
              <div className="text-xs text-gray-600">Retour</div>
            </div>
          </div>
        </div>

        {/* Section Visites */}
        {visites.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-blue-600" />
              Visites Incluses ({visites.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visites.map((visite) => (
                <div key={visite.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg text-blue-800 mb-2">{visite.nomLieu}</h3>
                  <p className="text-gray-700 text-sm mb-3">{visite.description}</p>
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    📅 Durée: {visite.duree} heures
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Voitures */}
        {voitures.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Car className="w-6 h-6 mr-3 text-green-600" />
              Véhicules Disponibles ({voitures.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {voitures.map((voiture) => (
                <div key={voiture.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg text-green-800 mb-2">
                    {voiture.marque} {voiture.modele}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold">{voiture.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacité:</span>
                      <span className="font-semibold">{voiture.capacite} personnes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Disponibilité:</span>
                      <span className={`font-semibold ${
                        voiture.disponible ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {voiture.disponible ? 'Disponible' : 'Non disponible'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Commentaires */}
        {commentaires.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="w-6 h-6 mr-3 text-yellow-600" />
              Avis des Voyageurs ({commentaires.length})
            </h2>
            
            <div className="space-y-6">
              {commentaires.map((commentaire) => (
                <div key={commentaire.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < commentaire.note 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-lg font-semibold">{commentaire.note}/5</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {commentaire.dateCommentaire ? new Date(commentaire.dateCommentaire).toLocaleDateString('fr-FR') : 'Date non spécifiée'}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 text-lg italic">"{commentaire.contenu}"</p>
                  
                  <div className="mt-4 text-sm text-gray-500">
                    - Par {commentaire.auteur || 'Anonyme'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message si aucune donnée supplémentaire */}
        {visites.length === 0 && commentaires.length === 0 && voitures.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-500">Aucune information supplémentaire disponible pour cette offre.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;