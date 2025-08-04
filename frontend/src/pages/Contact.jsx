import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiClock, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('¡Mensaje enviado con éxito! Te responderemos pronto.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Ubicación',
      details: ['Granada, España', 'Zona Centro'],
      color: 'text-primary-500'
    },
    {
      icon: FiPhone,
      title: 'Teléfono',
      details: ['+34 XXX XXX XXX', 'WhatsApp disponible'],
      color: 'text-green-500'
    },
    {
      icon: FiMail,
      title: 'Email',
      details: ['info@bebrave.es', 'Respuesta en 24h'],
      color: 'text-blue-500'
    },
    {
      icon: FiInstagram,
      title: 'Instagram',
      details: ['@be_brave.es', 'Síguenos para inspiración'],
      color: 'text-pink-500'
    }
  ];

  const schedule = [
    { day: 'Lunes', hours: '9:00 - 19:00' },
    { day: 'Martes', hours: '9:00 - 19:00' },
    { day: 'Miércoles', hours: '9:00 - 19:00' },
    { day: 'Jueves', hours: '9:00 - 19:00' },
    { day: 'Viernes', hours: '9:00 - 19:00' },
    { day: 'Sábado', hours: '9:00 - 17:00' },
    { day: 'Domingo', hours: 'Cerrado' }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pastel-cyan-light via-pastel-pearl to-pastel-rose-pale opacity-95 -z-10"></div>
      <div className="fixed inset-0 bg-white bg-opacity-50 -z-10"></div>
      
      {/* Header */}
      <section className="gradient-bg py-20 pt-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-feminine-rose-gold to-feminine-blush-pink opacity-80"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-script text-5xl md:text-6xl text-gray-900 mb-4 drop-shadow-sm">
              Contacto
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-gray-800 to-gray-700 mx-auto rounded-full mb-6"></div>
            <p className="text-xl font-elegant text-gray-800 max-w-2xl mx-auto font-semibold leading-relaxed">
              ¿Tienes alguna pregunta o quieres conocer más sobre nuestros servicios? 
              ¡Estamos aquí para ayudarte!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 text-center hover:scale-105 bg-white bg-opacity-80 backdrop-blur-sm"
              >
                <div className={`${info.color} mb-4 flex justify-center`}>
                  <info.icon size={32} />
                </div>
                <h3 className="font-script text-xl font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-gray-700 text-sm font-medium">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-8"
            >
              <h2 className="font-display text-3xl font-bold text-gray-800 mb-6">
                Envíanos un Mensaje
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+34 XXX XXX XXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FiSend className="inline mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Schedule and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Schedule */}
              <div className="card p-8">
                <h2 className="font-display text-3xl font-bold text-gray-800 mb-6">
                  <FiClock className="inline mr-2" />
                  Horarios
                </h2>
                
                <div className="space-y-3">
                  {schedule.map((item, index) => (
                    <div key={item.day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-800">{item.day}</span>
                      <span className={`${item.hours === 'Cerrado' ? 'text-red-500' : 'text-gray-600'}`}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-pastel-pink rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> Los horarios pueden variar en días festivos. 
                    Te recomendamos confirmar tu cita con antelación.
                  </p>
                </div>
              </div>

              {/* FAQ */}
              <div className="card p-8">
                <h2 className="font-display text-2xl font-bold text-gray-800 mb-6">
                  Preguntas Frecuentes
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      ¿Necesito cita previa?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Sí, trabajamos únicamente con cita previa para garantizar 
                      la mejor atención personalizada.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      ¿Qué productos utilizáis?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Utilizamos únicamente productos profesionales de alta calidad 
                      de marcas reconocidas en el sector.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      ¿Ofrecéis servicios a domicilio?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Actualmente solo ofrecemos servicios en nuestro salón para 
                      garantizar las mejores condiciones de higiene y calidad.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-display text-3xl font-bold text-gray-800 mb-8">
              Nuestra Ubicación
            </h2>
            <div className="card p-8 bg-gradient-to-br from-pastel-rose-pale to-pastel-cyan-light">
              <FiMapPin className="text-primary-500 mx-auto mb-4" size={48} />
              <h3 className="font-display text-2xl font-semibold text-gray-800 mb-2">
                Granada Centro
              </h3>
              <p className="text-gray-600 mb-4">
                Estamos ubicadas en el corazón de Granada, fácilmente accesible 
                en transporte público y con parking cercano.
              </p>
              <p className="text-sm text-gray-500">
                La dirección exacta se proporcionará al confirmar tu cita.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
