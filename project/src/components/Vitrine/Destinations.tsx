import React, { useState } from 'react';
import { MapPin, Calendar, Users, Star, Filter } from 'lucide-react';

const Destinations: React.FC = () => {
  const [filtreActif, setFiltreActif] = useState('tous');

  const destinations = [
    {
      id: 1,
      nom: "Parc Ranomafana",
      pays: "Madagascar",
      categorie: "ranomafana",
      image: "images/destinations/acc.jpg",
      duree: 3,
      placedisponible:5,
      note: 3,
      description: "Découvrez la ville lumière avec ses monuments emblématiques et sa culture unique.",
      highlights: ["Tour Eiffel", "Louvre", "Champs-Élysées", "Montmartre"],
      disponibilite: "Toute l'année"
    },
    {
      id: 2,
      nom: "Parc isalo",
      pays: "Madagascar",
      categorie: "isalo",
      image: "images/destinations/fasy.jpg",
      duree: 5,
      placedisponible:8,
      note: 4,
      description: "Profitez du soleil méditerranéen et des plages de rêve de la Riviera française.",
      highlights: ["Nice", "Cannes", "Monaco", "Saint-Tropez"],
      disponibilite: "Avril - Octobre"
    },
    {
      id: 3,
      nom: "Parc zombitsy",
      pays: "Madagascar",
      categorie: "zombitsy",
      image: "images/destinations/haik.jpg",
      duree: 4,
      placedisponible:10,
      note: 5,
      description: "Explorez les champs de lavande et les villages pittoresques de Provence.",
      highlights: ["Avignon", "Aix-en-Provence", "Gordes", "Roussillon"],
      disponibilite: "Mai - Septembre"
    },
    {
      id: 4,
      nom: "La grotte de Sarodrano",
      pays: "Madagascar",
      categorie: "la grotte de sarodrano",
      image: "images/destinations/fia.jpg",
      duree: 4,
      placedisponible:15,
      note: 5,
      description: "Plongez dans l'histoire antique de la ville éternelle.",
      highlights: ["Colisée", "Vatican", "Fontaine de Trevi", "Panthéon"],
      disponibilite: "Toute l'année"
    },
    {
      id: 5,
      nom: "Centre Valbio",
      pays: "Madagascar",
      categorie: "ranomafana",
      image: "images/destinations/centre.jpg",
      duree: 3,
      placedisponible:20,
      note: 4,
      description: "Découvrez l'architecture unique de Gaudí et la culture catalane.",
      highlights: ["Sagrada Familia", "Park Güell", "Las Ramblas", "Barrio Gótico"],
      disponibilite: "Toute l'année"
    },
    {
      id: 6,
      nom: "Village de Tortue",
      pays: "Madagascar",
      categorie: "mangily",
      image: "images/destinations/fasy.jpg",
      duree: 5,
      placedisponible:25,
      note: 4.5,
      description: "Immergez-vous dans la magie des souks et de l'architecture marocaine.",
      highlights: ["Médina", "Jardin Majorelle", "Palais Bahia", "Désert"],
      disponibilite: "Octobre - Avril"
    }
  ];

  const categories = [
    { id: 'tous', label: 'Toutes les destinations' },
    { id: 'ranomafana', label: 'Ranomafana' },
    { id: 'isalo', label: 'Isalo' },
    { id: 'zombitsy', label: 'Zombitsy' },
    { id: 'la grotte de sarodrano', label: 'La grotte de sarodrano' },
    { id: 'mangily', label: 'Village de Tortue' }
  ];

  const destinationsFiltrees = filtreActif === 'tous' 
    ? destinations 
    : destinations.filter(dest => dest.categorie === filtreActif);

  const renderStars = (note: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(note) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Nos Destinations
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Explorez le monde avec nos circuits soigneusement sélectionnés
          </p>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Filtrer par région :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((categorie) => (
                <button
                  key={categorie.id}
                  onClick={() => setFiltreActif(categorie.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filtreActif === categorie.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {categorie.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grille des Destinations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinationsFiltrees.map((destination) => (
              <div key={destination.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={destination.image}
                    alt={destination.nom}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-800">
                    {destination.duree} jours
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {destination.nom}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {renderStars(destination.note)}
                      <span className="text-sm text-gray-600 ml-1">
                        ({destination.note})
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{destination.pays}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {destination.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Points forts :</h4>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {highlight}
                        </span>
                      ))}
                      {destination.highlights.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{destination.highlights.length - 3} autres
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {destination.disponibilite}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        {destination.placedisponible}places
                      </span>
                      
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;