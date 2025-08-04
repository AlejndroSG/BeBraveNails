const express = require('express');
const router = express.Router();
const GoogleCalendarService = require('../services/googleCalendar');
const EmailService = require('../services/emailService');
const { services } = require('../config/services');

const calendarService = new GoogleCalendarService();
const emailService = new EmailService();

// Create new appointment
router.post('/', async (req, res) => {
  try {
    const { service, date, time, name, phone, email, notes } = req.body;

    // Validation
    if (!service || !date || !time || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: service, date, time, name, phone'
      });
    }

    if (!services[service]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service selected'
      });
    }

    // Prepare appointment data
    const appointmentData = {
      service: services[service].name,
      date,
      time,
      duration: services[service].duration,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      notes
    };

    // Create event in Google Calendar
    const calendarResult = await calendarService.createEvent(appointmentData);
    
    if (!calendarResult.success) {
      console.error('Calendar creation failed:', calendarResult.error);
      // Continue with booking even if calendar fails
    }

    // Send confirmation emails
    const emailResult = await emailService.sendAppointmentConfirmation(appointmentData);
    
    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      // Continue with booking even if email fails
    }

    // Log the booking for debugging
    console.log('New booking created:', {
      service: services[service].name,
      date,
      time,
      customer: name,
      calendarSuccess: calendarResult.success,
      emailSuccess: emailResult.success
    });

    res.json({
      success: true,
      message: 'Appointment booked successfully',
      data: {
        appointmentId: calendarResult.eventId || `booking_${Date.now()}`,
        service: services[service].name,
        date,
        time,
        duration: services[service].duration,
        calendarCreated: calendarResult.success,
        emailSent: emailResult.success
      }
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all bookings (for admin use)
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date parameter is required'
      });
    }

    const availability = await calendarService.getAvailability(date);
    
    res.json({
      success: true,
      data: {
        date,
        busySlots: availability.busySlots || [],
        totalBookings: availability.busySlots ? availability.busySlots.length : 0
      }
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update appointment
router.put('/:appointmentId', async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { service, date, time, name, phone, email, notes } = req.body;

    // Validation
    if (!service || !date || !time || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    if (!services[service]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service selected'
      });
    }

    // Prepare appointment data
    const appointmentData = {
      service: services[service].name,
      date,
      time,
      duration: services[service].duration,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      notes
    };

    // Update event in Google Calendar
    const calendarResult = await calendarService.updateEvent(appointmentId, appointmentData);

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      data: {
        appointmentId,
        calendarUpdated: calendarResult.success
      }
    });

  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Cancel appointment
router.delete('/:appointmentId', async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Delete event from Google Calendar
    const calendarResult = await calendarService.deleteEvent(appointmentId);

    res.json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: {
        appointmentId,
        calendarDeleted: calendarResult.success
      }
    });

  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while cancelling booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
