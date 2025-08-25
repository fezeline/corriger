export interface User {
  id: number;
  nom: string;
  email: string;
  motDePasse: string;
  role: 'admin' | 'client';
  contact: string;
}

export interface Hebergement {
  id: number;
  nom: string;
  adresse: string;
  etoile: number;
  fraisParNuit: number;
  nombreNuit?: number;
  visiteId :number;
}

export interface Offre {
  id: number;
  titreOffre: string;
  prixParPers: number;
  dateDepart: string;
  dateRetour: string;
  descriptionOffre: string;
  duree: number;
  placeDisponible: number;
  imagePrincipale: string;
}

export interface Visite {
  id: number;
  ville: string;
  dateVisite: string;
  ordreVisite: number;
  offreId: number;
}

export interface Activite {
  id: number;
  descriptionActivite: string;
  dateActivite: string;
  lieuActivite: string;
  visiteId: number;
}

export interface Voiture {
  id: number;
  immatriculation: string;
  marque: string;
  modele: string;
  capacite: number;
  coutParJours: number;
  nombreJours?: number;
  offreId: number;
}

export interface Commentaire {
  id: number;
  dateCommentaire: string;
  contenuCommentaire: string;
  notes: number;
  utilisateurId: number;
  offreId: number;
}

export interface Reservation {
  id: number;
  nombrePers: number;
  dateReservation: string;
  prixParPersonne: number;
  statut: boolean;
  utilisateurId: number;
  offreId: number;
}

export interface Paiement {
  id: number;
  montant: number;
  date: string;
  modePayement: string;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  utilisateurId: number;
}

export interface Message {
  id: number;
  dateEnvoie: string;
  contenuMessage: string;
  utilisateurId: number;
}