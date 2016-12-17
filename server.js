var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactlist');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log('we are connected!');
});

var bodyParser = require('body-parser');

var Schema = mongoose.Schema;

var ContactSchema = new Schema({
	name: String,
	email: String,
	number: String
}, { collection: 'contactlist' });

var ContactList = mongoose.model('ContactList', ContactSchema);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
	
app.get('/contactlist', function(req, res){
	console.log("I received a GET request.");
	ContactList.find(function(err, contact){
		if(err) return console.error(err);
		console.log(contact);
		res.json(contact);
	});
});

app.post('/contactlist', function(req, res){
	console.log(req.body);

	var contact = new ContactList(req.body);
	contact.save(function(err, record){
		if(err) return console.error(err);
		console.log(record);
		res.json(record);
	});
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);

	ContactList.remove({ _id: id },function(err, record){
		if(err) return console.error(err);
		console.log(record);
		res.json(record);
	});
});

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	
	ContactList.findOne({ _id: id }, function(err, record){
		if(err) return console.error(err);
		console.log(record);
		res.json(record);
	});
});

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	
	ContactList.findByIdAndUpdate(id,
		{
			name: req.body.name,
			email: req.body.email,
			number: req.body.number
		},
		{ new : true },
		function(err, record){
			console.log(record);
			res.json(record);
		}
	);
});
	
app.listen(3000);
console.log("Server running on port 3000");
