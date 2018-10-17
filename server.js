var express     = require('express');
var app         = express();
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var User        = require('./app/models/user');
var bodyParser  = require('body-parser');
var path        = require('path');  


app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/static', express.static('/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/app/views'));



mongoose.connect('mongodb://localhost/my_database', function(err){
    if (err) {
        console.log('it is not connected to the database: ' + err);
    }
    else {
        console.log('connected to MongoDB');
    }
});


app.post('/users', function (req, res) {
    var user = new User();
    
    user.firstname = req.body.firstname;
    user.lastname  = req.body.lastname;
    user.username  = req.body.username;
    user.password  = req.body.password;
    user.email     = req.body.email;
    if (req.body.firstname == null || req.body.firstname == '' || req.body.lastname == null || req.body.lastname == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '' ) {
        res.send('check empty boxes');
    } else {
        user.save(function (err) {
            if (err) {
                res.send('This user already exists!');
            } else {
                res.send('User Created');
            }
          });
    }
  });

app.get('/registration', function (req, res) {
    res.render('registration');
});



app.listen(process.env.PORT || 8080, function(){
    console.log('Hello from the server');
})
 