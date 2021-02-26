const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");

const config = require("./config/key");
const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/shortenUrl', require('./routes/shrink'));

const port = config.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});