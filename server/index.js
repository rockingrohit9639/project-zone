const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

dotenv.config({ path: 'config/config.env' });
const app = express(); // create express app
app.use(morgan('tiny'));
app.use(cors())
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 3001;
app.get('/', (req, res) =>
{
  res.send('Hellow world Express Server 3001');
});

// start express server on port 3001
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}/`.green.bold)
);
