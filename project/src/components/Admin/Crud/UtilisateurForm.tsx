import React, { useState } from 'react';
import { User } from '../../../types';
import DatePicker from '../../Common/DatePicker';

interface UtilisateurFormProps {
  user?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

const UtilisateurForm: React.FC<UtilisateurFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    nom: user?.nom || '',
    email: user?.email || '',
    mot_de_passe: user?.mot_de_passe || '',
    role: user?.role || 'client',
    
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: user?.id || Date.now(),
      ...formData,
    } as User);
  };

  const handleChange = (field: keyof User, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {user ? 'Modifier l\'Utilisateur' : 'Nouvel Utilisateur'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Jean Dupont"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="jean.dupont@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={formData.motDePasse}
                onChange={(e) => handleChange('motDePasse', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rôle <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value as 'admin' | 'client')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="client">Client</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
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
              {user ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UtilisateurForm;