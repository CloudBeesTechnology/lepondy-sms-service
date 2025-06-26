// services/twilioService.js
const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    return message;
  } catch (error) {
    console.error('Twilio Error:', error.message);
    throw error;
  }
};

module.exports = { sendSMS };
  