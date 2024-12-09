import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

interface User {
  name: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Lógica de Login
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedUsers.find((u: User) => u.email === email && u.password === password);
      
      if (user) {
        // Armazenar nome para boas-vindas
        localStorage.setItem('userName', user.name);
        navigate('/dashboard');
      } else {
        alert('Credenciais inválidas');
      }
    } else {
      // Lógica de Registro
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Verificar se já existe usuário com este email
      const existingUser = storedUsers.find((u: User) => u.email === email);
      
      if (existingUser) {
        alert('Este email já está cadastrado');
        return;
      }
      
      const newUser: User = { name, email, password };
      storedUsers.push(newUser);
      
      localStorage.setItem('users', JSON.stringify(storedUsers));
      // Armazenar nome para boas-vindas
      localStorage.setItem('userName', name);
      
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? 'Entrar' : 'Registrar'}
        </h2>
        
        <form onSubmit={handleAuthentication} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Nome Completo"
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Senha"
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {isLogin ? 'Entrar' : 'Registrar'}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline text-sm"
          >
            {isLogin 
              ? 'Não tem uma conta? Registre-se' 
              : 'Já tem uma conta? Faça login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
