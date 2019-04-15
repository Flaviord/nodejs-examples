
var express = require('express');
var app = express();

app.get('/api/people/:personId', function (req, res) {
  var getPerson = require('./swapi-client').getPerson;
  getPerson(req.params.personId, function(error, person){
    console.log('Person Object',person);
    res.send(person);
  });
})

app.listen(3000, function () {
  console.log('I Am Alive on Port 3000.')
})