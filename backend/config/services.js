// Service configurations with realistic durations and fixed pricing
const services = {
  'pestanas': {
    id: 'pestanas',
    name: 'Extensiones de Pestañas',
    duration: 90, // 1.5h
    price: 55,
    category: 'Pestañas',
    description: 'Extensiones individuales para una mirada natural y voluminosa',
    icon: 'eyelashes',
    color: 'from-pastel-rose-soft to-pastel-rose-pale'
  },
  'lifting': {
    id: 'lifting',
    name: 'Lifting de Pestañas',
    duration: 90, // 1.5h
    price: 40,
    category: 'Pestañas',
    description: 'Tratamiento que realza y curva tus pestañas naturales',
    icon: 'sparkle',
    color: 'from-pastel-cyan to-pastel-cyan-light'
  },
  'manicura-clasica': {
    id: 'manicura-clasica',
    name: 'Manicura Clásica',
    duration: 90, // 1.5h
    price: 18,
    category: 'Manicura',
    description: 'Limado, cutículas, hidratación y esmaltado tradicional',
    icon: 'nail-polish',
    color: 'from-pastel-beige to-pastel-beige-warm'
  },
  'manicura-semi': {
    id: 'manicura-semi',
    name: 'Manicura Semipermanente',
    duration: 90, // 1.5h
    price: 30,
    category: 'Manicura',
    description: 'Esmaltado duradero con acabado profesional (manos)',
    icon: 'diamond',
    color: 'from-pastel-cream to-pastel-cream-soft'
  },
  'unas-gel': {
    id: 'unas-gel',
    name: 'Uñas de Gel',
    duration: 90, // 1.5h
    price: 42,
    category: 'Manicura',
    description: 'Construcción y fortalecimiento con gel UV',
    icon: 'gel',
    color: 'from-pastel-pearl to-pastel-powder'
  },
  'unas-acrilico': {
    id: 'unas-acrilico',
    name: 'Uñas de Acrílico',
    duration: 90, // 1.5h
    price: 50,
    category: 'Manicura',
    description: 'Extensiones resistentes con diseños personalizados',
    icon: 'acrylic',
    color: 'from-pastel-blush to-pastel-ivory'
  },
  'relleno-gel': {
    id: 'relleno-gel',
    name: 'Relleno de Gel',
    duration: 90, // 1.5h
    price: 30,
    category: 'Manicura',
    description: 'Mantenimiento y relleno de uñas de gel',
    icon: 'refresh',
    color: 'from-accent-sage to-accent-lavender'
  },
  'relleno-acrilico': {
    id: 'relleno-acrilico',
    name: 'Relleno de Acrílico',
    duration: 90, // 1.5h
    price: 32,
    category: 'Manicura',
    description: 'Mantenimiento y relleno de uñas acrílicas',
    icon: 'refresh',
    color: 'from-accent-gold-light to-accent-gold'
  },
  'pedicura-semi': {
    id: 'pedicura-semi',
    name: 'Pedicura Semipermanente',
    duration: 90, // 1.5h
    price: 35,
    category: 'Pedicura',
    description: 'Cuidado completo de pies con esmaltado duradero',
    icon: 'foot',
    color: 'from-pastel-cyan-light to-pastel-beige'
  },
  'retirada': {
    id: 'retirada',
    name: 'Retirada de Uñas',
    duration: 45, // 45min
    price: 12,
    category: 'Servicios Adicionales',
    description: 'Retirada segura de gel, acrílico o semipermanente',
    icon: 'remove',
    color: 'from-neutral-elegant to-neutral-soft'
  }
};

// Business hours configuration
const businessHours = {
  monday: { open: '09:00', close: '19:00', closed: false },
  tuesday: { open: '09:00', close: '19:00', closed: false },
  wednesday: { open: '09:00', close: '19:00', closed: false },
  thursday: { open: '09:00', close: '19:00', closed: false },
  friday: { open: '09:00', close: '19:00', closed: false },
  saturday: { open: '09:00', close: '17:00', closed: false },
  sunday: { closed: true }
};

// Special dates (holidays, closures, etc.)
const specialDates = {
  // Example: '2024-12-25': { closed: true, reason: 'Christmas Day' },
  // Example: '2024-01-01': { closed: true, reason: 'New Year\'s Day' }
};

// Business information
const businessInfo = {
  name: process.env.BUSINESS_NAME || 'Be Brave',
  email: process.env.BUSINESS_EMAIL || 'info@bebrave.es',
  phone: process.env.BUSINESS_PHONE || '+34 XXX XXX XXX',
  address: process.env.BUSINESS_ADDRESS || 'Granada, España',
  instagram: '@be_brave.es',
  timezone: 'Europe/Madrid',
  slotDuration: 30, // minutes
  bookingAdvance: {
    min: 1, // minimum 1 day in advance
    max: 60 // maximum 60 days in advance
  }
};

module.exports = {
  services,
  businessHours,
  specialDates,
  businessInfo
};
