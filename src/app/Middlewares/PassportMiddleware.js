const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UserService = require('../Services/UsersService');
const mailUtil = require('../Utils/Traits/EmailTrait');
const whatsappUtil = require('../Utils/Traits/WhatsAppTrait');
const { LogContext } = require('twilio/lib/rest/serverless/v1/service/environment/log');

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const User = new UserService

passport.use('login', new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const { data: user } = await User.getUserByEmail(email);

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

      let user = await User.createUser(newUser);

      if (!user.success) {
        return done(user.message);
      }

      user = user.data

      await mailUtil.send('user', {user: newUser});
      await whatsappUtil.send('user', {user: newUser});
        
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const { data: user } = await User.getUserById(id);
  done(null, user);
})

module.exports = passport;
