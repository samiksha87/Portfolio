const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { name, email, subject, message } = req.body;
  const entry = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n---\n`;

  fs.appendFile('messages.txt', entry, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Message saved. Thank you!');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
