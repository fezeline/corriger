import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import AdminDashboard from './components/Admin/AdminDashboard';
import ClientDashboard from './components/Client/ClientDashboard';
import OffresList from './components/Admin/Crud/OffresList';
import OffreList from './components/Client/Crud/OffreList';
import OffreForm from './components/Admin/Crud/OffreForm';
import ReservationsList from './components/Admin/Crud/ReservationsList';
import ReservationList from './components/Client/Crud/ReservationList';
import ReservationForm from './components/Client/Crud/ReservationForm';
import HebergementsList from './components/Admin/Crud/HebergementList';
import HebergementForm from './components/Admin/Crud/HebergementForm';
import VoituresList from './components/Admin/Crud/VoitureList';
import VoitureForm from './components/Admin/Crud/VoitureForm';
import VisitesList from './components/Admin/Crud/VisiteList';
import VisiteForm from './components/Admin/Crud/VisiteForm';
import ActivitesList from './components/Admin/Crud/ActiviteList';
import ActiviteForm from './components/Admin/Crud/ActiviteForm';
import CommentairesList from './components/Admin/Crud/CommentaireList';
import CommentaireList from './components/Client/Crud/CommentaireList';
import CommentaireForm from './components/Client/Crud/CommentaireForm';
import PaiementsList from './components/Admin/Crud/PaiementsList';
import PaiementList from './components/Client/Crud/PaiementList';
import PaiementForm from './components/Client/Crud/PaiementForm';
import MessagesList from './components/Admin/Crud/MessageList';
import MessageForm from './components/Admin/Crud/MessageForm';
import UtilisateursList from './components/Admin/Crud/UtilisateurList';
import UtilisateurForm from './components/Admin/Crud/UtilisateurForm';
import Modal from './components/Common/Modal';
import Details from './components/Client/Crud/Details';
import { 
  Offre, 
  Reservation, 
  Hebergement, 
  Voiture, 
  Visite, 
  Activite, 
  Commentaire, 
  Paiement, 
  Message, 
  User 
} from './types';

const AppDashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showOffreForm, setShowOffreForm] = useState(false);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [showHebergementForm, setShowHebergementForm] = useState(false);
  const [showVoitureForm, setShowVoitureForm] = useState(false);
  const [showVisiteForm, setShowVisiteForm] = useState(false);
  const [showActiviteForm, setShowActiviteForm] = useState(false);
  const [showCommentaireForm, setShowCommentaireForm] = useState(false);
  const [showPaiementForm, setShowPaiementForm] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showUtilisateurForm, setShowUtilisateurForm] = useState(false);
  const [editingOffre, setEditingOffre] = useState<Offre | undefined>();
  const [editingReservation, setEditingReservation] = useState<Reservation | undefined>();
  const [editingHebergement, setEditingHebergement] = useState<Hebergement | undefined>();
  const [editingVoiture, setEditingVoiture] = useState<Voiture | undefined>();
  const [editingVisite, setEditingVisite] = useState<Visite | undefined>();
  const [editingActivite, setEditingActivite] = useState<Activite | undefined>();
  const [editingCommentaire, setEditingCommentaire] = useState<Commentaire | undefined>();
  const [editingPaiement, setEditingPaiement] = useState<Paiement | undefined>();
  const [editingMessage, setEditingMessage] = useState<Message | undefined>();
  const [editingUtilisateur, setEditingUtilisateur] = useState<User | undefined>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteType, setDeleteType] = useState<string>('offre');

  // Handlers pour les offres
  const handleEditOffre = (offre: Offre) => {
    setEditingOffre(offre);
    setShowOffreForm(true);
  };

  const handleAddOffre = () => {
    setEditingOffre(undefined);
    setShowOffreForm(true);
  };

  const handleDeleteOffre = (id: number) => {
    setDeleteId(id);
    setDeleteType('offre');
    setShowDeleteModal(true);
  };

  // Handlers pour les réservations
  const handleEditReservation = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setShowReservationForm(true);
  };

  const handleAddReservation = () => {
    setEditingReservation(undefined);
    setShowReservationForm(true);
  };

  const handleDeleteReservation = (id: number) => {
    setDeleteId(id);
    setDeleteType('reservation');
    setShowDeleteModal(true);
  };

  // Handlers pour les hébergements
  const handleEditHebergement = (hebergement: Hebergement) => {
    setEditingHebergement(hebergement);
    setShowHebergementForm(true);
  };

  const handleAddHebergement = () => {
    setEditingHebergement(undefined);
    setShowHebergementForm(true);
  };

  const handleDeleteHebergement = (id: number) => {
    setDeleteId(id);
    setDeleteType('hebergement');
    setShowDeleteModal(true);
  };

  // Handlers pour les voitures
  const handleEditVoiture = (voiture: Voiture) => {
    setEditingVoiture(voiture);
    setShowVoitureForm(true);
  };

  const handleAddVoiture = () => {
    setEditingVoiture(undefined);
    setShowVoitureForm(true);
  };

  const handleDeleteVoiture = (id: number) => {
    setDeleteId(id);
    setDeleteType('voiture');
    setShowDeleteModal(true);
  };

  // Handlers pour les visites
  const handleEditVisite = (visite: Visite) => {
    setEditingVisite(visite);
    setShowVisiteForm(true);
  };

  const handleAddVisite = () => {
    setEditingVisite(undefined);
    setShowVisiteForm(true);
  };

  const handleDeleteVisite = (id: number) => {
    setDeleteId(id);
    setDeleteType('visite');
    setShowDeleteModal(true);
  };

  // Handlers pour les activités
  const handleEditActivite = (activite: Activite) => {
    setEditingActivite(activite);
    setShowActiviteForm(true);
  };

  const handleAddActivite = () => {
    setEditingActivite(undefined);
    setShowActiviteForm(true);
  };

  const handleDeleteActivite = (id: number) => {
    setDeleteId(id);
    setDeleteType('activite');
    setShowDeleteModal(true);
  };

  // Handlers pour les commentaires
  const handleEditCommentaire = (commentaire: Commentaire) => {
    setEditingCommentaire(commentaire);
    setShowCommentaireForm(true);
  };

  const handleAddCommentaire = () => {
    setEditingCommentaire(undefined);
    setShowCommentaireForm(true);
  };

  const handleDeleteCommentaire = (id: number) => {
    setDeleteId(id);
    setDeleteType('commentaire');
    setShowDeleteModal(true);
  };

  // Handlers pour les paiements
  const handleEditPaiement = (paiement: Paiement) => {
    setEditingPaiement(paiement);
    setShowPaiementForm(true);
  };

  const handleAddPaiement = () => {
    setEditingPaiement(undefined);
    setShowPaiementForm(true);
  };

  const handleDeletePaiement = (id: number) => {
    setDeleteId(id);
    setDeleteType('paiement');
    setShowDeleteModal(true);
  };

  // Handlers pour les messages
  const handleEditMessage = (message: Message) => {
    setEditingMessage(message);
    setShowMessageForm(true);
  };

  const handleAddMessage = () => {
    setEditingMessage(undefined);
    setShowMessageForm(true);
  };

  const handleDeleteMessage = (id: number) => {
    setDeleteId(id);
    setDeleteType('message');
    setShowDeleteModal(true);
  };

  // Handlers pour les utilisateurs
  const handleDeleteUtilisateur = (id: number) => {
    setDeleteId(id);
    setDeleteType('utilisateur');
    setShowDeleteModal(true);
  };

  // Handlers de soumission
  const handleOffreSubmit = (offre: Offre) => {
    console.log('Offre submitted:', offre);
    setShowOffreForm(false);
    setEditingOffre(undefined);
  };

  const handleReservationSubmit = (reservation: Reservation) => {
    console.log('Reservation submitted:', reservation);
    setShowReservationForm(false);
    setEditingReservation(undefined);
  };

  const handleHebergementSubmit = (hebergement: Hebergement) => {
    console.log('Hebergement submitted:', hebergement);
    setShowHebergementForm(false);
    setEditingHebergement(undefined);
  };

  const handleVoitureSubmit = (voiture: Voiture) => {
    console.log('Voiture submitted:', voiture);
    setShowVoitureForm(false);
    setEditingVoiture(undefined);
  };

  const handleVisiteSubmit = (visite: Visite) => {
    console.log('Visite submitted:', visite);
    setShowVisiteForm(false);
    setEditingVisite(undefined);
  };

  const handleActiviteSubmit = (activite: Activite) => {
    console.log('Activite submitted:', activite);
    setShowActiviteForm(false);
    setEditingActivite(undefined);
  };

  const handleCommentaireSubmit = (commentaire: Commentaire) => {
    console.log('Commentaire submitted:', commentaire);
    setShowCommentaireForm(false);
    setEditingCommentaire(undefined);
  };

  const handlePaiementSubmit = (paiement: Paiement) => {
    console.log('Paiement submitted:', paiement);
    setShowPaiementForm(false);
    setEditingPaiement(undefined);
  };

  const handleMessageSubmit = (message: Message) => {
    console.log('Message submitted:', message);
    setShowMessageForm(false);
    setEditingMessage(undefined);
  };

  const handleUtilisateurSubmit = (user: User) => {
    console.log('Utilisateur submitted:', user);
    setShowUtilisateurForm(false);
    setEditingUtilisateur(undefined);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      console.log(`Deleting ${deleteType}:`, deleteId);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const renderContent = () => {
    if (showOffreForm) {
      return (
        <OffreForm
          offre={editingOffre}
          onSubmit={handleOffreSubmit}
          onCancel={() => {
            setShowOffreForm(false);
            setEditingOffre(undefined);
          }}
        />
      );
    }

    if (showReservationForm) {
      return (
        <ReservationForm
          reservation={editingReservation}
          onSubmit={handleReservationSubmit}
          onCancel={() => {
            setShowReservationForm(false);
            setEditingReservation(undefined);
          }}
        />
      );
    }

    if (showHebergementForm) {
      return (
        <HebergementForm
          hebergement={editingHebergement}
          onSubmit={handleHebergementSubmit}
          onCancel={() => {
            setShowHebergementForm(false);
            setEditingHebergement(undefined);
          }}
        />
      );
    }

    if (showVoitureForm) {
      return (
        <VoitureForm
          voiture={editingVoiture}
          onSubmit={handleVoitureSubmit}
          onCancel={() => {
            setShowVoitureForm(false);
            setEditingVoiture(undefined);
          }}
        />
      );
    }

    if (showVisiteForm) {
      return (
        <VisiteForm
          visite={editingVisite}
          onSubmit={handleVisiteSubmit}
          onCancel={() => {
            setShowVisiteForm(false);
            setEditingVisite(undefined);
          }}
        />
      );
    }

    if (showActiviteForm) {
      return (
        <ActiviteForm
          activite={editingActivite}
          onSubmit={handleActiviteSubmit}
          onCancel={() => {
            setShowActiviteForm(false);
            setEditingActivite(undefined);
          }}
        />
      );
    }

    if (showCommentaireForm) {
      return (
        <CommentaireForm
          commentaire={editingCommentaire}
          onSubmit={handleCommentaireSubmit}
          onCancel={() => {
            setShowCommentaireForm(false);
            setEditingCommentaire(undefined);
          }}
        />
      );
    }

    if (showPaiementForm) {
      return (
        <PaiementForm
          paiement={editingPaiement}
          onSubmit={handlePaiementSubmit}
          onCancel={() => {
            setShowPaiementForm(false);
            setEditingPaiement(undefined);
          }}
        />
      );
    }

    if (showMessageForm) {
      return (
        <MessageForm
          message={editingMessage}
          onSubmit={handleMessageSubmit}
          onCancel={() => {
            setShowMessageForm(false);
            setEditingMessage(undefined);
          }}
        />
      );
    }

    if (showUtilisateurForm) {
      return (
        <UtilisateurForm
          user={editingUtilisateur}
          onSubmit={handleUtilisateurSubmit}
          onCancel={() => {
            setShowUtilisateurForm(false);
            setEditingUtilisateur(undefined);
          }}
        />
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return isAdmin ? <AdminDashboard /> : <ClientDashboard />;
      case 'offres':
        return (
          <OffresList
            onEdit={handleEditOffre}
            onAdd={handleAddOffre}
            onDelete={handleDeleteOffre}
          />
        );
      case 'offre':
        return (
          <OffreList
            onEdit={handleEditOffre}
            onAdd={handleAddOffre}
            onDelete={handleDeleteOffre}
          />
        );
      case 'reservations':
        return (
          <ReservationsList
            onEdit={handleEditReservation}
            onAdd={handleAddReservation}
            onDelete={handleDeleteReservation}
          />
        );
      case 'reservation':
        return (
          <ReservationList
            onEdit={handleEditReservation}
            onAdd={handleAddReservation}
            onDelete={handleDeleteReservation}
          />
        );
      case 'hebergements':
        return (
          <HebergementsList
            onEdit={handleEditHebergement}
            onAdd={handleAddHebergement}
            onDelete={handleDeleteHebergement}
          />
        );
      case 'voitures':
        return (
          <VoituresList
            onEdit={handleEditVoiture}
            onAdd={handleAddVoiture}
            onDelete={handleDeleteVoiture}
          />
        );
      case 'visites':
        return (
          <VisitesList
            onEdit={handleEditVisite}
            onAdd={handleAddVisite}
            onDelete={handleDeleteVisite}
          />
        );
      case 'activites':
        return (
          <ActivitesList
            onEdit={handleEditActivite}
            onAdd={handleAddActivite}
            onDelete={handleDeleteActivite}
          />
        );
      case 'commentaires':
        return (
          <CommentairesList
            onEdit={handleEditCommentaire}
            onAdd={handleAddCommentaire}
            onDelete={handleDeleteCommentaire}
          />
        );
      case 'commentaire':
        return (
          <CommentaireList
            onEdit={handleEditCommentaire}
            onAdd={handleAddCommentaire}
            onDelete={handleDeleteCommentaire}
          />
        );
      case 'paiement':
        return (
          <PaiementList
            onEdit={handleEditPaiement}
            onAdd={handleAddPaiement}
            onDelete={handleDeletePaiement}
          />
        );
      case 'paiements':
        return (
          <PaiementsList />
        );
      case 'messages':
        return (
          <MessagesList
            onEdit={handleEditMessage}
            onAdd={handleAddMessage}
            onDelete={handleDeleteMessage}
          />
        );
      case 'details':
        return <Details />;
      case 'utilisateurs':
        return (
          <UtilisateursList
            onDelete={handleDeleteUtilisateur}
          />
        );
      default:
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Section en développement
              </h2>
              <p className="text-gray-600">
                Cette section sera bientôt disponible.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <div className="flex-1">
        <Header />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmer la suppression"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Supprimer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AppDashboard;