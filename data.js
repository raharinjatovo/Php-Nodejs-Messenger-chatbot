'use strict'

const express = require('express');
const request = require('request')
const bodyParser = require('body-parser');

const app = express();

app.set('port', (process.env.PORT || 5000));

// Allows us to process the data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// schedule instruction
const token = 'your_token';

app.get('/webhook/', (req, res) => {
	const datarecieved = req.url.substr(10, 1000);
	const parsing = datarecieved.replace(/%22/g, '"');

	const json = JSON.parse(parsing);
	const messaging_events = json.entry[0].messaging;

	for (const event of messaging_events) {
		if (event.message && event.message.text) {
			const text = event.message.text.replace(/%100/g, ' ').substring(0, 100);
			sendText(event.sender.id, `Text echo: ${text}`);
		}
	}

	res.sendStatus(200);
})

function sendText(sender, text) {
	const messageData = { text };
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: token },
		method: 'POST',
		json: {
			recipient: { id: sender },
			message: messageData,
		}
	}, (error, response, body) => {
		if (error) {
			console.log('sending with error');
		} else if (response.body.error) {
			console.log('response body error');
		}
	});
}

app.listen(app.get('port'), () => console.log(`running on port : ${app.get('port')}`));