import React from 'react';
import { Users, Award, Globe, Heart } from 'lucide-react';

const APropos: React.FC = () => {
  const stats = [
    { number: "10+", label: "Années d'expérience" },
    { number: "50+", label: "Clients satisfaits" },
    { number: "20+", label: "Destinations" },
    { number: "100+", label: "Circuits organisés" }
  ];

  const valeurs = [
    {
      icon: Heart,
      titre: "Passion",
      description: "Nous sommes passionnés par le voyage et nous transmettons cette passion à nos clients."
    },
    {
      icon: Award,
      titre: "Excellence",
      description: "Nous nous efforçons d'offrir des services de la plus haute qualité à chaque étape du voyage."
    },
    {
      icon: Users,
      titre: "Proximité",
      description: "Nous créons des relations durables avec nos clients basées sur la confiance et l'écoute."
    },
    {
      icon: Globe,
      titre: "Découverte",
      description: "Nous encourageons la découverte de nouvelles cultures et la création de souvenirs inoubliables."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */} 
    <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            À Propos de Nous
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
             Découvrez l'histoire et les valeurs qui nous animent depuis plus de 10 ans
          </p>
        </div>
      </section>


      {/* Notre Histoire */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Notre Histoire
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Fondée en 2014, notre agence de voyage est née de la passion de ses créateurs pour la découverte 
                et l'aventure. Nous avons commencé comme une petite équipe de guides locaux avec un rêve : 
                partager les merveilles de notre région avec le monde entier.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Au fil des années, nous avons élargi nos horizons et développé un réseau de partenaires de confiance 
                dans de nombreuses destinations. Aujourd'hui, nous sommes fiers d'être reconnus comme l'une des 
                agences de voyage les plus fiables et innovantes du secteur.
              </p>
              <p className="text-lg text-gray-600">
                Notre mission reste inchangée : créer des expériences de voyage authentiques et mémorables 
                qui enrichissent la vie de nos clients et contribuent au développement durable des communautés locales.
              </p>
            </div>
            <div className="relative">
              <img
                src="images/apropos/menabe.jpg"
                alt="menabe"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Chiffres Clés
            </h2>
            <p className="text-xl text-gray-600">
              Des résultats qui témoignent de notre engagement
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600">
              Les principes qui guident chacune de nos actions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valeurs.map((valeur, index) => {
              const Icon = valeur.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {valeur.titre}
                  </h3>
                  <p className="text-gray-600">
                    {valeur.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600">
              Des professionnels passionnés à votre service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
            { 
              nom: "Pierre Dubois", 
              poste: "Directeur Général", 
              experience: "15 ans d'expérience",
              image: "/images/equipes/directeur.jpg"
            },
            { 
              nom: "Jean Rigobert", 
              poste: "Responsable Circuits", 
              experience: "12 ans d'expérience",
             image: "/images/equipes/respo.jpg"
            },
            { 
              nom: "Marie Leroy", 
              poste: "Conseillère Voyage", 
              experience: "8 ans d'expérience",
              image: "/images/equipes/guide.jpg"
            }
        ].map((membre, index) => (
         <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
      
         {/* Image de l'équipe */}
           <div className="w-full h-64">
            <img 
             src={membre.image} 
             alt={membre.nom} 
            className="w-full h-full object-cover"
           />
           </div>

          {/* Informations du membre */}
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{membre.nom}</h3>
            <p className="text-blue-600 font-medium mb-2">{membre.poste}</p>
            <p className="text-gray-600 text-sm">{membre.experience}</p>
          </div>
         </div>
          ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default APropos;