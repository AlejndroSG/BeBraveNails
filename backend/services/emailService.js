const nodemailer = require('nodemailer');
const moment = require('moment');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendAppointmentConfirmation(appointmentData) {
    try {
      const { service, date, time, duration, customerName, customerEmail, customerPhone } = appointmentData;
      
      const formattedDate = moment(date).format('dddd, D [de] MMMM [de] YYYY');
      const endTime = moment(`${time}`, 'HH:mm').add(duration, 'minutes').format('HH:mm');

      const customerEmailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: '✨ Confirmación de tu cita en Be Brave',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #FFE1E6 0%, #E1FFE6 100%); padding: 20px; border-radius: 15px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #FFE1E6, #FFE1F0); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                <span style="font-size: 24px; font-weight: bold; color: #374151;">BB</span>
              </div>
              <h1 style="color: #374151; margin: 0; font-size: 28px;">Be Brave</h1>
              <p style="color: #6B7280; margin: 5px 0 0 0;">Tu salón de uñas en Granada</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #374151; margin-top: 0; text-align: center;">¡Tu cita está confirmada! ✨</h2>
              
              <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #374151; margin-top: 0;">Detalles de tu cita:</h3>
                <p style="margin: 8px 0;"><strong>Servicio:</strong> ${service}</p>
                <p style="margin: 8px 0;"><strong>Fecha:</strong> ${formattedDate}</p>
                <p style="margin: 8px 0;"><strong>Hora:</strong> ${time} - ${endTime}</p>
                <p style="margin: 8px 0;"><strong>Cliente:</strong> ${customerName}</p>
              </div>
              
              <div style="background: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B;">
                <h4 style="color: #92400E; margin-top: 0;">Información importante:</h4>
                <ul style="color: #92400E; margin: 0; padding-left: 20px;">
                  <li>Por favor, llega 5 minutos antes de tu cita</li>
                  <li>Si necesitas cancelar, hazlo con al menos 24h de antelación</li>
                  <li>Trae las manos/pies limpios y sin esmalte previo</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #6B7280; margin-bottom: 15px;">¿Tienes alguna pregunta?</p>
                <p style="color: #374151; margin: 5px 0;">📞 ${process.env.BUSINESS_PHONE}</p>
                <p style="color: #374151; margin: 5px 0;">📧 ${process.env.BUSINESS_EMAIL}</p>
                <p style="color: #374151; margin: 5px 0;">📍 ${process.env.BUSINESS_ADDRESS}</p>
              </div>
            </div>
            
            <div style="text-align: center; color: #6B7280; font-size: 12px;">
              <p>¡Síguenos en Instagram <a href="https://instagram.com/be_brave.es" style="color: #EC4899;">@be_brave.es</a> para más inspiración!</p>
              <p>© 2024 Be Brave. Todos los derechos reservados.</p>
            </div>
          </div>
        `
      };

      // Email to business owner
      const businessEmailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.BUSINESS_EMAIL,
        subject: `Nueva cita reservada - ${service}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Nueva cita reservada</h2>
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px;">
              <h3>Detalles de la cita:</h3>
              <p><strong>Servicio:</strong> ${service}</p>
              <p><strong>Fecha:</strong> ${formattedDate}</p>
              <p><strong>Hora:</strong> ${time} - ${endTime}</p>
              <p><strong>Cliente:</strong> ${customerName}</p>
              <p><strong>Teléfono:</strong> ${customerPhone}</p>
              <p><strong>Email:</strong> ${customerEmail}</p>
            </div>
          </div>
        `
      };

      // Send emails
      const results = await Promise.allSettled([
        customerEmail ? this.transporter.sendMail(customerEmailOptions) : Promise.resolve(),
        this.transporter.sendMail(businessEmailOptions)
      ]);

      return {
        success: true,
        customerEmailSent: customerEmail ? results[0].status === 'fulfilled' : false,
        businessEmailSent: results[1].status === 'fulfilled',
        message: 'Confirmation emails sent successfully'
      };
    } catch (error) {
      console.error('Error sending confirmation emails:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to send confirmation emails'
      };
    }
  }

  async sendContactMessage(contactData) {
    try {
      const { name, email, phone, message } = contactData;

      const emailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.BUSINESS_EMAIL,
        subject: `Nuevo mensaje de contacto - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Nuevo mensaje de contacto</h2>
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px;">
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
              <p><strong>Mensaje:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
        `,
        replyTo: email
      };

      await this.transporter.sendMail(emailOptions);

      return {
        success: true,
        message: 'Contact message sent successfully'
      };
    } catch (error) {
      console.error('Error sending contact message:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to send contact message'
      };
    }
  }
}

module.exports = EmailService;
