const express = require("express");
const app = express();
const port = process.env.port || 3001;

app.get("/", (req, res) => {
  res.send("hello World to Express app");
});


app.listen(port, () => {
  console.log(`server running on port ${port}`)
});