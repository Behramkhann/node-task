const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./routes/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Origin",
    "Orign",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization"
  );

  if (req.method === "OPTION") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api", userRoutes);

module.exports = app;
