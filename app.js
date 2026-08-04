const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const sampleItems = JSON.parse(
  fs.readFileSync('./data/items.json', 'utf8')
);

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} — ${new Date().toLocaleTimeString()}`);
  next();
}

app.use(logger); // register BEFORE your routes

// Phase B - Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/about', (req, res) => {
  res.send('About this server');
});

app.get('/users/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

app.post('/api/users', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

app.get('/contact', (req, res) => {
  res.send('Contact us anytime.');
});

app.get('/gallery', (req, res) => {

  const cards = sampleItems.map(item => `
    <div class="bg-white rounded-lg shadow-lg p-6 mb-4 max-w-md mx-auto">
      <h2 class="text-xl font-bold text-indigo-800">${item.title}</h2>
      <p class="mt-2 text-gray-600">${item.note}</p>
    </div>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="/output.css">
      </head>
      <body class="min-h-screen bg-gray-100 py-8">
        ${cards}
      </body>
    </html>
  `);

});

app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="/output.css">
      </head>
      <body class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-red-700">404</h1>
          <p class="mt-2 text-gray-600">That page does not exist.</p>
          <a href="/gallery" class="mt-4 inline-block text-blue-600 underline">
            Back to the gallery
          </a>
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});