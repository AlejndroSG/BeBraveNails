const express = require('express');
const router = express.Router();
const EmailService = require('../services/emailService');

const emailService = new EmailService();

// Send contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, message'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Message length validation
    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long'
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be less than 1000 characters'
      });
    }

    // Prepare contact data
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      message: message.trim()
    };

    // Send email
    const emailResult = await emailService.sendContactMessage(contactData);

    // Log the contact message for debugging
    console.log('New contact message:', {
      name: contactData.name,
      email: contactData.email,
      hasPhone: !!contactData.phone,
      messageLength: contactData.message.length,
      emailSent: emailResult.success
    });

    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send your message. Please try again or contact us directly.'
      });
    }

    res.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!',
      data: {
        timestamp: new Date().toISOString(),
        emailSent: emailResult.success
      }
    });

  } catch (error) {
    console.error('Error processing contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while processing your message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get contact information
router.get('/info', (req, res) => {
  try {
    const contactInfo = {
      businessName: process.env.BUSINESS_NAME || 'Be Brave',
      email: process.env.BUSINESS_EMAIL || 'info@bebrave.es',
      phone: process.env.BUSINESS_PHONE || '+34 XXX XXX XXX',
      address: process.env.BUSINESS_ADDRESS || 'Granada, España',
      instagram: '@be_brave.es',
      businessHours: {
        monday: '9:00 - 19:00',
        tuesday: '9:00 - 19:00',
        wednesday: '9:00 - 19:00',
        thursday: '9:00 - 19:00',
        friday: '9:00 - 19:00',
        saturday: '9:00 - 17:00',
        sunday: 'Cerrado'
      },
      services: [
        'Extensiones de Pestañas',
        'Lifting de Pestañas',
        'Manicura Clásica',
        'Manicura Semipermanente',
        'Uñas de Gel',
        'Uñas de Acrílico',
        'Relleno de Gel y Acrílico',
        'Retirada de Uñas',
        'Pedicura Semipermanente'
      ]
    };

    res.json({
      success: true,
      data: contactInfo
    });

  } catch (error) {
    console.error('Error fetching contact info:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching contact information',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Newsletter subscription (future feature)
router.post('/newsletter', async (req, res) => {
  try {
    const { email, name } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // For now, just log the subscription
    console.log('Newsletter subscription:', {
      email: email.trim().toLowerCase(),
      name: name ? name.trim() : null,
      timestamp: new Date().toISOString()
    });

    // TODO: Implement newsletter service (e.g., Mailchimp, SendGrid)
    
    res.json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      data: {
        email: email.trim().toLowerCase(),
        subscribed: true,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while processing subscription',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
