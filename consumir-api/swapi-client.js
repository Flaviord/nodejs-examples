var request = require('superagent');

var getPerson = function(id, callback) {
  var resource_url = 'http://swapi.co/api/people/' + id;
  request
    .get(resource_url)
    .end(function(err, res) {
      if (!err) {
        callback(null, res.body);
      } else {
        callback('Error Occurred!');
      }
    });
};

module.exports.getPerson = getPerson;
