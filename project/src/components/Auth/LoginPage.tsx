import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Conteneur centré */}
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <div>
          <Link to="/" className="text-blue-600 hover:text-blue-500">
            ← Retour à l'accueil
          </Link>
        </div>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
