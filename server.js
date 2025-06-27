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
  const { to, message, title } = req.body;

  if (!Array.isArray(to) || !message || !title) {
    return res.status(400).json({ error: '"to", "message", and "title" fields are required' });
  }
 const results = [];

  for (const number of to) {
    try {
      const response = await sendSMS(number, `${title}: ${message}`);
      results.push({ to: number, status: 'success', sid: response.sid });
    } catch (error) {
      results.push({ to: number, status: 'failed', error: error.message });
    }
  }

  res.status(207).json({ success: true, results }); // 207 = Multi-Status
});

//server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Registered routes:'),
  console.log('POST /api/send-sms');
});