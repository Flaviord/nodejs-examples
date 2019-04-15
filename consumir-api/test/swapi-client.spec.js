var nock = require('nock');
var expect = require('chai').expect;
var getPerson = require('../swapi-client').getPerson;

describe('GET person by id', function() {

  beforeEach(function() {
      var peopleResponse = {
        "name": "Luke Skywalker",
        "height": "1.72 m",
        "mass": "77 Kg",
        "hair_color": "Blond",
        "skin_color": "Caucasian",
        "eye_color": "Blue",
        "birth_year": "19 BBY",
        "gender": "Male",
        "homeworld": "http://swapi.co/api/planets/1/",
        "films": [
            "http://swapi.co/api/films/6/",
        		"http://swapi.co/api/films/3/",
        		"http://swapi.co/api/films/2/",
        		"http://swapi.co/api/films/1/",
        		"http://swapi.co/api/films/7/"
        ],
        "species": [
            "http://swapi.co/api/species/1/"
        ],
        "vehicles": [
            "http://swapi.co/api/vehicles/14/",
            "http://swapi.co/api/vehicles/30/"
        ],
        "starships": [
            "http://swapi.co/api/starships/12/",
            "http://swapi.co/api/starships/22/"
        ],
        "created": "2014-12-09T13:50:51.644000Z",
        "edited": "2014-12-10T13:52:43.172000Z",
        "url": "http://swapi.co/api/people/1/"
    };

    nock('http://swapi.co')
        .get('/api/people/1')
        .reply(200, peopleResponse);
    });


  it('returns person found', function(done) {

    this.timeout(500);

    var personId = 1;

    getPerson(personId, function(err, person) {    
      expect(person).to.have.property('name').to.equal('Luke Skywalker');
      expect(person).to.have.property('films').with.length(5);
      done();
    }); 

  });
});
