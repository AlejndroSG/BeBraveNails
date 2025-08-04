import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pastel-pink to-pastel-rose rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">BB</span>
              </div>
              <span className="font-display font-bold text-xl">Be Brave</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Tu salón de uñas de confianza en Granada. Especialistas en manicura, pedicura, 
              uñas de gel y acrílico. ¡Atrévete a brillar con nosotras!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/be_brave.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pastel-pink transition-colors duration-300"
              >
                <FiInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-pastel-pink transition-colors duration-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-pastel-pink transition-colors duration-300">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/reservar" className="text-gray-300 hover:text-pastel-pink transition-colors duration-300">
                  Reservar Cita
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-pastel-pink transition-colors duration-300">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <FiMapPin className="text-pastel-pink" size={16} />
                <span className="text-gray-300 text-sm">Granada, España</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="text-pastel-pink" size={16} />
                <span className="text-gray-300 text-sm">+34 XXX XXX XXX</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="text-pastel-pink" size={16} />
                <span className="text-gray-300 text-sm">info@bebrave.es</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Be Brave. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
