const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sendSMS } = require('./services/twilioService');
require('dotenv').config();

const app = express();

//middleware & cors
app.use(cors()); 
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//route
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

//server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Registered routes:'),
  console.log('POST /api/send-sms');
});