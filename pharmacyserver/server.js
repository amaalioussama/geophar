
const express = require('express');
const cors = require('cors');
const app = express();
const pharmaciesData = require('./pharmacies.json');

app.use(cors()); 
app.use(express.json()); 

app.get('/:city/:street', (req, res) => {
  const { city, street } = req.params;
  const cityPharmacies = pharmaciesData[city];
  if (!cityPharmacies) {
    return res.status(404).json({ error: 'City not found' });
  }
  
  // Filter pharmacies based on street
  const pharmaciesInStreet = cityPharmacies.filter(pharmacy => {
    
    const regex = new RegExp(street, 'i');
    return regex.test(pharmacy.address);
  });
  
  if (pharmaciesInStreet.length === 0) {
    return res.status(404).json({ error: 'No pharmacies found on the specified street' });
  }

  res.json(pharmaciesInStreet);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
