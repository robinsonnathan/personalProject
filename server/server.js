//Include Installed Libraries
const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      emailjs = require('emailjs-com')
      cors = require('cors'),
      config = require('./config.js');



//Start express on 'app'
const app = module.exports = express();

//App Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));



//Initialization
//Passport integrates with session
  app.use(passport.initialize());
  app.use(passport.session());
//emailjs
  emailjs.init(config.emailjs.userid)
//Serve static Files
  app.use(express.static(__dirname+'/../build'))

passport.use(new Auth0Strategy({
  domain:       config.auth0.domain,
  clientID:     config.auth0.clientID,
  clientSecret: config.auth0.clientSecret,
  callbackURL: 'http://dev.clawbuntu.com:3005/auth/callback'

},
  function(accessToken, refreshToken, extraParams, profile, done){
  return done(null, profile);
  }
));

//Throw user data on session
passport.serializeUser(function(user, done) {
  done(null, user);
})

//Swap out user data cookie for ID, store user data in memory instead
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


//Let's make some endpoints

app.get('/', (req, res) => {
  res.send("hello, welcome to clawbuntu!")
})


// Authentication
app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {successRedirect: 'http://dev.clawbuntu.com:3005'} )
);

app.get('/loginsuccess', (req, res) => {
  res.send("Successfully Logged In!");
})

//Where we can find our users data
app.get('/auth/me', (req, res) => {
  res.send(req.user)
})

//Contact Form
app.get('/formsubmit', (req, res) => {
    res.status(200).redirect("/")
  })

  //Send email
  emailjs.send(config.emailjs.serviceid, config.emailjs.templateid, {
    "name": req.query.name,
    "email": req.query.email,
    "phone": req.query.phone,
    "contactMethod": req.query.contactMethod
  })
  .then(
    function(response){
      console.log("success", response);
    },
    function(error){
      console.log("failed", error);
    }
  )





//Let our server listen on a port
app.listen(config.port, () => {console.log(`Listening on port: ${config.port}`)})
