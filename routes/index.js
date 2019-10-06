var express = require('express');
var router = express.Router();
var request = require('request');
var cookieParser = require('cookie-parser');

var tokn;



router.get('/',function(req,res, next) {
res.render('index',{display_error: 'out of code'});
});

router.post('/',function(req,res, next) {
  var name = req.body.email;
  var password = req.body.pass;

  // Validation
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('pass', 'Password is required').notEmpty();
  req.flash('error_msg','You are not logged in')

  var errors = req.validationErrors();

    if(errors){

      console.log(errors);
      
      res.render('index',{
        display_error: JSON.stringify(errors)
      });
    } else {


            var myJSONObject = {
              'email': name,
              'password': password,
              'admin':true

             };

console.log(myJSONObject);

          request({
              url: "http://angelthom.ddns.net/api/authenticate",
              method: "POST",
              json: true,   // <--Very important!!!
              body: myJSONObject
          }, function (error, response, body){
              if(body.success)
              {
                 res.render('home');
         

                 //make call for allroutes page
         router.get('/allroutes',function(req,res, next){
              //make the allschollRoutes api call
                 var routeJSONobj = {
                        'x-access-token' : body.token
                  };

                  console.log(routeJSONobj);

         request({
                   url : "http://angelthom.ddns.net:80/api/allschoolroutes",
                   method : "GET",
                   json : true,
                   headers: routeJSONobj
                 }, function(error , response , body){ 
                 //routeJSONobj = body;                    
                     res.render('allroutes', body);
                    
                        console.log(body.id);
                                              
                 });//end

           }); //end of allrooutes headers

              }
              else
              {
               console.log(body.message);
               res.render('index',{
               display_error: body.message
      });

              }
          });

         }  

});

 

module.exports = router;
