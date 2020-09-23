// Import Modules

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');

// Twilio Credentials

const accountSid = 'AC32cf0ad0005c9aac5d7b73f0e68a8c96';
const authToken = '6182647c38974f07419f2e8883415f24';
const client = require('twilio')(accountSid, authToken);
app.use(bodyParser.urlencoded({ entended: false }));
var env= require('dotenv').config()

// Watson Credentials

var assistant = new watson.AssistantV1({
  iam_apikey: 'VafDvZVfCd5y2PSi_c7I0ZLkU8ibCjpP-NHPsq8fzFz0',
  version: '2018-09-20',
  url: 'https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/923666c3-3a31-4b74-9641-eda604b7f3c0'
});
var context1 = {};
app.get('/test', function (req, res) {
})
// API

app.post('/api', function (req, res) {
	console.log("Request Object");
	var From = req.body.From;
	console.log(From);
	assistant.message({
		workspace_id: '1abb4a5a-adbb-45c2-accd-792ec288ed70',
		input: { 'text': req.body.Body },
		context: context1
	}, function (err, response) {
		if (err)
			console.log('error:', err);
		else {
				context1 = response.context;
				var msg = response.output.text[0];
				console.log("message", msg);
				client.messages
					.create({
						body: msg,
						from:'whatsapp:+14155238886',
						to: From
					})
					.then(message => console.log(msg))
					.done();

	}
	})

});
//PORT Listen 
app.listen(process.env.PORT||8000, function () {
	console.log("Server is running at 8000");
});

