import React from 'react';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="text-xl font-bold mb-8">Simulador de Upgrade</div>
      <nav>
        <ul>
          <li className="mb-4">
            <a href="#" className="flex items-center space-x-2 p-2 rounded-md bg-gray-700">
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-4">
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-gray-300 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}