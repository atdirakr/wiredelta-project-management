// vendor library
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport("SMTP",{
    service: 'Gmail',
    auth: {
        user: "papaathira@gmail.com",
        pass: "SecureMe"
    }
});
console.log('SMTP Configured');
// custom library
// model
var Model = require('./model');

// index
var index = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/signin');
   } else {

      var user = req.user;
      
      if(user !== undefined) {
         user = user.toJSON();
      }

      //check this user is admin or not
      if(user.isAdmin==1){
        new Model.Project().fetchAll().then(function(project_info) {
          var data=project_info.toJSON();
          res.render('admin',{title:'Admin area',data: {user:user,project :data, moment: moment}});
        });
      }else{
        new Model.Project().fetchAll({userid: user.userId}).then(function(project_info) {
          var project_data=project_info.toJSON();
          res.render('index', {title: 'Home', data: {user:user,project :project_data,moment: moment}});
        });
      }
   }
};

// sign in
// GET
var signIn = function(req, res, next) {
   if(req.isAuthenticated()) res.redirect('/');
   res.render('signin', {title: 'Sign In'});
};

// sign in
// POST
var signInPost = function(req, res, next) {
   //console.log("this is triggered");
   passport.authenticate('local', { successRedirect: '/',
                          failureRedirect: '/signin'}, function(err, user, info) {
      if(err) {
         return res.render('signin', {title: 'Sign In', errorMessage: err.message});
      } 

      if(!user) {
         return res.render('signin', {title: 'Sign In', errorMessage: info.message});
      }
      return req.logIn(user, function(err) {
         if(err) {
            return res.render('signin', {title: 'Sign In', errorMessage: err.message});
         } else {
            return res.redirect('/');
         }
      });
   })(req, res, next);
};

// sign up
// GET
var signUp = function(req, res, next) {
   if(req.isAuthenticated()) {
      res.redirect('/');
   } else {
      res.render('signup', {title: 'Sign Up'});
   }
};

// sign up
// POST
var signUpPost = function(req, res, next) {
   var user = req.body;
   //console.log(req.body);
   var usernamePromise = null;
   usernamePromise = new Model.User({username: user.username}).fetch();

   return usernamePromise.then(function(model) {
      if(model) {
         res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
      } else {
         
         var password = user.password;
         var hash = bcrypt.hashSync(password);

         var signUpUser = new Model.User({username:user.username,email:user.useremail,password:hash});

          signUpUser.save().then(function(model) {
            console.log("User details : ", model.attributes.userId);
            var message = {
              from : 'Athira <papaathira@gmail.com>',
              to : user.useremail,
              subject : 'User Registeration Email',
              text : 'Hello',
              html : '<p>Your account was created successfully. Please <a href=http://localhost:3124/activate/'+model.attributes.userId+'>click here</a> to activate your account</p>'
            };
            console.log('Sending Mail');
            transporter.sendMail(message, function(error){
              if(error){
                  console.log('Error occured');
                  console.log(error.message);
                  return;
              }
              console.log('Message sent successfully!');
            });
            // sign in the newly registered user
            signInPost(req, res, next);
         });	
      }
   });
};
// Activate Acount

var activateUser = function(req, res, next) {
  var activateUser = new Model.User({userId:req.params.id,active: 1});
    activateUser.save().then(function(model) {
      return res.redirect('/');
    });
};

// new project
// GET
var newProject = function(req, res, next) {
  if(req.isAuthenticated()){
    res.render('newproject', {title: 'Create Project',userid:req.params.id});
   }else{
     res.redirect('/');
   }
};

// POST
var newProjectPost = function(req, res, next) {
  if(req.isAuthenticated()){
    var project = req.body;
    var newProject = new Model.Project({name:project.name,description:project.description,start_date:project.start_date,end_date:project.end_date,userid: project.userid});
    newProject.save().then(function(model) {
      return res.redirect('/');
    });
  }else{
    res.redirect('/');
  }
};

// GET
var deleteproject = function(req, res, next) {
  if(req.isAuthenticated()) {
    new Model.Project({id: req.params.id})
    .destroy()
    .then(function(model) {
      return res.redirect('/');
    });
  } 
};

var editproject = function(req, res, next) {
  if(req.isAuthenticated()) {
    var projectPromise = null;
    console.log("Id :",req.params.id);
    projectPromise = new Model.Project({id: req.params.id}).fetch();
    return projectPromise.then(function(model) {
      console.log(model.attributes.name);
      res.render('editproject', {title: 'Edit Project', data: model,moment: moment});
    });
  } 
};

// POST
var editprojectPost = function(req, res, next) {
  if(req.isAuthenticated()){
    var project = req.body;
    var newProject = new Model.Project({name:project.name,description:project.description,start_date:project.start_date,end_date:project.end_date,id: project.id});
    newProject.save().then(function(model) {
      return res.redirect('/');
    });
  }else{
    res.redirect('/');
  }
};

var delete_user=function (req, res) {
   if(req.isAuthenticated()) {
    new Model.User({userId: req.params.id})
  .destroy()
  .then(function(model) {
    req.logout();
      res.redirect('/signin');
  });  
   }
    
  };


// sign out
var signOut = function(req, res, next) {
   if(!req.isAuthenticated()) {
      notFound404(req, res, next);
   } else {
      req.logout();
      res.redirect('/signin');
   }
};

// 404 not found
var notFound404 = function(req, res, next) {
   res.status(404);
   res.render('404', {title: '404 Not Found'});
};


// export functions
/**************************************/
// index
module.exports.index = index;

// sigin in
// GET
module.exports.signIn = signIn;
// POST
module.exports.signInPost = signInPost;

// sign up
// GET
module.exports.signUp = signUp;
// POST
module.exports.signUpPost = signUpPost;
module.exports.activateUser = activateUser;

// Project
module.exports.newProject = newProject;
module.exports.newProjectPost = newProjectPost;
module.exports.deleteproject = deleteproject;
module.exports.editproject = editproject;
module.exports.editprojectPost = editprojectPost;

// sign out
module.exports.signOut = signOut;


//delete
module.exports.delete_user=delete_user;

// 404 not found
module.exports.notFound404 = notFound404;