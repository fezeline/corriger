import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const liens = {
    destinations: [
      { nom: 'Paris', url: '/destinations' },
      { nom: 'Côte d\'Azur', url: '/destinations' },
      { nom: 'Provence', url: '/destinations' },
      { nom: 'Rome', url: '/destinations' },
      { nom: 'Barcelone', url: '/destinations' }
    ],
    services: [
      { nom: 'Circuits organisés', url: '/services' },
      { nom: 'Hébergements', url: '/services' },
      { nom: 'Transport', url: '/services' },
      { nom: 'Activités', url: '/services' },
      { nom: 'Assurances', url: '/services' }
    ],
    entreprise: [
      { nom: 'À propos', url: '/a-propos' },
      { nom: 'Notre équipe', url: '/a-propos' },
      { nom: 'Nos valeurs', url: '/a-propos' },
      { nom: 'Carrières', url: '/contact' },
      { nom: 'Presse', url: '/contact' }
    ],
    support: [
      { nom: 'Centre d\'aide', url: '/contact' },
      { nom: 'Conditions générales', url: '/legal' },
      { nom: 'Politique de confidentialité', url: '/legal' },
      { nom: 'Cookies', url: '/legal' },
      { nom: 'Contact', url: '/contact' }
    ]
  };

  const reseauxSociaux = [
    { nom: 'Facebook', icon: Facebook, url: '#' },
    { nom: 'Twitter', icon: Twitter, url: '#' },
    { nom: 'Instagram', icon: Instagram, url: '#' },
    { nom: 'YouTube', icon: Youtube, url: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Informations de l'entreprise */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Voyage & Découverte</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre partenaire de confiance pour des voyages inoubliables depuis plus de 10 ans. 
              Nous créons des expériences authentiques qui enrichissent votre vie.
            </p>
            
            {/* Coordonnées */}
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">123 Avenue des Voyages, 75001 Paris</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">contact@voyage-decouverte.fr</span>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2">
              {liens.destinations.map((lien, index) => (
                <li key={index}>
                  <Link 
                    to={lien.url} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {lien.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {liens.services.map((lien, index) => (
                <li key={index}>
                  <Link 
                    to={lien.url} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {lien.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {liens.support.map((lien, index) => (
                <li key={index}>
                  <Link 
                    to={lien.url} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {lien.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Section du bas */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Voyage & Découverte. Tous droits réservés.
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              {reseauxSociaux.map((reseau, index) => {
                const Icon = reseau.icon;
                return (
                  <a
                    key={index}
                    href={reseau.url}
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                    aria-label={reseau.nom}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;