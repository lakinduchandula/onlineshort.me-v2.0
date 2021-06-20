const path = require("path");
const fs = require("fs");

//*** import third party packages
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

//** import routes
const urlRoutes = require("./routes/url");
const userRoutes = require("./routes/user");

// initialize the express app
const app = express();

// constants
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  "mongodb+srv://onlineshort-me:6rEkmXrzYVSRq5Nf@cluster1.lkpxe.mongodb.net/shorturl?retryWrites=true&w=majority";

const accessLogStram = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(helmet());
app.use(morgan("combined", { stream: accessLogStram }));

app.use(userRoutes);
app.use(urlRoutes);

app.use((error, req, res, next) => {
  // console.log(error)
  res.render("./error.ejs");
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(result => {
    console.log("Connected to MongoDB Atlas!");

    // listen for every incoming request
    app.listen(PORT, () => console.log("onlineshort.me Started!"));
  })
  .catch(err => {
    console.error(err);
  });
