const { google } = require('googleapis');
const moment = require('moment');

class GoogleCalendarService {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'urn:ietf:wg:oauth:2.0:oob'
    );

    this.oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    this.calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  }

  async createEvent(appointmentData) {
    try {
      const { service, date, time, duration, customerName, customerPhone, customerEmail, notes } = appointmentData;
      
      const startDateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toISOString();
      const endDateTime = moment(startDateTime).add(duration, 'minutes').toISOString();

      const event = {
        summary: `${service} - ${customerName}`,
        description: `
Cliente: ${customerName}
Teléfono: ${customerPhone}
Email: ${customerEmail || 'No proporcionado'}
Servicio: ${service}
Notas: ${notes || 'Ninguna'}

Reserva realizada a través de la web de Be Brave.
        `.trim(),
        start: {
          dateTime: startDateTime,
          timeZone: 'Europe/Madrid',
        },
        end: {
          dateTime: endDateTime,
          timeZone: 'Europe/Madrid',
        },
        attendees: customerEmail ? [{ email: customerEmail }] : [],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 day before
            { method: 'popup', minutes: 60 }, // 1 hour before
          ],
        },
        colorId: '10', // Green color for nail appointments
      };

      const response = await this.calendar.events.insert({
        calendarId: this.calendarId,
        resource: event,
      });

      return {
        success: true,
        eventId: response.data.id,
        eventLink: response.data.htmlLink,
        message: 'Appointment created successfully in Google Calendar'
      };
    } catch (error) {
      console.error('Error creating Google Calendar event:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to create appointment in Google Calendar'
      };
    }
  }

  async getAvailability(date) {
    try {
      const startOfDay = moment(date).startOf('day').toISOString();
      const endOfDay = moment(date).endOf('day').toISOString();

      const response = await this.calendar.events.list({
        calendarId: this.calendarId,
        timeMin: startOfDay,
        timeMax: endOfDay,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const events = response.data.items || [];
      const busySlots = events.map(event => {
        const start = moment(event.start.dateTime || event.start.date);
        const end = moment(event.end.dateTime || event.end.date);
        return {
          start: start.format('HH:mm'),
          end: end.format('HH:mm')
        };
      });

      return {
        success: true,
        busySlots,
        availableSlots: this.generateAvailableSlots(date, busySlots)
      };
    } catch (error) {
      console.error('Error fetching calendar availability:', error);
      return {
        success: false,
        error: error.message,
        availableSlots: this.generateDefaultSlots() // Fallback to default slots
      };
    }
  }

  generateAvailableSlots(date, busySlots = []) {
    const slots = [];
    const dayOfWeek = moment(date).day(); // 0 = Sunday, 6 = Saturday
    
    // Business hours
    let startHour = 9;
    let endHour = dayOfWeek === 6 ? 17 : 19; // Saturday until 17:00, other days until 19:00
    
    // Closed on Sundays
    if (dayOfWeek === 0) {
      return [];
    }

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Check if this slot conflicts with any busy slots
        const isAvailable = !busySlots.some(busySlot => {
          const slotTime = moment(`${date} ${timeString}`, 'YYYY-MM-DD HH:mm');
          const busyStart = moment(`${date} ${busySlot.start}`, 'YYYY-MM-DD HH:mm');
          const busyEnd = moment(`${date} ${busySlot.end}`, 'YYYY-MM-DD HH:mm');
          
          return slotTime.isBetween(busyStart, busyEnd, null, '[)');
        });

        slots.push({
          time: timeString,
          available: isAvailable
        });
      }
    }

    return slots;
  }

  generateDefaultSlots() {
    // Fallback slots when Google Calendar is not available
    const slots = [];
    for (let hour = 9; hour < 19; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          time: timeString,
          available: Math.random() > 0.3 // Simulate some unavailable slots
        });
      }
    }
    return slots;
  }

  async updateEvent(eventId, appointmentData) {
    try {
      const { service, date, time, duration, customerName, customerPhone, customerEmail, notes } = appointmentData;
      
      const startDateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toISOString();
      const endDateTime = moment(startDateTime).add(duration, 'minutes').toISOString();

      const event = {
        summary: `${service} - ${customerName}`,
        description: `
Cliente: ${customerName}
Teléfono: ${customerPhone}
Email: ${customerEmail || 'No proporcionado'}
Servicio: ${service}
Notas: ${notes || 'Ninguna'}

Reserva actualizada a través de la web de Be Brave.
        `.trim(),
        start: {
          dateTime: startDateTime,
          timeZone: 'Europe/Madrid',
        },
        end: {
          dateTime: endDateTime,
          timeZone: 'Europe/Madrid',
        },
      };

      const response = await this.calendar.events.update({
        calendarId: this.calendarId,
        eventId: eventId,
        resource: event,
      });

      return {
        success: true,
        eventId: response.data.id,
        message: 'Appointment updated successfully in Google Calendar'
      };
    } catch (error) {
      console.error('Error updating Google Calendar event:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to update appointment in Google Calendar'
      };
    }
  }

  async deleteEvent(eventId) {
    try {
      await this.calendar.events.delete({
        calendarId: this.calendarId,
        eventId: eventId,
      });

      return {
        success: true,
        message: 'Appointment deleted successfully from Google Calendar'
      };
    } catch (error) {
      console.error('Error deleting Google Calendar event:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete appointment from Google Calendar'
      };
    }
  }
}

module.exports = GoogleCalendarService;
