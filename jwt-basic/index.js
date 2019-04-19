var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var user = require('./models/user');
var genKey = 'leia o livro universo em desencato';

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

var apiRouters = express.Router();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

apiRouters.get('/', function(req, res) {
    res.json({message: 'Node.js Com JWT'});
});

// Criar o Token
apiRouters.post('/', function(req, res) {
    console.log('Criando Token')
    if (req.body.userName != 'flaviord' || req.body.password != '102030') {
        res.json({success: false, message: 'Usúario ou senha incorreto(s)'});
    } else {
        let usuario = new user() 
        {
            name: "flaviord";
            admin: true
        };
        var token = jwt.sign(usuario, genKey, {
            expiresIn: 1440
        });
        
        res.json({
            success: true,
            message: 'Token Criado! ;-)',
            token: token
        });
    }
});

// Validar Token
apiRouters.use(function(req, res, next) {
    console.log('Validando token')
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, genKey, function(err, decoded) {
            if(err) {
                return res.json({success: false, message: 'Falha ao autenticar o token :-('})
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false, message: '403 - Forbidden Fruit'
        });
    }
});

app.use('/', apiRouters);
var port = process.env.PORT || 3000;
app.listen(port);
console.log('I AM ALIVE AT PORT: ', port);