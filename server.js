// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { sendSMS } = require('./services/twilioService');
require('dotenv').config();

const app = express();

// Use body-parser for JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/send-sms', async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'Missing "to" or "message" field' });
  }

  try {
    const response = await sendSMS(to, message);
    res.status(200).json({ success: true, sid: response.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Twilio microservice listening on port ${PORT}`);
});
