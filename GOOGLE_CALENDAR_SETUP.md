# Configuración de Google Calendar API

Esta guía te ayudará a configurar la integración con Google Calendar para el sistema de reservas de Be Brave.

## 1. Crear un Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Asegúrate de que el proyecto esté seleccionado

## 2. Habilitar la Calendar API

1. En el menú lateral, ve a **APIs & Services** > **Library**
2. Busca "Google Calendar API"
3. Haz clic en "Google Calendar API" y luego en **Enable**

## 3. Crear Credenciales OAuth 2.0

1. Ve a **APIs & Services** > **Credentials**
2. Haz clic en **Create Credentials** > **OAuth client ID**
3. Si es la primera vez, configura la pantalla de consentimiento OAuth:
   - Selecciona **External** (para uso público) o **Internal** (solo para tu organización)
   - Completa la información requerida:
     - App name: "Be Brave Nails"
     - User support email: tu email
     - Developer contact: tu email
4. Después de configurar la pantalla de consentimiento, crea las credenciales:
   - Application type: **Web application**
   - Name: "Be Brave Calendar Integration"
   - Authorized redirect URIs: `http://localhost:5000/auth/callback` (para desarrollo)

## 4. Obtener el Refresh Token

### Opción A: Usando OAuth 2.0 Playground

1. Ve a [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Haz clic en el ⚙️ (configuración) en la esquina superior derecha
3. Marca "Use your own OAuth credentials"
4. Ingresa tu **Client ID** y **Client secret**
5. En el lado izquierdo, busca "Calendar API v3"
6. Selecciona `https://www.googleapis.com/auth/calendar`
7. Haz clic en **Authorize APIs**
8. Autoriza el acceso a tu cuenta de Google
9. Haz clic en **Exchange authorization code for tokens**
10. Copia el **refresh_token** que aparece

### Opción B: Usando código Node.js

```javascript
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  'TU_CLIENT_ID',
  'TU_CLIENT_SECRET',
  'http://localhost:5000/auth/callback'
);

// Genera la URL de autorización
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/calendar'],
});

console.log('Visita esta URL:', authUrl);

// Después de autorizar, usa el código para obtener tokens
// oauth2Client.getToken(code, (err, token) => {
//   if (err) return console.error('Error:', err);
//   console.log('Refresh Token:', token.refresh_token);
// });
```

## 5. Obtener el Calendar ID

1. Ve a [Google Calendar](https://calendar.google.com/)
2. En el lado izquierdo, busca el calendario que quieres usar (o crea uno nuevo)
3. Haz clic en los tres puntos junto al nombre del calendario
4. Selecciona **Settings and sharing**
5. Desplázate hacia abajo hasta **Calendar ID**
6. Copia el Calendar ID (generalmente es tu email o algo como `abc123@group.calendar.google.com`)

## 6. Configurar Variables de Entorno

En tu archivo `.env` del backend, agrega:

```env
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_REFRESH_TOKEN=tu_refresh_token_aqui
GOOGLE_CALENDAR_ID=tu_calendar_id_aqui
```

## 7. Verificar la Configuración

Ejecuta el backend y verifica que aparezca:
```
📅 Google Calendar integration: Configured
```

## Permisos del Calendar

Asegúrate de que el calendario tenga los permisos correctos:

1. Ve a la configuración del calendario en Google Calendar
2. En **Share with specific people**, agrega el email de servicio si usas una cuenta de servicio
3. O asegúrate de que el calendario sea accesible con la cuenta OAuth

## Solución de Problemas

### Error: "Calendar not found"
- Verifica que el `GOOGLE_CALENDAR_ID` sea correcto
- Asegúrate de que la cuenta OAuth tenga acceso al calendario

### Error: "Invalid credentials"
- Verifica que `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` sean correctos
- Regenera el refresh token si es necesario

### Error: "Access denied"
- Asegúrate de haber autorizado el scope `https://www.googleapis.com/auth/calendar`
- Verifica que el refresh token no haya expirado

## Notas de Seguridad

- **NUNCA** compartas tus credenciales públicamente
- Usa variables de entorno para almacenar información sensible
- Considera usar cuentas de servicio para aplicaciones en producción
- Revisa regularmente los permisos de tu aplicación en Google

## Límites de la API

- Google Calendar API tiene límites de cuota
- Para uso normal de un salón de belleza, los límites gratuitos son suficientes
- Monitorea el uso en Google Cloud Console si es necesario
