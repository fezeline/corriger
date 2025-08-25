import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, MessageSquare, Send, Inbox, User, Reply, MoreVertical } from 'lucide-react';
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
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { isAdmin, user } = useAuth();

  // Filter messages based on user role
  const filteredMessages = isAdmin 
    ? messages 
    : messages.filter(m => m.utilisateurId === user?.id);

  const getMessage = async () => {
    const res = await axios.get("http://localhost:4005/message/")
    if (res.data) {
      console.log(res.data)
      setMessage(res.data)
    } else {
      console.log("erreur message")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4005/message/${id}`);
      setMessage(messages.filter(h => h.id !== id));
      onDelete(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'hébergement:", error);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-5">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {isAdmin ? 'Boîte de réception' : 'Mes Messages'}
              </h1>
              <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {filteredMessages.length} message(s)
              </div>
            </div>
            
            <div className="mb-4">
              <button
                onClick={onAdd}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-md"
              >
                <Plus className="w-5 h-5" />
                Nouveau message
              </button>
            </div>

            {/* Filtres */}
            <div className="flex space-x-2 mb-6">
              <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg">Tous</button>
              <button className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg">Non lus</button>
            </div>

            {/* Liste des messages */}
            <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
              {filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-4 rounded-xl cursor-pointer transition-all ${selectedMessage?.id === message.id ? 'bg-indigo-50 border border-indigo-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="bg-indigo-100 p-2 rounded-full">
                        <User className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Utilisateur #{message.utilisateurId}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{message.contenuMessage}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 block">
                        {new Date(message.dateEnvoie).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(message.dateEnvoie).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Détail du message */}
          <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-lg p-5">
            {selectedMessage ? (
              <>
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">Message #{selectedMessage.id}</h2>
                      <div className="flex items-center text-gray-600 mb-2">
                        <User className="w-4 h-4 mr-1" />
                        <span>De: Administrateur</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Send className="w-4 h-4 mr-1" />
                        <span>À: Utilisateur #{selectedMessage.utilisateurId}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 block">
                        {new Date(selectedMessage.dateEnvoie).toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(selectedMessage.dateEnvoie).toLocaleTimeString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                      {selectedMessage.contenuMessage}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(selectedMessage)}
                      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      <Reply className="w-4 h-4 mr-2" />
                      Répondre
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </button>
                  </div>
                  
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="bg-indigo-100 p-5 rounded-full mb-5">
                  <Inbox className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Sélectionnez un message</h3>
                <p className="text-gray-500 max-w-md">
                  {filteredMessages.length > 0 
                    ? "Choisissez un message dans la liste pour en voir le contenu" 
                    : "Vous n'avez aucun message pour le moment"}
                </p>
                {filteredMessages.length === 0 && (
                  <button
                    onClick={onAdd}
                    className="mt-6 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Envoyer un message
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesList;