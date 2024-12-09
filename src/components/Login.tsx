import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';

interface User {
  name: string;
  email: string;
  password: string;
  createdAt: number;
  lastLogin: number;
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar credenciais salvas ao carregar
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    // Remover mensagem de sucesso após 3 segundos
    if (loginSuccess) {
      const timer = setTimeout(() => {
        setLoginSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess]);

  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Recuperar lista de usuários
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    if (isLogin) {
      // Lógica de Login
      const user = storedUsers.find((u: User) => u.email === email && u.password === password);
      
      if (user) {
        // Gerenciar "Lembrar de mim"
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Armazenar nome para boas-vindas
        localStorage.setItem('userName', user.name);
        
        // Atualizar último login
        user.lastLogin = Date.now();
        
        // Atualizar lista de usuários
        const updatedUsers = storedUsers.map((u: User) => 
          u.email === email ? user : u
        );
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        
        // Mostrar mensagem de sucesso
        setLoginSuccess(true);
        
        // Navegar para dashboard após um curto delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        alert('Credenciais inválidas');
      }
    } else {
      // Lógica de Registro
      const existingUser = storedUsers.find((u: User) => u.email === email);
      
      if (existingUser) {
        alert('Este email já está cadastrado');
        return;
      }
      
      const newUser: User = { 
        name, 
        email, 
        password, 
        createdAt: Date.now(),
        lastLogin: Date.now()
      };
      
      storedUsers.push(newUser);
      
      // Salvar lista atualizada de usuários
      localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
      
      // Armazenar nome para boas-vindas
      localStorage.setItem('userName', name);
      
      // Gerenciar "Lembrar de mim"
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      }
      
      // Mostrar mensagem de sucesso
      setLoginSuccess(true);
      
      // Navegar para dashboard após um curto delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 relative">
      {loginSuccess && (
        <div className="fixed top-0 left-0 w-full bg-green-500 text-white text-center py-3 z-50 flex items-center justify-center">
          <FaCheckCircle className="mr-2" />
          {isLogin ? 'Login efetuado com sucesso!' : 'Registro realizado com sucesso!'}
        </div>
      )}
      
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
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Senha"
              className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm">
                Lembrar meu email
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm">
                Mostrar senha
              </label>
            </div>
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
