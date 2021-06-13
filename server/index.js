const express = require("express");
const app = express(); // create express app
const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => {
  res.send("Hellow world Express Server 3001");
});

// start express server on port 3001
app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
);