
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var flash = require('connect-flash');
var session = require('express-session');
var path = require('path');
var expressValidator = require('express-validator');

// Init app
var app = express();

 
var index = require('./routes/index');
var firstpass = require('./routes/firstpass');
var dashboard = require('./routes/dashboard');
var imsitemap = require('./routes/imsitemap');
var imsearch = require('./routes/imsearch');
var home = require('./routes/home');
var allroutes = require('./routes/allroutes');


//View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    
    return {
      'param' : formParam,
      'message'   : msg,
      'value' : value
    };
  }
}));


// set static folders
app.use(express.static(path.join(__dirname + '/public')));

//connect flash
app.use(flash());

//Express session
app.use(session({
secret: 'secret',
saveUnitialized: true,
resave: true
}));

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.use('/', index);
app.use('/dashboard', dashboard);
app.use('/firstpass', firstpass);
app.use('/imsitemap', imsitemap);
app.use('/imsearch', imsearch);
app.use('/home', home);
app.use('/allroutes',allroutes);


app.get('/history', function(req,res) {

});


//shows the message when wrong url searched
//app.get('*', function(req ,res){
//          res.send("<h1> 404 :Page Not Fond ! <\h1 >");
//


var server = app.listen(3000, function() {
    console.log('Listening on port 3000');
});
