const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxFhi4j6Q1oYwmk1olAzdwgMJ1jvHQobL8H5DUtRCMQp7pDvThS42N2YszXvDWPJGj6gw/exec';

app.use(express.static(path.join(__dirname)));

// ── PROXY ENDPOINT — handles lookup from FILE 2 ──
app.get('/lookup', async (req, res) => {
  try {
    const ref = req.query.ref;
    if (!ref) {
      return res.json({ status: 'error', message: 'No reference number provided' });
    }

    const url = `${APPS_SCRIPT_URL}?action=lookup&ref=${encodeURIComponent(ref)}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.json({ status: 'error', message: err.toString() });
  }
});

// Root → FILE 1
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// FILE 2
app.get('/application.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'application.html'));
});

app.listen(PORT, () => {
  console.log(`RBCCI server running on port ${PORT}`);
});
