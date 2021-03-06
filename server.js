const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoutes = require("./src/routes/user");
var bodyParser = require("body-parser");
const productRoutes = require("./src/routes/products");
const userCartRoutes = require("./src/routes/userCart");
const useremailRoutes = require("./src/routes/userEmail");
const path = require("path");

require("dotenv").config();
const app = express();

app.use(morgan("tiny"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const mongoDbUri = mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb+srv://kelar:${process.env.DB_PASSWORD}@store-o4whr.mongodb.net/store?retryWrites=true&w=majority
`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

mongoose.connection.on("connected", () => {
  console.log("mongoose is connected");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/userCart", userCartRoutes);
app.use("/api/sendEmail", useremailRoutes);
//for heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message
//     }
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

module.exports = app;
