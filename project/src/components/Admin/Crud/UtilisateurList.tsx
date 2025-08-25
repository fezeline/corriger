import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Shield, User as UserIcon, Mail, Phone, Key, Search, Filter, MoreVertical } from 'lucide-react';
import { User } from '../../../types';
import ActionButtons from '../../Common/ActionButtons';
import axios from 'axios';

interface UtilisateursListProps {
  onDelete: (id: number) => void;
}

const UtilisateursList: React.FC<UtilisateursListProps> = ({ onDelete }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Charger les utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:4005/utilisateur');
        if (!res.ok) throw new Error('Erreur réseau');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    console.log("Token utilisé pour suppression :", token);

    if (!token) {
      alert("Vous n'êtes pas connecté !");
      return;
    }

    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:4005/utilisateur/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) => prev.filter((u) => u.id !== id));
      onDelete(id);
      console.log("Utilisateur supprimé :", id);
    } catch (error) {
      console.error("Erreur suppression utilisateur :", error);
      alert("Erreur lors de la suppression de l'utilisateur");
    }
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? (
      <Shield className="w-4 h-4 text-red-500" />
    ) : (
      <UserIcon className="w-4 h-4 text-blue-500" />
    );
  };

  const getRoleColor = (role: string) => {
    return role === 'admin'
      ? 'bg-red-100 text-red-800 border-red-200'
      : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-gradient-to-r from-blue-500 to-blue-600',
      'bg-gradient-to-r from-green-500 to-green-600',
      'bg-gradient-to-r from-purple-500 to-purple-600',
      'bg-gradient-to-r from-orange-500 to-orange-600',
      'bg-gradient-to-r from-pink-500 to-pink-600',
      'bg-gradient-to-r from-teal-500 to-teal-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Filtrer les utilisateurs
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Utilisateurs</h1>
          <p className="text-gray-600">Gérez tous les utilisateurs de votre plateforme</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les rôles</option>
                <option value="admin">Administrateur</option>
                <option value="user">Utilisateur</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Header avec avatar */}
              <div className={`${getAvatarColor(user.nom)} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                    {getInitials(user.nom)}
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleIcon(user.role)}
                      <span className="ml-1 capitalize">{user.role}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{user.nom}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  
                  {user.contact && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{user.contact}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Key className="w-4 h-4 mr-2" />
                    <span className="font-mono">••••••••</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun utilisateur trouvé</h3>
            <p className="text-gray-500">
              {searchTerm || filterRole !== 'all' 
                ? "Aucun utilisateur ne correspond à vos critères de recherche." 
                : "Aucun utilisateur n'a été trouvé dans la base de données."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UtilisateursList;