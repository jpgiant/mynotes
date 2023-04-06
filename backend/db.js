const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/mynotes";

const connectToMongo = async () => {
  await mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected Successfully");
    })
    .catch((e) => console.log(e));
};

module.exports = connectToMongo;
