const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load Admin model/skema
const Admin = require("../models/Admin");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // Mengecek user
          const user = await Admin.findOne({ email });

          if (!user) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }

          // Mengecek password
          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await Admin.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
