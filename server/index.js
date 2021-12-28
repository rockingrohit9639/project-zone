const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project Zone API",
      version: "1.0.0",
      description: "Project Zone API created with NodeJs & ExpressJs",
    },
    servers: [
      {
        url: "https://project-zone-server.azurewebsites.net",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

dotenv.config({ path: "config/config.env" });
const PORT = process.env.PORT || 8001;

const app = express(); // create express app
// app.use(morgan("tiny"));
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

require("./db/connection");

app.use(require("./routes/projectRoutes"));
app.use(require("./routes/authRoutes"));
app.use(require("./routes/ProtectedRoutes"));

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// start express server on port 3001 or process.env.PORT
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}/`)
);
