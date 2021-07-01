const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

dotenv.config({ path: "config/config.env" });
const PORT = process.env.PORT || 3001;

const app = express(); // create express app
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

require("./db/connection");

app.use(require("./routes/projectRoutes"));
app.use(require("./routes/authRoutes"));
app.use(require("./routes/ProtectedRoutes"));

// start express server on port 3001
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}/`.green.bold)
);
