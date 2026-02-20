const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/application.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'application.html'));
});

app.listen(PORT, () => {
  console.log(`RBCCI server running on port ${PORT}`);
});
