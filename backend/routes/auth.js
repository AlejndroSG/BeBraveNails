const express = require('express');
const router = express.Router();
const GoogleCalendarService = require('../services/googleCalendar');

// Instancia del servicio de Google Calendar
const googleCalendar = new GoogleCalendarService();

/**
 * GET /auth/google
 * Redirige al usuario a la página de autorización de Google
 */
router.get('/google', (req, res) => {
  try {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Credenciales de Google no configuradas. Contacta al administrador.'
      });
    }

    const authUrl = googleCalendar.getAuthUrl();
    
    // En desarrollo, devolver la URL para que el usuario la copie
    if (process.env.NODE_ENV === 'development') {
      res.json({
        success: true,
        authUrl,
        message: 'Copia esta URL en tu navegador para autorizar la aplicación',
        instructions: [
          '1. Copia la URL proporcionada',
          '2. Pégala en tu navegador',
          '3. Inicia sesión con la cuenta de Google del calendario',
          '4. Autoriza la aplicación',
          '5. Copia el código de autorización que aparece',
          '6. Usa el endpoint /auth/callback con el código'
        ]
      });
    } else {
      // En producción, redirigir directamente
      res.redirect(authUrl);
    }
  } catch (error) {
    console.error('Error generando URL de autorización:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

/**
 * POST /auth/callback
 * Maneja el callback de Google OAuth y obtiene los tokens
 */
router.post('/callback', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Código de autorización requerido'
      });
    }

    const result = await googleCalendar.getTokensFromCode(code);

    if (result.success) {
      res.json({
        success: true,
        message: 'Autorización exitosa',
        refreshToken: result.refreshToken,
        instructions: [
          'IMPORTANTE: Guarda el siguiente refresh_token en tu archivo .env:',
          `GOOGLE_REFRESH_TOKEN=${result.refreshToken}`,
          '',
          'Después reinicia el servidor para que los cambios tengan efecto.'
        ]
      });
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Error en callback de autorización:', error);
    res.status(500).json({
      success: false,
      message: 'Error procesando autorización',
      error: error.message
    });
  }
});

/**
 * GET /auth/status
 * Verifica el estado de la autenticación con Google Calendar
 */
router.get('/status', (req, res) => {
  try {
    const isAuthenticated = googleCalendar.isAuthenticated();
    
    res.json({
      success: true,
      authenticated: isAuthenticated,
      message: isAuthenticated 
        ? 'Google Calendar está configurado correctamente' 
        : 'Google Calendar no está configurado',
      requiredEnvVars: {
        GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_REFRESH_TOKEN: !!process.env.GOOGLE_REFRESH_TOKEN,
        GOOGLE_CALENDAR_ID: !!process.env.GOOGLE_CALENDAR_ID
      }
    });
  } catch (error) {
    console.error('Error verificando estado de autenticación:', error);
    res.status(500).json({
      success: false,
      message: 'Error verificando estado',
      error: error.message
    });
  }
});

/**
 * POST /auth/test
 * Prueba la conexión con Google Calendar
 */
router.post('/test', async (req, res) => {
  try {
    if (!googleCalendar.isAuthenticated()) {
      return res.status(400).json({
        success: false,
        message: 'Google Calendar no está configurado. Completa la autorización primero.'
      });
    }

    // Probar obteniendo la disponibilidad de hoy
    const today = new Date().toISOString().split('T')[0];
    const result = await googleCalendar.getAvailability(today);

    if (result.success) {
      res.json({
        success: true,
        message: 'Conexión con Google Calendar exitosa',
        testResult: {
          date: today,
          busySlots: result.busySlots,
          availableSlots: result.availableSlots.length
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error conectando con Google Calendar',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error probando conexión:', error);
    res.status(500).json({
      success: false,
      message: 'Error en prueba de conexión',
      error: error.message
    });
  }
});

module.exports = router;
