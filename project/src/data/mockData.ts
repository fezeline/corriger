import { Offre, Hebergement, Voiture, Activite, Visite, Commentaire, Reservation, Paiement, Message } from '../types';

export const mockOffres: Offre[] = [
  {
    id: 1,
    titreOffre: "Circuit découverte Paris",
    prixParPers: 299,
    dateDepart: "2024-03-15",
    dateRetour: "2024-03-18",
    descriptionOffre: "Découvrez les merveilles de Paris en 3 jours",
    duree: 3,
    placeDisponible: 15,
    imagePrincipale: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg"
  },
  {
    id: 2,
    titreOffre: "Séjour côte d'Azur",
    prixParPers: 450,
    dateDepart: "2024-04-20",
    dateRetour: "2024-04-25",
    descriptionOffre: "Profitez du soleil et des plages de la Riviera",
    duree: 5,
    placeDisponible: 8,
    imagePrincipale: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg"
  }
];

export const mockHebergements: Hebergement[] = [
  {
    id: 1,
    nom: "Hôtel de Luxe Paris",
    adresse: "123 Avenue des Champs-Élysées, Paris",
    etoile: 5,
    fraisParNuit: 250,
    nombreNuit: 3,
    visiteId:2
  },
  {
    id: 2,
    nom: "Villa Côte d'Azur",
    adresse: "45 Boulevard de la Mer, Nice",
    etoile: 4,
    fraisParNuit: 180,
     nombreNuit: 5,
     visiteId: 1
  }
];

export const mockVoitures: Voiture[] = [
  {
    id: 1,
    immatriculation: "AB-123-CD",
    marque: "Mercedes",
    modele: "Classe V",
    capacite: 8,
    coutParJours: 120,
    nombreJours: 5,
    offreId: 1
  },
  {
    id: 2,
    immatriculation: "EF-456-GH",
    marque: "BMW",
    modele: "X7",
    capacite: 7,
    coutParJours: 150,
    nombreJours: 3,
    offreId:2
  }
];

export const mockActivites: Activite[] = [
  {
    id: 1,
    descriptionActivite: "Visite guidée du Louvre",
    dateActivite: "10:00",
    lieuActivite: "Musée du Louvre",
    visiteId: 1
  },
  {
    id: 2,
    descriptionActivite: "Croisière sur la Seine",
    dateActivite: "15:00",
    lieuActivite: "Port de la Bourdonnais",
    visiteId: 2
  },
  {
    id: 3,
    descriptionActivite: "Visite de la Tour Eiffel",
    dateActivite: "14:00",
    lieuActivite: "Tour Eiffel",
    visiteId: 3
  },
  {
    id: 4,
    descriptionActivite: "Dégustation de vins",
    dateActivite: "18:00",
    lieuActivite: "Cave à vins Montmartre",
    visiteId: 4
  }
];

export const mockVisites: Visite[] = [
  {
    id: 1,
    ville: "Paris",
    dateVisite: "2024-03-16",
    ordreVisite: 1,
    offreId:1
  },
  {
    id: 2,
    ville: "Versailles",
    dateVisite: "2024-03-17",
    ordreVisite: 2,
    offreId:2
  },
  {
    id: 3,
    ville: "Nice",
    dateVisite: "2024-04-21",
    ordreVisite: 1,
    offreId:3
  },
  {
    id: 4,
    ville: "Cannes",
    dateVisite: "2024-04-22",
    ordreVisite: 2,
    offreId:4
  }
];

export const mockCommentaires: Commentaire[] = [
  {
    id: 1,
    dateCommentaire: "2024-02-15",
    contenuCommentaire: "Excellent séjour, très bien organisé!",
    notes: 5,
    utilisateurId: 2,
    offreId: 1
  },
  {
    id: 2,
    dateCommentaire: "2024-02-20",
    contenuCommentaire: "Très belle expérience, je recommande vivement!",
    notes: 4,
    utilisateurId: 2,
    offreId: 2
  }
];

export const mockReservations: Reservation[] = [
  {
    id: 1,
    nombrePers: 2,
    dateReservation: "2024-02-01",
    prixParPersonne: 598,
    statut: true,
    utilisateurId: 2,
    offreId: 1
  },
  {
    id: 2,
    nombrePers: 4,
    dateReservation: "2024-02-10",
    prixParPersonne: 1800,
    statut: false,
    utilisateurId: 2,
    offreId: 2
  }
];

export const mockPaiements: Paiement[] = [
  {
    id: 1,
    montant: 598,
    date: "2024-02-01",
    modePayement: "Carte bancaire",
    status: "completed",
    description:"reservation",
    utilisateurId: 1
  },
  {
    id: 2,
    montant: 900,
    date: "2024-02-10",
    modePayement: "Virement",
    status: "pending",
    description: "TXN-002",
    utilisateurId: 2
  }
];

export const mockMessages: Message[] = [
  {
    id: 1,
    dateEnvoie: "2024-02-10",
    contenuMessage: "Question sur la disponibilité du circuit Paris",
    utilisateurId: 2
  },
  {
    id: 2,
    dateEnvoie: "2024-02-12",
    contenuMessage: "Demande de modification de réservation",
    utilisateurId: 2
  }
];