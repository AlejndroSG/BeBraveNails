import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { FiCalendar, FiClock, FiUser, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const Booking = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const services = [
    { id: 'pestanas', name: 'Extensiones de Pestañas', duration: 90, price: '55€' },
    { id: 'lifting', name: 'Lifting de Pestañas', duration: 90, price: '40€' },
    { id: 'manicura-clasica', name: 'Manicura Clásica', duration: 90, price: '18€' },
    { id: 'manicura-semi', name: 'Manicura Semipermanente', duration: 90, price: '30€' },
    { id: 'unas-gel', name: 'Uñas de Gel', duration: 90, price: '42€' },
    { id: 'unas-acrilico', name: 'Uñas de Acrílico', duration: 90, price: '50€' },
    { id: 'relleno-gel', name: 'Relleno de Gel', duration: 90, price: '30€' },
    { id: 'relleno-acrilico', name: 'Relleno de Acrílico', duration: 90, price: '32€' },
    { id: 'pedicura-semi', name: 'Pedicura Semipermanente', duration: 90, price: '35€' },
    { id: 'retirada', name: 'Retirada de Uñas', duration: 45, price: '12€' }
  ];

  const fetchAvailableSlots = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/availability', {
        params: {
          date: selectedDate.toISOString().split('T')[0],
          serviceId: selectedService
        }
      });
      setAvailableSlots(response.data.slots || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
      // Fallback to default slots if API is not available
      setAvailableSlots(generateDefaultSlots());
    } finally {
      setLoading(false);
    }
  }, [selectedDate, selectedService]);

  // Fetch available time slots when date changes
  useEffect(() => {
    if (selectedService && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedService, selectedDate, fetchAvailableSlots]);

  const generateDefaultSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 19;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          time: timeString,
          available: Math.random() > 0.3 // Simulate some unavailable slots
        });
      }
    }
    
    return slots;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime || !formData.name || !formData.phone) {
      toast.error('Por favor, completa todos los campos obligatorios');
      return;
    }

    setLoading(true);
    
    try {
      const bookingData = {
        service: selectedService,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        ...formData
      };

      const response = await axios.post('/api/bookings', bookingData);
      
      if (response.data.success) {
        toast.success('¡Cita reservada con éxito! Te enviaremos una confirmación.');
        // Reset form
        setSelectedService('');
        setSelectedDate(null);
        setSelectedTime('');
        setFormData({ name: '', phone: '', email: '', notes: '' });
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Error al reservar la cita. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0; // Exclude Sundays
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pastel-cyan-light via-pastel-pearl to-pastel-rose-pale opacity-95 -z-10"></div>
      <div className="fixed inset-0 bg-white bg-opacity-70 -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-script text-gray-900 mb-4 drop-shadow-sm">
            Reservar Cita
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-gray-800 to-gray-700 mx-auto rounded-full mb-6"></div>
          <p className="text-xl font-elegant text-gray-800 max-w-3xl mx-auto font-semibold leading-relaxed">
            Selecciona tu servicio preferido y elige la fecha y hora que mejor te convenga.
          </p>
        </div>

        {/* Booking Form */}
        <div className="py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-3xl p-8 shadow-2xl bg-white bg-opacity-90 backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  <FiCheck className="inline mr-2" />
                  Selecciona tu Servicio *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedService === service.id
                          ? 'border-feminine-dusty-rose bg-feminine-rose-gold bg-opacity-20'
                          : 'border-gray-200 hover:border-feminine-dusty-rose'
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-700 font-medium">
                        {service.duration} • {service.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              {selectedService && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5 }}
                >
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <FiCalendar className="inline mr-2" />
                    Selecciona la Fecha *
                  </label>
                  <div className="flex justify-center">
                    <DatePicker
                      selected={selectedDate}
                      onChange={setSelectedDate}
                      filterDate={isWeekday}
                      minDate={new Date()}
                      maxDate={new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)} // 60 days from now
                      inline
                      calendarClassName="custom-calendar"
                    />
                  </div>
                </motion.div>
              )}

              {/* Time Selection */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5 }}
                >
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <FiClock className="inline mr-2" />
                    Selecciona la Hora *
                  </label>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
                      <p className="mt-2 text-gray-700 font-medium">Cargando horarios disponibles...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                            selectedTime === slot.time
                              ? 'bg-primary-500 text-white'
                              : slot.available
                              ? 'bg-white border-2 border-gray-300 text-gray-900 hover:border-primary-400 hover:bg-gray-50'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Contact Information */}
              {selectedTime && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    <FiUser className="inline mr-2" />
                    Información de Contacto
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
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
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+34 XXX XXX XXX"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Email (opcional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Notas Adicionales (opcional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="¿Alguna preferencia especial o información que debamos saber?"
                    />
                  </div>
                </motion.div>
              )}

              {/* Summary and Submit */}
              {selectedTime && formData.name && formData.phone && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5 }}
                  className="bg-white bg-opacity-80 p-6 rounded-lg border-2 border-pastel-rose-soft backdrop-blur-sm"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Resumen de tu Cita
                  </h3>
                  <div className="space-y-2 text-gray-800 font-medium">
                    <p><strong>Servicio:</strong> {selectedServiceData?.name}</p>
                    <p><strong>Fecha:</strong> {selectedDate?.toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                    <p><strong>Hora:</strong> {selectedTime}</p>
                    <p><strong>Duración:</strong> {Math.floor(selectedServiceData?.duration / 60)}h {selectedServiceData?.duration % 60 > 0 ? `${selectedServiceData?.duration % 60}min` : ''}</p>
                    <p><strong>Precio:</strong> {selectedServiceData?.price}</p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline mr-2"></div>
                        Reservando...
                      </>
                    ) : (
                      <>
                        <FiCheck className="inline mr-2" />
                        Confirmar Reserva
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
