const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/users.route");
const req = require("express/lib/request");

const app = express();
app.use(express.json()); // for parsing application/json - important to take json input as object
app.use(cors());
dotenv.config();
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(
  () => {
    console.log("Mongo Cloud Database Connected Successfully!");
  },
  (err) => {
    console.log("Error: ", err);
  }
);

// Routes
app.use("/api/user", userRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
