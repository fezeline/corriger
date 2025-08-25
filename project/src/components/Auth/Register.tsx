import React, { useState } from 'react';
import { User, Mail, Lock, Phone, UserCheck, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  nom: string;
  email: string;
  motDePasse: string;
  confirmMotDePasse: string;
  role: string;
  contact: string;
}

interface FormErrors {
  nom?: string;
  email?: string;
  motDePasse?: string;
  confirmMotDePasse?: string;
  role?: string;
  contact?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    email: '',
    motDePasse: '',
    confirmMotDePasse: '',
    role: '',
    contact: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const roles = [
    { value: 'client', label: 'Client' },
    { value: 'admin', label: 'Administrateur' },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validation du nom
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    // Validation de l'email
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    // Validation du mot de passe
    if (!formData.motDePasse) {
      newErrors.motDePasse = 'Le mot de passe est requis';
    } else if (!validatePassword(formData.motDePasse)) {
      newErrors.motDePasse = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre';
    }

    // Validation de la confirmation du mot de passe
    if (!formData.confirmMotDePasse) {
      newErrors.confirmMotDePasse = 'La confirmation du mot de passe est requise';
    } else if (formData.motDePasse !== formData.confirmMotDePasse) {
      newErrors.confirmMotDePasse = 'Les mots de passe ne correspondent pas';
    }

    // Validation du rôle
    if (!formData.role) {
      newErrors.role = 'Le rôle est requis';
    }

    // Validation du téléphone
    if (!formData.contact) {
      newErrors.contact = 'Le numéro de téléphone est requis';
    } else if (!validatePhone(formData.contact)) {
      newErrors.contact = 'Format de téléphone invalide (ex: +33123456789 ou 0123456789)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Effacer l'erreur lors de la saisie
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Ici vous pourriez appeler votre API d'inscription
      console.log('Données d\'inscription:', {
        ...formData,
        confirmMotDePasse: undefined // Ne pas envoyer la confirmation
      });

      setIsSuccess(true);
      
      // Réinitialiser le formulaire après succès
      setTimeout(() => {
        setFormData({
          nom: '',
          email: '',
          motDePasse: '',
          confirmMotDePasse: '',
          role: '',
          contact: ''
        });
        setIsSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Inscription réussie !</h2>
          <p className="text-gray-600">Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Inscription</h1>
          <p className="text-gray-600">Créez votre compte utilisateur</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom */}
          <div className="space-y-1">
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
              Nom complet *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.nom ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Entrez votre nom complet"
              />
            </div>
            {errors.nom && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.nom}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="exemple@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Téléphone */}
          <div className="space-y-1">
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
              Contact *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.contact ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="+33 1 23 45 67 89"
              />
            </div>
            {errors.contact && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.contact}
              </p>
            )}
          </div>

          {/* Rôle */}
          <div className="space-y-1">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Rôle *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.role ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <option value="">Sélectionnez un rôle</option>
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.role}
              </p>
            )}
          </div>

          {/* Mot de passe */}
          <div className="space-y-1">
            <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700">
              Mot de passe *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="motDePasse"
                name="motDePasse"
                value={formData.motDePasse}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.motDePasse ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Minimum 8 caractères"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.motDePasse && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.motDePasse}
              </p>
            )}
          </div>

          {/* Confirmation mot de passe */}
          <div className="space-y-1">
            <label htmlFor="confirmMotDePasse" className="block text-sm font-medium text-gray-700">
              Confirmer le mot de passe *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmMotDePasse"
                name="confirmMotDePasse"
                value={formData.confirmMotDePasse}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.confirmMotDePasse ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Confirmez votre mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmMotDePasse && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.confirmMotDePasse}
              </p>
            )}
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Inscription en cours...
              </div>
            ) : (
              'Créer mon compte'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Déjà un compte ?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;