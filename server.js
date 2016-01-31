var http			= require("http");
var env				= require('env');
var config			= require('./config.js');
var express			= require("express");
var session			= require("express-session");
var cookies			= require("cookie-parser");
var bodyParser		= require("body-parser");
var flash			= require("connect-flash");
var controllers		= require('./controllers');

var app = express();

// Opt into services
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookies());
app.use(session({
	secret: config.sessionSecret,
	saveUninitialized: false,
	resave: true
}));
app.use(flash());

// set the public static resource folder
app.use(express.static(__dirname + "/public"));

// Map the routes
controllers.init(app);

app.set('view engine', 'vash');


app.get("/api/users", function (req, res) {
	res.set("Content-Type", "application/json");
	res.send({ name: "Jogchem", isValid: true, group: "Monkeys" });
});

var server = http.createServer(app);

var port = process.env.EXPRESS_PORT || 3000; // had ook net zo goed 80 kunnen zijn

console.log('server will start on port ' + port);
server.listen(port);