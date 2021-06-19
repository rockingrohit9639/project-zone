const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Conncection success");
  })
  .catch((err) => {
    console.log(err);
  });
