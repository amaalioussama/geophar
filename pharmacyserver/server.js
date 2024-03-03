const express = require("express");
const cors = require("cors");
const fs = require("fs");
const session = require("express-session");
const app = express();
const pharmaciesData = require("./pharmacies.json");
const usersData = require("./userdata.json");

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "hahah",
    resave: false,
    saveUninitialized: false,
  })
);

const requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: " User not logged in" });
  }
};

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = usersData.user.find((user) => user.email === email);

  if (!user || user.password !== password) {
    res.status(401).json({ message: "Invalid credentials" });
  } else {

    req.session.user = user;
    res.status(200).json({ message: "Login successful" });
  }
});


app.post("/localsearch", requireLogin, (req, res) => {
  res.status(200).json({ message: "Access to localsearch granted" });
});

app.get("/:city/:street", (req, res) => {
  const { city, street } = req.params;
  const cityPharmacies = pharmaciesData[city];
  if (!cityPharmacies) {
    return res.status(404).json({ error: "City not found" });
  }

  const pharmaciesInStreet = cityPharmacies.filter((pharmacy) => {
    const regex = new RegExp(street, "i");
    return regex.test(pharmacy.address);
  });

  if (pharmaciesInStreet.length === 0) {
    return res
      .status(404)
      .json({ error: "No pharmacies found on the specified street" });
  }

  res.json(pharmaciesInStreet);
});

app.listen(3001, () => {
  console.log("Connected at http://localhost:3001");
});
