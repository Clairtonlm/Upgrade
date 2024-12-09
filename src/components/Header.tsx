import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const username = localStorage.getItem('username') || 'Usuário';

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
        </div>
      </div>
    </header>
  );
}