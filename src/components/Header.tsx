import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

export default function Header() {
  const navigate = useNavigate();
  const username = localStorage.getItem('userName') || 'Usuário';

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('users');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Olá, {username}! 👋
          </h1>
          <p className="text-sm opacity-90">
            Gerencie seus Upgrades com qualidade e precisão. Transforme dados em estratégias inteligentes.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            Upgrade Manager
          </span>
          <button 
            onClick={handleLogout}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors duration-300"
            title="Sair"
          >
            <FaSignOutAlt className="text-white text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
}