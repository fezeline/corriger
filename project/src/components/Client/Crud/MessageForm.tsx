import React, { useEffect, useState } from 'react';
import { Message } from '../../../types';
import { useAuth } from '../../../hooks/useAuth';
import DatePicker from '../../Common/DatePicker';
import axios from 'axios';

interface MessageFormProps {
  message?: Message;
  onSubmit: (message: Message) => void;
  onCancel: () => void;
}

interface Utilisateur {
  id: number;
  email: string;
}

const MessageForm: React.FC<MessageFormProps> = ({ message, onSubmit, onCancel }) => {
  const { user, isAdmin } = useAuth();
  const [formData, setFormData] = useState<Partial<Message>>({
    dateEnvoie: message?.dateEnvoie || new Date().toISOString().split('T')[0],
    contenuMessage: message?.contenuMessage || '',
    utilisateurId: message?.utilisateurId || user?.id || 0,
  });

const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [loadingUtilisateurs, setLoadingUtilisateurs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      setLoadingUtilisateurs(true);
      try {
        const response = await axios.get("http://localhost:4005/utilisateur/");
        setUtilisateurs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des visites:", error);
        setError("Impossible de charger les visites");
      } finally {
        setLoadingUtilisateurs(false);
      }
    };

    fetchUtilisateurs();
  }, []);

  const postMessage = async () =>{
  console.log(formData)
  const req = await axios.post("http://localhost:4005/message/", formData)
  if (req.data)
  {
    console.log(req.data)
  }else{
    console.log("erreur de creation")
  }
}

const putMessage = async () =>{
  console.log(formData)
  const req = await axios.put(`http://localhost:4005/message/${message?.id}`, formData)
  if (req.data)
  {
    console.log("Message mis à jour :",req.data)
  }else{
    console.log("Erreur de mise à jour :",error)
  }
}


 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
 
   if (message) {
     await putMessage(); // Modification
   } else {
     await postMessage(); // Création
   }
 
   // Mise à jour du parent
   onSubmit({
     id: message?.id || Date.now(),
     ...formData,
   } as Message);
 };

  const handleChange = (field: keyof Message, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {message ? 'Modifier le Message' : 'Nouveau Message'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          </div>

          <DatePicker
            label="Date d'envoi"
            value={formData.dateEnvoie || ''}
            onChange={(date) => handleChange('dateEnvoie', date)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={6}
              value={formData.contenuMessage}
              onChange={(e) => handleChange('contenuMessage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tapez votre message ici..."
            />
          </div>
                {/*affichage la liste de l'utilisateur associée*/}
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                      Utilisateur associée
               </label>
             {loadingUtilisateurs ? (
                <p className="text-gray-500">Chargement des utilisateurs...</p>
                  ) : (
             <select
                 value={formData.utilisateurId ?? ''}
                 onChange={(e) => handleChange('utilisateurId', e.target.value ? Number(e.target.value) : null)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
               >
              <option value="">Sélectionnez une utilisateur</option>
                {utilisateurs.map((utilisateur) => (
                 <option key={utilisateur.id} value={utilisateur.id}>
                    ID {utilisateur.id} - {utilisateur.email}
                   </option>
                  ))}
             </select>
                 )}
            </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {message ? 'Mettre à jour' : 'Envoyer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageForm;