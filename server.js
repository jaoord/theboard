var http			= require("http");
var env				= require('env');
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
	/*genid: function (req) {
		return genuuid()
	},*/
	secret: 'what a happy sunny day',
	saveUninitialized: false,
	resave: true
}));
app.use(flash());

// set the public static resource folder
app.use(express.static(__dirname + "/public"));

// Map the routes
controllers.init(app);

app.set('view engine', 'vash');


app.get('/api/sql', function (req, res) {
	var msnodesql = require('msnodesqlv8');
	var connString = 'Driver={SQL Server Native Client 11.0};Server=.\\SQL14;Database=FWP;Uid=fwp;Pwd=fwp;MultipleActiveResultSets=true';

	msnodesql.query(connString, "SELECT * FROM Client WHERE ClientId < 10", function (err, results) {
		console.log(err);
		res.send(results);
	});
});


app.get("/api/users", function (req, res) {
	res.set("Content-Type", "application/json");
	res.send({ name: "Jogchem", isValid: true, group: "Monkeys" });
});

var server = http.createServer(app);

var port = process.env.EXPRESS_PORT || 3000;

console.log('server will start on port ' + port);

// had ook net zo goed 80 kunnen zijn
server.listen(port);