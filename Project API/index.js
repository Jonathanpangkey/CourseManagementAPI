const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

// Passport Config
require("./config/passport")(passport);

// Database Config
const db = require("./config/keys").mongoURI;

// Koneksi mongodb
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// json middleware
app.use(express.json());

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// menggunakan route
app.use("/admin", require("./routes/admin.js"));
app.use("/category", require("./routes/course_category"));
app.use("/courses", require("./routes/course"));
app.use("/users", require("./routes/users"));
app.use("/usercourse", require("./routes/user_course"));

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server running on  ${PORT}`));
