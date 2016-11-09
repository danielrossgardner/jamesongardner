const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      config = require('./config.js'),
      cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./public'));

/// DATABASE ///
///////////////-------------------------------------------------------\
var connectionString = "postgres://postgres:" + config.pgresPwrd + "@localhost:5432/jamesonart";
var massiveInstance = massive.connectSync({connectionString: connectionString});
app.set('db', massiveInstance);

const db = app.get('db');
///////////////-------------------------------------------------------/

//// IMAGES ////
///////////////-------------------------------------------------------\
app.get('/traditional', function(req, res) {
  db.get_traditional(function(err,success){
    res.status(200).json(success);
  })
});

app.get('/dimensional', function(req, res) {
  db.get_dimensional(function(err,success){
    res.status(200).json(success);
  })
});

app.get('/images', function(req, res) {
  db.get_images(function(err,success){
    res.status(200).json(success);
  })
});

app.post('/image',function(req,res){
  db.upload_image([req.body.type,req.body.title,req.body.description,req.body.imageUrl],function(err,success){
    if (err){
      console.log(err);
      res.sendStatus('500')
    }
    else {
      res.sendStatus('201');
    }
  })
});

app.put('/image/title/:id',function(req,res){
  db.update_image_title([req.params.id,req.body.title],function(err,success){
    if (err){
      console.log(err);
      res.sendStatus('500')
    }
    else {
      res.sendStatus('200');
    }
  })
});

app.put('/image/type/:id',function(req,res){
  db.update_image_type([req.params.id,req.body.type],function(err,success){
    if (err){
      console.log(err);
      res.sendStatus('500')
    }
    else {
      res.sendStatus('200');
    }
  })
});

app.put('/image/description/:id',function(req,res){
  db.update_image_description([req.params.id,req.body.description],function(err,success){
    if (err){
      console.log(err);
      res.sendStatus('500')
    }
    else {
      res.sendStatus('200');
    }
  })
});

app.delete('/image/:id',function(req,res){
  db.delete_image([req.params.id],function(err,success){
    if (err){
      console.log(err);
      res.sendStatus('500')
    }
    else {
      res.sendStatus('200');
    }
  })
});


///////////////-------------------------------------------------------/


//// ETSY SHOP ////
///////////////-------------------------------------------------------\
///////////////-------------------------------------------------------/

//// MESSAGES ////
///////////////-------------------------------------------------------\
  app.post('/message',function(req,res){
    db.log_message([req.body.name,req.body.email,req.body.message,false],function(err,success){
      if (err){
        console.log(err);
        res.sendStatus('500')
      }
      else {
        res.sendStatus('201');
      }
    })
  });

  app.get('/message',function(req,res){
    db.get_messages(function(err,success){
      res.status(200).json(success);
    });
  });

  app.put('/message/:id',function(req,res){
    db.mark_message_read([req.params.id],function(err,success){
      if (err){
        console.log(err);
        res.sendStatus('500')
      }
      else {
        res.sendStatus('200');
      }
    });
  });
///////////////-------------------------------------------------------/

//// LOCAL AUTH ////
///////////////-------------------------------------------------------\
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.getUserByUsername([username], function(err, user) {
      user = user[0];
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    })
  }
))

// used when leaveing the server
passport.serializeUser(function(user, done) {
  done(null, user.id);
})

// used when coming into the server
passport.deserializeUser(function(id, done) {
  // need to fix here
  db.getUserById([id], function(err, user) {
    user = user[0];
    if (err) {console.log('passport deserialize user error', err)}
    else {
      // console.log('RETRIEVED USER')
    }
    done(null, user);
  })
})

app.post('/auth/local', passport.authenticate('local'), function(req, res) {
   // Use passport local strategy if success 200 else 401
  res.status(200).json({
    username: req.user.username,
    authenticated: req.isAuthenticated()
  });
});

app.get('/auth/status', function(req, res) {
  res.status(200).json(req.isAuthenticated());
})


app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

///////////////-------------------------------------------------------/


app.listen(process.env.PORT || config.port,function(){
  console.log('listening on port '+config.port)
})
