const express = require('express');
const cors = require('cors');
const app = express();
const pharmacies = require('./pharmacies.json');

app.use(cors()); // Enable CORS for all routes

app.get('/:city', (req, res) => {
  const { city } = req.params;
  const cityPharmacies = pharmacies[city];
  if (cityPharmacies) {
    res.json(cityPharmacies);
  } else {
    res.status(404).json({ error: 'City not found' });
  }
});

app.listen(3001, () => {
    console.log("Connected at http://localhost:3001");
  });
