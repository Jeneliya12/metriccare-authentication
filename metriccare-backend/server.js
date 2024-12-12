const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = [];

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ name, email, password });
  res.status(201).json({ message: "Signup successful!" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.status(200).json({ message: "Login successful!", user });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
