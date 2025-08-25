import React from 'react';
import { Link } from 'react-router-dom';
import Register from './Register';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-500">
            ← Retour à l'accueil
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Créez votre compte
          </h2>
        </div>

        <div className="mt-8">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
