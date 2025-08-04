# Be Brave - Salón de Uñas 💅

Una aplicación web moderna para el salón de uñas **Be Brave** en Granada, España. Permite a las clientas reservar citas online con integración completa a Google Calendar.

## 🌟 Características

- **Diseño Responsivo**: Optimizado para móviles y tablets
- **Colores Pastel**: Paleta de colores femenina y atractiva
- **Reserva de Citas**: Sistema completo de reservas con disponibilidad en tiempo real
- **Google Calendar**: Integración automática con Google Calendar
- **Notificaciones Email**: Confirmaciones automáticas por email
- **Servicios Completos**: Pestañas, manicura, pedicura, uñas de gel y acrílico

## 🛠️ Tecnologías

### Frontend
- **React.js 18** - Framework de JavaScript
- **TailwindCSS** - Framework de CSS
- **Framer Motion** - Animaciones
- **React Router** - Navegación
- **React DatePicker** - Selector de fechas
- **React Hot Toast** - Notificaciones
- **Axios** - Cliente HTTP

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Google APIs** - Integración con Google Calendar
- **Nodemailer** - Envío de emails
- **Moment.js** - Manejo de fechas

## 🚀 Instalación

### Prerrequisitos
- Node.js 16+ 
- npm o yarn
- Cuenta de Google con Calendar API habilitada

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configurar variables de entorno en .env
npm run dev
```

## ⚙️ Configuración

### Variables de Entorno (Backend)

Copia `.env.example` a `.env` y configura:

```env
# Server
PORT=5000
NODE_ENV=development

# Google Calendar API
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_REFRESH_TOKEN=tu_refresh_token
GOOGLE_CALENDAR_ID=tu_calendar_id

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_app_password

# Business Info
BUSINESS_NAME=Be Brave
BUSINESS_EMAIL=info@bebrave.es
BUSINESS_PHONE=+34 XXX XXX XXX
BUSINESS_ADDRESS=Granada, España

# CORS
FRONTEND_URL=http://localhost:3000
```

### Configuración de Google Calendar API

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la Calendar API
4. Crea credenciales OAuth 2.0
5. Obtén el refresh token usando el flujo OAuth

## 📱 Servicios Disponibles

- **Pestañas**
  - Extensiones de pestañas (2-3h)
  - Lifting de pestañas (1-1.5h)

- **Manicura**
  - Manicura clásica (45-60min)
  - Manicura semipermanente (1-1.5h)
  - Uñas de gel (1.5-2h)
  - Uñas de acrílico (2-2.5h)
  - Rellenos (1-1.5h)

- **Pedicura**
  - Pedicura semipermanente (1-1.5h)

- **Servicios Adicionales**
  - Retirada de uñas (30-45min)

## 🎨 Paleta de Colores

- **Pastel Pink**: `#FFE1E6`
- **Pastel Lavender**: `#E6E1FF`
- **Pastel Mint**: `#E1FFE6`
- **Pastel Peach**: `#FFE6E1`
- **Pastel Cream**: `#FFF9E1`
- **Pastel Rose**: `#FFE1F0`

## 📞 Contacto

- **Instagram**: [@be_brave.es](https://instagram.com/be_brave.es)
- **Email**: info@bebrave.es
- **Ubicación**: Granada, España

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- Diseño inspirado en las mejores prácticas de UX para salones de belleza
- Paleta de colores optimizada para el público femenino
- Integración completa con herramientas profesionales

---

**¡Atrévete a brillar con Be Brave! ✨**
