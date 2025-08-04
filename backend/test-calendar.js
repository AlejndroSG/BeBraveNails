/**
 * Script de prueba para Google Calendar Integration
 * Ejecuta: node test-calendar.js
 */

require('dotenv').config();
const GoogleCalendarService = require('./services/googleCalendar');

async function testCalendarIntegration() {
  console.log('🗓️  Probando integración con Google Calendar...\n');

  const calendarService = new GoogleCalendarService();

  // 1. Verificar configuración
  console.log('1️⃣  Verificando configuración...');
  const isAuthenticated = calendarService.isAuthenticated();
  
  console.log('Variables de entorno:');
  console.log(`   GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID ? '✅ Configurado' : '❌ Falta'}`);
  console.log(`   GOOGLE_CLIENT_SECRET: ${process.env.GOOGLE_CLIENT_SECRET ? '✅ Configurado' : '❌ Falta'}`);
  console.log(`   GOOGLE_REFRESH_TOKEN: ${process.env.GOOGLE_REFRESH_TOKEN ? '✅ Configurado' : '❌ Falta'}`);
  console.log(`   GOOGLE_CALENDAR_ID: ${process.env.GOOGLE_CALENDAR_ID || 'primary'}`);
  console.log(`   Estado general: ${isAuthenticated ? '✅ Listo' : '❌ Incompleto'}\n`);

  if (!isAuthenticated) {
    console.log('❌ Configuración incompleta. Sigue estos pasos:');
    console.log('1. Configura las variables en el archivo .env');
    console.log('2. Ejecuta el proceso de autorización OAuth');
    console.log('3. Vuelve a ejecutar este script\n');
    
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      console.log('🔗 Para obtener credenciales, ve a:');
      console.log('   https://console.cloud.google.com/apis/credentials\n');
    }
    
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && !process.env.GOOGLE_REFRESH_TOKEN) {
      console.log('🔑 Para obtener el refresh token:');
      console.log('1. Inicia el servidor: npm run dev');
      console.log('2. Ve a: http://localhost:5000/api/auth/google');
      console.log('3. Sigue las instrucciones de autorización\n');
    }
    
    return;
  }

  // 2. Probar conexión
  console.log('2️⃣  Probando conexión con Google Calendar...');
  try {
    const today = new Date().toISOString().split('T')[0];
    const availability = await calendarService.getAvailability(today);

    if (availability.success) {
      console.log('✅ Conexión exitosa con Google Calendar');
      console.log(`   Fecha consultada: ${today}`);
      console.log(`   Slots ocupados: ${availability.busySlots.length}`);
      console.log(`   Slots disponibles: ${availability.availableSlots.length}`);
      
      if (availability.busySlots.length > 0) {
        console.log('   Horarios ocupados:');
        availability.busySlots.forEach(slot => {
          console.log(`     - ${slot.start} a ${slot.end}`);
        });
      }
    } else {
      console.log('❌ Error conectando con Google Calendar:', availability.error);
      return;
    }
  } catch (error) {
    console.log('❌ Error en la prueba de conexión:', error.message);
    return;
  }

  console.log('');

  // 3. Probar creación de evento (opcional)
  const shouldCreateTestEvent = process.argv.includes('--create-test');
  
  if (shouldCreateTestEvent) {
    console.log('3️⃣  Creando evento de prueba...');
    
    const testAppointment = {
      service: 'Manicura Clásica (PRUEBA)',
      date: new Date().toISOString().split('T')[0],
      time: '14:30',
      duration: 60,
      customerName: 'Cliente de Prueba',
      customerPhone: '+34 666 777 888',
      customerEmail: 'prueba@ejemplo.com',
      notes: 'Este es un evento de prueba creado automáticamente. Puedes eliminarlo.'
    };

    try {
      const result = await calendarService.createEvent(testAppointment);
      
      if (result.success) {
        console.log('✅ Evento de prueba creado exitosamente');
        console.log(`   ID del evento: ${result.eventId}`);
        console.log(`   Enlace: ${result.eventLink}`);
        console.log('   ⚠️  Recuerda eliminar este evento de prueba del calendario');
      } else {
        console.log('❌ Error creando evento de prueba:', result.error);
      }
    } catch (error) {
      console.log('❌ Error en la creación del evento:', error.message);
    }
  } else {
    console.log('3️⃣  Para probar la creación de eventos, ejecuta:');
    console.log('   node test-calendar.js --create-test');
  }

  console.log('\n🎉 Prueba completada!');
  console.log('\n📝 Próximos pasos:');
  console.log('1. Prueba hacer una reserva desde el frontend');
  console.log('2. Verifica que aparece en el Google Calendar');
  console.log('3. Configura los horarios de trabajo en el código si es necesario');
}

// Ejecutar pruebas
testCalendarIntegration().catch(error => {
  console.error('💥 Error ejecutando pruebas:', error);
  process.exit(1);
});
