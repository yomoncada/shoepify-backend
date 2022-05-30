const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { UsersDao } = require('../model/daos/index');
const mailUtil = require('../utils/mail.utils');
const whatsappUtil = require('../utils/whatsapp.utils');

const User = new UsersDao();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

passport.use('login', new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await User.getByEmail(email);

      if (!isValidPassword(user, password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use('register', new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
  async (req, email, password, done) => {
    try {
      const newUser = {
        email: email,
        password: createHash(password),
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        avatar: req.file,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const user = await User.create(newUser);

      if (user) {
        await mailUtil.send('user', {user: newUser});
        await whatsappUtil.send('user', {user: newUser});
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.get(id);
  done(null, user);
})

module.exports = passport;
