//Include Installed Libraries
const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      config = require('./config.js');


//Start express on 'app'
const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));

console.log(config.auth0.domain)
console.log(config.auth0.clientID)
console.log(config.auth0.clientSecret)
console.log(config.auth0.callbackURL)

//Init passport
app.use(passport.initialize());
//Passport hijacks session
app.use(passport.session());

passport.use(new Auth0Strategy({
  domain:       config.auth0.domain,
  clientID:     config.auth0.clientID,
  clientSecret: config.auth0.clientSecret,
  callbackURL: 'http://localhost:3000/auth/callback'

},
  function(accessToken, refreshToken, extraParams, profile, done){
  console.log("logged in: ", profile.displayName);
  done(null, {id: 3, username: "joe", email: "joe@blow.joeblow" });
  }
));

//User stuffs
passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


//Let's make some endpoints

app.get('/', (req, res) => {
  res.send("hello, welcome to a login")
})

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {successRedirect: '/loginsuccess'} )
);

app.get('/loginsuccess', (req, res) => {
  res.send("Successfully Logged In!");
})



//Let our server listen on a port
app.listen(config.port, () => {console.log(`Listening on port: ${config.port}`)})
