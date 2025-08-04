import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { FaEuroSign } from "react-icons/fa";
import ServiceIcon from '../components/ServiceIcon.jsx';

const Services = () => {
  const services = [
    {
      category: 'Pestañas',
      items: [
        {
          name: 'Extensiones de Pestañas',
          description: 'Extensiones individuales para una mirada natural y voluminosa',
          duration: '1.5 horas',
          price: '55€',
          icon: 'eyelashes',
          color: 'from-pastel-rose-soft to-pastel-rose-pale'
        },
        {
          name: 'Lifting de Pestañas',
          description: 'Tratamiento que realza y curva tus pestañas naturales',
          duration: '1.5 horas',
          price: '40€',
          icon: 'sparkle',
          color: 'from-pastel-cyan to-pastel-cyan-light'
        }
      ]
    },
    {
      category: 'Manicura',
      items: [
        {
          name: 'Manicura Clásica',
          description: 'Limado, cutículas, hidratación y esmaltado tradicional',
          duration: '1.5 horas',
          price: '18€',
          icon: 'nail-polish',
          color: 'from-pastel-beige to-pastel-beige-warm'
        },
        {
          name: 'Manicura Semipermanente',
          description: 'Esmaltado duradero con acabado profesional (manos)',
          duration: '1.5 horas',
          price: '30€',
          icon: 'diamond',
          color: 'from-pastel-cream to-pastel-cream-soft'
        },
        {
          name: 'Uñas de Gel',
          description: 'Construcción y fortalecimiento con gel UV',
          duration: '1.5 horas',
          price: '42€',
          icon: 'gel',
          color: 'from-pastel-pearl to-pastel-powder'
        },
        {
          name: 'Uñas de Acrílico',
          description: 'Extensiones resistentes con diseños personalizados',
          duration: '1.5 horas',
          price: '50€',
          icon: 'acrylic',
          color: 'from-pastel-blush to-pastel-ivory'
        },
        {
          name: 'Relleno de Gel',
          description: 'Mantenimiento y relleno de uñas de gel',
          duration: '1.5 horas',
          price: '30€',
          icon: 'refresh',
          color: 'from-accent-sage to-accent-lavender'
        },
        {
          name: 'Relleno de Acrílico',
          description: 'Mantenimiento y relleno de uñas acrílicas',
          duration: '1.5 horas',
          price: '32€',
          icon: 'refresh',
          color: 'from-accent-gold-light to-accent-gold'
        }
      ]
    },
    {
      category: 'Pedicura',
      items: [
        {
          name: 'Pedicura Semipermanente',
          description: 'Cuidado completo de pies con esmaltado duradero',
          duration: '1.5 horas',
          price: '35€',
          icon: 'foot',
          color: 'from-pastel-cyan-light to-pastel-beige'
        }
      ]
    },
    {
      category: 'Servicios Adicionales',
      items: [
        {
          name: 'Retirada de Uñas',
          description: 'Retirada segura de gel, acrílico o semipermanente',
          duration: '45 min',
          price: '12€',
          icon: 'remove',
          color: 'from-neutral-elegant to-neutral-soft'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pastel-cyan-light via-pastel-pearl to-pastel-rose-pale opacity-95 -z-10"></div>
      <div className="fixed inset-0 bg-white bg-opacity-60 -z-10"></div>
      
      {/* Hero Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-feminine-rose-gold to-feminine-blush-pink opacity-80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-script text-gray-900 mb-4 drop-shadow-sm">
              Nuestros Servicios
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-gray-800 to-gray-700 mx-auto rounded-full mb-6"></div>
            <p className="text-xl font-elegant text-gray-800 max-w-3xl mx-auto font-semibold leading-relaxed">
              Descubre nuestra amplia gama de servicios profesionales para el cuidado y embellecimiento de tus uñas.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                {category.category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((service, serviceIndex) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: serviceIndex * 0.1 }}
                    className="service-card p-8 hover:scale-105 group bg-white bg-opacity-90 backdrop-blur-sm"
                  >
                    <div className="text-center mb-6">
                      <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-700 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <ServiceIcon type={service.icon} className="w-10 h-10" />
                      </div>
                      <h3 className="font-script text-xl font-semibold text-gray-900 mb-3">
                        {service.name}
                      </h3>
                      <p className="text-gray-700 mb-6 text-sm leading-relaxed font-medium">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="space-y-3 text-sm mb-6">
                      <div className="flex items-center justify-between bg-white bg-opacity-70 p-3 rounded-xl">
                        <div className="flex items-center text-gray-700">
                          <FiClock className="mr-2" size={16} />
                          <span className="font-medium">Duración</span>
                        </div>
                        <span className="font-semibold text-gray-900">{service.duration}</span>
                      </div>
                      
                      <div className="flex items-center justify-between bg-gradient-to-r from-pastel-cream to-pastel-beige p-3 rounded-xl">
                        <div className="flex items-center text-gray-700">
                          <FaEuroSign className="mr-2" size={16} />
                          <span className="font-medium">Precio</span>
                        </div>
                        <span className="font-bold text-gray-900 text-lg">{service.price}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link 
                        to="/reservar" 
                        className="w-full btn-primary text-center block"
                      >
                        Reservar Cita
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-bold text-gray-800 mb-6">
              Información Importante
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="card p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">
                  Política de Cancelación
                </h3>
                <p className="text-gray-600">
                  Por favor, cancela tu cita con al menos 24 horas de antelación. 
                  Las cancelaciones tardías pueden incurrir en una tarifa.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">
                  Cuidados Post-Tratamiento
                </h3>
                <p className="text-gray-600">
                  Te proporcionaremos instrucciones detalladas para el cuidado 
                  de tus uñas y pestañas después del tratamiento.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">
                  Productos de Calidad
                </h3>
                <p className="text-gray-600">
                  Utilizamos únicamente productos profesionales de las mejores 
                  marcas para garantizar resultados duraderos.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">
                  Consulta Gratuita
                </h3>
                <p className="text-gray-600">
                  ¿No estás segura de qué servicio elegir? Te ofrecemos una 
                  consulta gratuita para asesorarte.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
