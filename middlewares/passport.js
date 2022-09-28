const User = require("../entities/user.entity");
require('dotenv').config();

const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

module.exports = passport => {
  console.log("hitting token")
  passport.use(
    new Strategy(opts, async (payload, done) => {
      console.log("payload",payload)
      await User.findById(payload.user_id)
        .then(user => {
          console.log("get user from token", user)
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          return done(null, false);
        });
    })
  );
};
