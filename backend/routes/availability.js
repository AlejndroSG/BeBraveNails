const express = require('express');
const router = express.Router();
const GoogleCalendarService = require('../services/googleCalendar');

const calendarService = new GoogleCalendarService();

// Get available time slots for a specific date
router.get('/', async (req, res) => {
  try {
    const { date, serviceId } = req.query;

    // Validation
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date parameter is required'
      });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    // Check if date is in the past
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Cannot check availability for past dates'
      });
    }

    // Check if date is too far in the future (e.g., 60 days)
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60);
    
    if (selectedDate > maxDate) {
      return res.status(400).json({
        success: false,
        message: 'Cannot check availability more than 60 days in advance'
      });
    }

    // Get availability from Google Calendar
    const availability = await calendarService.getAvailability(date);

    // Log for debugging
    console.log(`Availability check for ${date}:`, {
      success: availability.success,
      slotsCount: availability.availableSlots ? availability.availableSlots.length : 0,
      serviceId: serviceId || 'not specified'
    });

    res.json({
      success: true,
      data: {
        date,
        slots: availability.availableSlots || [],
        busySlots: availability.busySlots || [],
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching availability',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get availability for multiple dates (for calendar view)
router.post('/bulk', async (req, res) => {
  try {
    const { dates } = req.body;

    if (!dates || !Array.isArray(dates)) {
      return res.status(400).json({
        success: false,
        message: 'Dates array is required'
      });
    }

    if (dates.length > 31) {
      return res.status(400).json({
        success: false,
        message: 'Cannot check more than 31 dates at once'
      });
    }

    const availabilityPromises = dates.map(date => 
      calendarService.getAvailability(date)
        .then(result => ({ date, ...result }))
        .catch(error => ({ 
          date, 
          success: false, 
          error: error.message,
          availableSlots: [] 
        }))
    );

    const results = await Promise.all(availabilityPromises);

    res.json({
      success: true,
      data: results.map(result => ({
        date: result.date,
        availableSlots: result.availableSlots ? result.availableSlots.length : 0,
        hasAvailability: result.availableSlots ? result.availableSlots.some(slot => slot.available) : false,
        success: result.success
      }))
    });

  } catch (error) {
    console.error('Error fetching bulk availability:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching bulk availability',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get business hours and closed days
router.get('/business-hours', (req, res) => {
  try {
    const businessHours = {
      monday: { open: '09:00', close: '19:00', closed: false },
      tuesday: { open: '09:00', close: '19:00', closed: false },
      wednesday: { open: '09:00', close: '19:00', closed: false },
      thursday: { open: '09:00', close: '19:00', closed: false },
      friday: { open: '09:00', close: '19:00', closed: false },
      saturday: { open: '09:00', close: '17:00', closed: false },
      sunday: { closed: true }
    };

    const specialDates = {
      // Add special dates like holidays here
      // '2024-12-25': { closed: true, reason: 'Christmas Day' },
      // '2024-01-01': { closed: true, reason: 'New Year\'s Day' }
    };

    res.json({
      success: true,
      data: {
        businessHours,
        specialDates,
        timezone: 'Europe/Madrid',
        slotDuration: 30, // minutes
        bookingAdvance: {
          min: 1, // minimum 1 day in advance
          max: 60 // maximum 60 days in advance
        }
      }
    });

  } catch (error) {
    console.error('Error fetching business hours:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching business hours',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
