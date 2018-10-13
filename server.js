var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');


app.use(morgan('dev'));


mongoose.connect('mongodb://localhost/my_database', function(err){
    if (err) {
        console.log('it is not connected to the database: ' + err);
    }
    else {
        console.log('connected to MongoDB');
    }
});


app.get('/', function (req, res) {
    res.send('Hello abooo')
  })




app.listen(process.env.PORT || 8080, function(){
    console.log('Hello from the server');
})
 