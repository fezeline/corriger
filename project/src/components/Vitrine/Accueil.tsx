import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, Calendar, ArrowRight, Phone, Mail, Car, Plane, Hotel } from 'lucide-react';

const Accueil: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    const timer1 = setTimeout(() => setShowWelcome(true), 500);
    const timer2 = setTimeout(() => setShowContent(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

    const destinations = [
    {
      id: 1,
      nom: "La gortte",
      image: "/images/accueil/sarodrano.jpg",
      description: "Découvrez la grotte de Sarondrano"
    },
    {
      id: 2,
      nom: "Parc Centre Valbio",
      image: "images/accueil/ranomafana.jpg",
      description: "Découvrez le parc National de centre valbio"
    },
    {
      id: 3,
      nom: "Parc zombitsy",
      image: "images/accueil/centre.jpg",
      description: "Découvrez le parc National de zombitsy"
    }
  ];


  const services = [
    {
      icon: MapPin,
      titre: "Circuits Organisés",
      description: "Des itinéraires soigneusement planifiés pour découvrir les plus beaux sites"
    },
    {
      icon: Users,
      titre: "Guides Experts",
      description: "Des guides locaux passionnés pour enrichir votre expérience"
    },
    {
      icon: Calendar,
      titre: "Réservation Facile",
      description: "Système de réservation en ligne simple et sécurisé"
    }
  ];


  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section avec animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-center bg-cover" 
  style={{ backgroundImage: "url('/images/accueil/menabe.jpg')" }}
>
  <div className="absolute inset-0 bg-black opacity-30"></div>
        
        {/* Animation d'arrière-plan */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full mix-blend-soft-light filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-green-400 rounded-full mix-blend-soft-light filter blur-xl animate-bounce delay-1000"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <div className={`transition-all duration-1000 transform ${showWelcome ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              BIENVENUE À TSIKIDIA TOURS
            </h1>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Venez nous rejoindre via notre plateforme en ligne concernant sur le voyage partout à Madagascar
            </p>
            
            <div className="bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-lg mb-8 animate-pulse">
              <p className="text-xl font-semibold text-black">
                 Inscrivez-vous et planifier votre voyage de rêve en toute liberté.
              </p>
            </div>
            
            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Link
                to="/destinations"
                className="inline-flex items-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Découvrir Madagascar
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-green-800 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
              >
                S'inscrire 
              </Link>
            </div>
            
            <div className="mt-12 animate-bounce">
              <p className="text-lg font-light italic">
                Entrez dans notre univers dès maintenant
              </p>
              <ArrowRight className="mx-auto mt-2 w-8 h-8 transform rotate-90" />
            </div>
          </div>
        </div>
      </section>

            {/* À propos Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
              À propos de nous
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
           Chez <span className="font-semibold text-blue-600">Tsikidia Tours</span>, 
           nous croyons que voyager est plus qu’un simple déplacement : 
           c’est une aventure humaine, culturelle et personnelle.  
           Notre mission est de vous offrir des expériences uniques, 
           authentiques et inoubliables, adaptées à vos envies et à votre rythme.
        </p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-gray-50 p-6 rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl">
       <h3 className="text-xl font-semibold text-gray-900 mb-3">Notre Vision</h3>
       <p className="text-gray-600">
             Inspirer et accompagner chaque voyageur à explorer le monde 
             tout en respectant la culture et l’environnement.
       </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Notre Mission</h3>
        <p className="text-gray-600">
           Créer des voyages personnalisés et sur mesure, accessibles à tous, 
           pour faire de chaque expérience une histoire à raconter.
        </p>
        </div>

     <div className="bg-gray-50 p-6 rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Nos Valeurs</h3>
        <p className="text-gray-600">
           Authenticité, respect, passion et engagement envers la satisfaction 
           de nos voyageurs.
        </p>
     </div>
     </div>
     </div>
   </section>


           {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expérience de voyage complète avec des services de qualité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.titre}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Destinations Populaires */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Destinations Populaires
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos destinations les plus prisées
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={destination.image}
                  alt={destination.nom}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {destination.nom}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {destination.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      to="/destinations"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Voir plus
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

          {/* Témoignages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Une expérience inoubliable ! L'organisation était parfaite et les guides très professionnels."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Marie Dupont</p>
                    <p className="text-sm text-gray-500">Cliente satisfaite</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Tsikidia Tours</h3>
               <h3 className="text-2xl font-bold mb-4">Voyage & Découverte</h3>
              <p className="text-gray-400">
                  Votre partenaire de confiance pour des voyages inoubliables depuis plus de 10 ans. 
                  Nous créons des expériences authentiques qui enrichissent votre vie.r
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <div className="flex items-center text-gray-400 mb-2">
                <Phone className="w-5 h-5 mr-2" />
                <span>+261 34 00 000 00</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-2" />
                <span>contact@tsikidiatours.mg</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 Tsikidia Tours. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Accueil;