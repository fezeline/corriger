import React from 'react';
import { MapPin, Users, Calendar, Car, Home, Activity, Shield, Headphones } from 'lucide-react';

const Services: React.FC = () => {
  const servicesDetails = [
    {
      icon: MapPin,
      titre: "Circuits Organisés",
      description: "Des itinéraires soigneusement planifiés pour découvrir les plus beaux sites de chaque destination.",
      caracteristiques: [
        "Itinéraires personnalisés",
        "Guides locaux expérimentés",
        "Transport inclus",
        "Visites des sites incontournables"
      ]
    },
    {
      icon: Home,
      titre: "Hébergements de Qualité",
      description: "Une sélection d'hôtels et hébergements choisis pour leur confort et leur authenticité.",
      caracteristiques: [
        "Hôtels 3 à 5 étoiles",
        "Hébergements authentiques",
        "Petits déjeuners inclus",
        "Emplacements privilégiés"
      ]
    },
    {
      icon: Car,
      titre: "Transport Premium",
      description: "Véhicules confortables et modernes avec chauffeurs professionnels pour tous vos déplacements.",
      caracteristiques: [
        "Véhicules climatisés",
        "Chauffeurs expérimentés",
        "Assurance complète",
        "Flexibilité des horaires"
      ]
    },
    {
      icon: Activity,
      titre: "Activités Exclusives",
      description: "Des expériences uniques et des activités spécialement sélectionnées pour enrichir votre voyage.",
      caracteristiques: [
        "Activités culturelles",
        "Expériences gastronomiques",
        "Rencontres avec les locaux",
        "Accès privilégiés"
      ]
    },
    {
      icon: Users,
      titre: "Accompagnement Personnalisé",
      description: "Un service client dédié pour vous accompagner avant, pendant et après votre voyage.",
      caracteristiques: [
        "Conseiller dédié",
        "Assistance 24h/24",
        "Suivi personnalisé",
        "Conseils d'experts"
      ]
    },
    {
      icon: Shield,
      titre: "Garanties & Assurances",
      description: "Voyagez l'esprit tranquille avec nos garanties complètes et nos assurances voyage.",
      caracteristiques: [
        "Assurance annulation",
        "Garantie remboursement",
        "Assistance médicale",
        "Protection bagages"
      ]
    }
  ];

  const processus = [
    {
      etape: "1",
      titre: "Consultation",
      description: "Nous discutons de vos envies et définissons ensemble votre voyage idéal."
    },
    {
      etape: "2",
      titre: "Personnalisation",
      description: "Nous créons un itinéraire sur mesure adapté à vos préférences et votre budget."
    },
    {
      etape: "3",
      titre: "Réservation",
      description: "Validation de votre programme et réservation de tous les services inclus."
    },
    {
      etape: "4",
      titre: "Accompagnement",
      description: "Suivi et assistance tout au long de votre voyage pour une expérience parfaite."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Nos Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Une gamme complète de services pour faire de votre voyage une expérience inoubliable
          </p>
        </div>
      </section>

      {/* Services Détaillés */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que nous offrons
            </h2>
            <p className="text-xl text-gray-600">
              Des services complets pour répondre à tous vos besoins de voyage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesDetails.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.titre}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.caracteristiques.map((caracteristique, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {caracteristique}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notre Processus */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Processus
            </h2>
            <p className="text-xl text-gray-600">
              Comment nous créons votre voyage parfait en 4 étapes simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processus.map((etape, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {etape.etape}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {etape.titre}
                </h3>
                <p className="text-gray-600">
                  {etape.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Nous Choisir ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Sécurité Garantie
                    </h3>
                    <p className="text-gray-600">
                      Tous nos voyages sont assurés et nous respectons les plus hauts standards de sécurité.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Headphones className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Support 24/7
                    </h3>
                    <p className="text-gray-600">
                      Notre équipe est disponible 24h/24 et 7j/7 pour vous assister pendant votre voyage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Expertise Locale
                    </h3>
                    <p className="text-gray-600">
                      Nos guides locaux vous font découvrir les secrets et trésors cachés de chaque destination.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="images/service/service.jpg"
                alt="service"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;