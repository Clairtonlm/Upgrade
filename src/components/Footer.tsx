import React from 'react';
import { 
  FaLinkedin, 
  FaGithub, 
  FaInstagram, 
  FaEnvelope 
} from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    { 
      icon: FaLinkedin, 
      url: 'https://www.linkedin.com/in/clairtonlima', 
      color: 'text-blue-600 hover:text-blue-700' 
    },
    { 
      icon: FaGithub, 
      url: 'https://github.com/clairtonlima', 
      color: 'text-gray-800 hover:text-gray-900' 
    },
    { 
      icon: FaInstagram, 
      url: 'https://www.instagram.com/clairtonlima', 
      color: 'text-pink-600 hover:text-pink-700' 
    },
    { 
      icon: FaEnvelope, 
      url: 'mailto:clairtonlima@example.com', 
      color: 'text-red-600 hover:text-red-700' 
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          {socialLinks.map((social, index) => (
            <a 
              key={index} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-2xl transition-colors duration-300 ${social.color}`}
            >
              <social.icon />
            </a>
          ))}
        </div>
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Clairton Lima. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
