import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiHeart, FiCalendar } from 'react-icons/fi';
import ServiceIcon from '../components/ServiceIcon.jsx';

const Home = () => {
  const services = [
    {
      id: 1,
      name: 'Extensiones de Pestañas',
      description: 'Extensiones individuales para una mirada natural y voluminosa',
      icon: 'eyelashes',
      price: '55',
      duration: '1.5h',
      gradient: {
        from: '#F7CAC9',
        to: '#F8BBD9'
      }
    },
    {
      id: 2,
      name: 'Lifting de Pestañas',
      description: 'Tratamiento que realza y curva tus pestañas naturales',
      icon: 'sparkle',
      price: '40',
      duration: '1.5h',
      gradient: {
        from: '#E0ACD5',
        to: '#C8A2C8'
      }
    },
    {
      id: 3,
      name: 'Manicura Clásica',
      description: 'Limado, cutículas, hidratación y esmaltado tradicional',
      icon: 'nail-polish',
      price: '18',
      duration: '1.5h',
      gradient: {
        from: '#F7E7CE',
        to: '#FFCCCB'
      }
    },
    {
      id: 4,
      name: 'Manicura Semipermanente',
      description: 'Esmaltado duradero con acabado profesional',
      icon: 'diamond',
      price: '30',
      duration: '1.5h',
      gradient: {
        from: '#FFB3BA',
        to: '#DCAE96'
      }
    },
    {
      id: 5,
      name: 'Uñas de Gel',
      description: 'Construcción y fortalecimiento con gel UV',
      icon: 'gel',
      price: '42',
      duration: '1.5h',
      gradient: {
        from: '#9CAF88',
        to: '#C4C3D0'
      }
    },
    {
      id: 6,
      name: 'Uñas de Acrílico',
      description: 'Extensiones resistentes con diseños personalizados',
      icon: 'acrylic',
      price: '50',
      duration: '1.5h',
      gradient: {
        from: '#FEF7F0',
        to: '#FFFEF7'
      }
    }
  ];

  const testimonials = [
    {
      name: 'María García',
      text: 'Increíble trabajo, mis uñas nunca se habían visto tan bien. ¡Totalmente recomendado!',
      service: 'Manicura Semipermanente',
      rating: 5
    },
    {
      name: 'Laura Martínez',
      text: 'El ambiente es muy relajante y el resultado superó mis expectativas.',
      service: 'Extensiones de Pestañas',
      rating: 5
    },
    {
      name: 'Carmen López',
      text: 'Profesionales, puntuales y con un trato excelente. Mis uñas lucen perfectas.',
      service: 'Uñas de Gel',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-bg min-h-screen flex items-center justify-center">
        <div>
          {/* Enhanced Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-feminine-rose-gold to-feminine-blush-pink opacity-90"></div>
          <div className="absolute inset-0 bg-white bg-opacity-40"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-feminine-rose-gold rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-feminine-blush-pink rounded-full opacity-25 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-feminine-mauve rounded-full opacity-20"></div>
          
          <div className="relative z-10">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-6"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-script text-gray-900 mb-2 drop-shadow-sm">
                  Be <span className="text-gray-800">Brave</span>
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-gray-800 to-gray-700 mx-auto rounded-full"></div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl md:text-2xl font-elegant text-gray-800 mb-4 max-w-3xl mx-auto leading-relaxed font-semibold"
              >
                Tu salón de uñas de confianza en Granada
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto font-body font-medium"
              >
                Especialistas en manicura, pedicura y diseños únicos que reflejan tu personalidad y estilo.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <Link
                  to="/reservar"
                  className="glass-effect hover:bg-feminine-rose-gold hover:bg-opacity-30 text-gray-800 font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  ✨ Reservar Cita
                </Link>
                <Link
                  to="/servicios"
                  className="border-2 border-feminine-dusty-rose text-feminine-dusty-rose hover:bg-feminine-dusty-rose hover:text-white font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  💅 Ver Servicios
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-pastel-pink rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 bg-pastel-lavender rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-1/2 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-8 h-8 bg-pastel-mint rounded-full opacity-60"></div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 feminine-gradient relative">
        <div className="absolute inset-0 bg-white bg-opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-script text-5xl md:text-6xl text-gray-800 mb-4">
              Nuestros Servicios
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-feminine-dusty-rose to-feminine-mauve mx-auto rounded-full mb-6"></div>
            <p className="text-xl font-elegant text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Descubre nuestra amplia gama de servicios diseñados para realzar tu belleza natural y 
              expresar tu estilo único
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
                       style={{
                         background: `linear-gradient(135deg, ${service.gradient.from} 0%, ${service.gradient.to} 100%)`
                       }}>
                    <ServiceIcon 
                      name={service.icon} 
                      size={40} 
                      className="text-white drop-shadow-lg" 
                    />
                  </div>
                </div>
                <h3 className="font-script text-3xl text-gray-800 mb-3 group-hover:text-feminine-dusty-rose transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="font-body text-gray-600 mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>
                <div className="flex justify-between items-center mb-6 px-4">
                  <span className="text-lg font-elegant text-gray-500 bg-white bg-opacity-50 px-3 py-1 rounded-full">
                    ⏱️ {service.duration}
                  </span>
                  <span className="font-bold text-xl text-feminine-dusty-rose">
                    {service.price}€
                  </span>
                </div>
                <Link
                  to="/reservar"
                  className="w-full bg-gradient-to-r from-feminine-rose-gold to-feminine-blush-pink text-white font-semibold py-3 px-6 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 block text-center"
                >
                  ✨ Reservar Ahora
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/servicios" className="btn-primary">
              Ver Todos los Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 luxury-gradient relative">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-script text-5xl md:text-6xl text-white mb-4 drop-shadow-lg">
              Lo que Dicen Nuestras Clientas
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-white to-feminine-champagne mx-auto rounded-full mb-6"></div>
            <p className="text-xl font-elegant text-white text-opacity-90 max-w-3xl mx-auto leading-relaxed">
              La satisfacción de nuestras clientas es nuestra mayor recompensa y motivación
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-feminine-champagne fill-current group-hover:text-white transition-colors duration-300" size={24} />
                  ))}
                </div>
                <p className="font-elegant text-white text-opacity-90 mb-6 italic leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-white border-opacity-20 pt-6">
                  <h4 className="font-script text-2xl text-white mb-2 group-hover:text-feminine-champagne transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm font-body text-white text-opacity-70 bg-white bg-opacity-10 px-3 py-1 rounded-full inline-block">
                    {testimonial.service}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FiHeart className="text-primary-500 mx-auto mb-6" size={48} />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              ¿Lista para Brillar?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Reserva tu cita hoy y descubre por qué somos el salón de uñas 
              favorito en Granada. ¡Te esperamos!
            </p>
            <Link to="/reservar" className="btn-primary text-lg px-8 py-4">
              <FiCalendar className="inline mr-2" />
              Reservar Mi Cita Ahora
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
