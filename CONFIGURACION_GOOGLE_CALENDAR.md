# 🗓️ Configuración de Google Calendar para Be Brave Nails

Esta guía te explica paso a paso cómo configurar la integración real con Google Calendar.

## 📋 **Lo que necesitas de la clienta:**

1. **Email de Google** que usará para el calendario (ej: bebravenails@gmail.com)
2. **Acceso temporal** para autorizar la aplicación (puede ser en videollamada)
3. **Horarios del negocio** (días y horas de trabajo)

## 🔧 **Pasos para la configuración:**

### **1. Configurar Google Cloud Console**

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto:
   - Nombre: "Be Brave Nails Calendar"
   - ID: `be-brave-nails-calendar`
3. Habilita la Google Calendar API:
   - Ve a **APIs & Services > Library**
   - Busca "Google Calendar API"
   - Haz clic en **Enable**

### **2. Crear credenciales OAuth 2.0**

1. Ve a **APIs & Services > Credentials**
2. Haz clic en **Create Credentials > OAuth client ID**
3. Configura la pantalla de consentimiento OAuth:
   - Tipo de usuario: **External**
   - Nombre de la aplicación: "Be Brave Nails"
   - Email de soporte: tu email
   - Email de contacto: tu email
4. Crea las credenciales:
   - Tipo de aplicación: **Web application**
   - Nombre: "Be Brave Calendar Integration"
   - URIs de redirección autorizados:
     - `http://localhost:5000/auth/callback` (para desarrollo)
     - `https://tudominio.com/auth/callback` (para producción)

### **3. Configurar variables de entorno**

1. Copia el archivo `backend/env.example` a `backend/.env`
2. Completa las variables con los datos de Google Cloud:

```env
# Configuración de Google Calendar API
GOOGLE_CLIENT_ID=tu_client_id_de_google_cloud
GOOGLE_CLIENT_SECRET=tu_client_secret_de_google_cloud
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/callback
GOOGLE_CALENDAR_ID=primary
# GOOGLE_REFRESH_TOKEN se obtendrá en el siguiente paso
```

### **4. Obtener el Refresh Token (con la clienta)**

1. **Inicia el servidor backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Verifica el estado de la configuración:**
   - Ve a: `http://localhost:5000/api/auth/status`
   - Debe mostrar que CLIENT_ID y CLIENT_SECRET están configurados

3. **Inicia el proceso de autorización:**
   - Ve a: `http://localhost:5000/api/auth/google`
   - Copia la URL que aparece en la respuesta

4. **Autorización con la clienta:**
   - Comparte la URL con la clienta (por videollamada o presencialmente)
   - Ella debe:
     1. Abrir la URL en su navegador
     2. Iniciar sesión con su cuenta de Google
     3. Autorizar la aplicación
     4. Copiar el código que aparece en la pantalla

5. **Completar la autorización:**
   - Usa una herramienta como Postman o curl para enviar el código:
   ```bash
   curl -X POST http://localhost:5000/api/auth/callback \
     -H "Content-Type: application/json" \
     -d '{"code": "codigo_que_te_dio_la_clienta"}'
   ```

6. **Guardar el Refresh Token:**
   - La respuesta incluirá un `refresh_token`
   - Añádelo al archivo `.env`:
   ```env
   GOOGLE_REFRESH_TOKEN=el_refresh_token_obtenido
   ```

7. **Reiniciar el servidor:**
   ```bash
   npm run dev
   ```

### **5. Probar la integración**

1. **Verificar estado:**
   ```bash
   curl http://localhost:5000/api/auth/status
   ```
   - Todas las variables deben aparecer como `true`

2. **Probar conexión:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/test
   ```
   - Debe mostrar disponibilidad del día actual

3. **Probar reserva:**
   - Usa el frontend para hacer una reserva de prueba
   - Verifica que aparece en el Google Calendar de la clienta

## 🔒 **Seguridad:**

- **NUNCA** compartas las credenciales públicamente
- El `refresh_token` permite acceso permanente al calendario
- Guarda las credenciales de forma segura
- La clienta puede revocar el acceso desde su cuenta de Google

## 🚨 **Solución de problemas:**

### Error: "Calendar not found"
- Verifica que `GOOGLE_CALENDAR_ID` sea correcto
- Usa `primary` para el calendario principal

### Error: "Invalid credentials"
- Regenera el `refresh_token`
- Verifica que CLIENT_ID y CLIENT_SECRET sean correctos

### Error: "Access denied"
- La clienta debe autorizar de nuevo la aplicación
- Verifica que los scopes incluyan calendar y calendar.events

## 📞 **Contacto con la clienta:**

### **Mensaje para enviar a la clienta:**

---

**Hola [Nombre],**

Para completar la integración del calendario de reservas con tu Google Calendar, necesito que me ayudes con un proceso de autorización que toma solo 5 minutos.

**¿Qué necesito de ti?**
- Tu email de Google que usarás para el calendario
- 5 minutos para autorizar la aplicación (podemos hacerlo por videollamada)

**¿Qué conseguiremos?**
- Las reservas de la web aparecerán automáticamente en tu Google Calendar
- Podrás ver tu agenda desde cualquier dispositivo
- Los clientes recibirán confirmaciones automáticas

**¿Es seguro?**
- Solo doy permisos para crear/leer eventos del calendario
- Nunca tendré acceso a tu contraseña
- Puedes revocar el acceso cuando quieras desde tu cuenta Google

¿Cuándo te viene bien hacer la configuración?

Saludos,
[Tu nombre]

---

## ✅ **Checklist final:**

- [ ] Proyecto creado en Google Cloud Console
- [ ] Google Calendar API habilitada
- [ ] Credenciales OAuth 2.0 creadas
- [ ] Variables de entorno configuradas
- [ ] Autorización completada con la clienta
- [ ] Refresh token guardado
- [ ] Pruebas realizadas exitosamente
- [ ] Reserva de prueba creada y visible en Google Calendar

¡Una vez completados todos estos pasos, el sistema de reservas estará completamente integrado con Google Calendar!
