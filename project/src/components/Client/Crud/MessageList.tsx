import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, MessageSquare, Send, Inbox } from 'lucide-react';
import { Message } from '../../../types';
import { mockMessages } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import ActionButtons from '../../Common/ActionButtons';
import axios from 'axios';

interface MessagesListProps {
  onEdit: (message: Message) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const MessagesList: React.FC<MessagesListProps> = ({ onEdit, onAdd, onDelete }) => {
  const [messages, setMessage] = useState<Message[]>(mockMessages);
  const { isAdmin, user } = useAuth();

  // Filter messages based on user role
  const filteredMessages = isAdmin 
    ? messages 
    : messages.filter(m => m.utilisateurId === user?.id);

const getMessage = async () =>{
  const res = await axios.get("http://localhost:4005/message/")
  if (res.data)
  {
    console.log(res.data)
    setMessage(res.data)
  }else{
    console.log("erreur message")
  }

    const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4005/message/${id}`);
      // Mettre à jour l'état local après la suppression
      setMessage(messages.filter(h => h.id !== id));
      // Appeler la prop onDelete si nécessaire
      onDelete(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'hébergement:", error);
    }
  };

}
useEffect(()  =>{
  getMessage();
}, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isAdmin ? 'Gestion des Messages' : 'Mes Messages'}
        </h1>
        <ActionButtons
          onAdd={onAdd}
          showEdit={false}
          showDelete={false}
        />
      </div>

      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-blue-500" />
                <div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Send className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">À: {message.utilisateurId}</span>
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(message.dateEnvoie).toLocaleDateString('fr-FR')}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-gray-800 leading-relaxed">
                {message.contenuMessage}
              </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-sm text-gray-500">
                Message #{message.id}
              </span>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(message)}
                  className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  {isAdmin ? 'Répondre' : 'Modifier'}
                </button>
                <button
                  onClick={() => onDelete(message.id)}
                  className="flex items-center px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-4">Aucun message trouvé</p>
            <button
              onClick={onAdd}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Envoyer un message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesList;