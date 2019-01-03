const express = require('express');
const BodyParser = require('body-parser');
const Partials = require('express-partials');
const path = require('path');
const morgan = require('morgan');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

app.get('/:Id', (req, res) => {
	res.sendFile(path.join(__dirname,'./public/index.html'))
});

app.get('/:Id/amenities', (req, res) => {
	request(`http://127.0.0.1:4420/${req.params.Id}/amenities`, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.json(JSON.parse(body));
	});
});

app.get('/:Id/reviews', (req, res) => {
	request({
		method: 'GET',
		uri:`http://127.0.0.1:8000/${req.params.Id}/reviews`,
		data:[{
			offset: req.query.offset,
			limit: req.query.limit,
		}],
	}, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.json(JSON.parse(body));
	})
})

app.get('/photos/:Id', (req, res) => {
	request(`http://127.0.0.1:1234/photos/${req.params.Id}`, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.json(JSON.parse(body));
	})
})

app.get('/homes/:Id/suggestions', (req, res) => {
	request(`http://127.0.0.1:3050/homes/${req.params.Id}/suggestions`, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.json(JSON.parse(body));
	})
})

app.get('/availabilities/:Id', (req, res) => {
	request(`http://127.0.0.1:1001/availabilities/${req.params.Id}`, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.json(JSON.parse(body));
	})
})

app.put('/availabilities/:Id', (req, res) => {
	request({
		method: 'PUT',
		uri:`http://127.0.0.1:3050/availabilities/${req.params.Id}`,
		data:[{
			'content-type': 'application/json',
			body: req.body,
		}]
	}, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.status(204).end();
	})
})

app.listen(port, () => {
	console.log(path.join(__dirname, './public'));
	console.log(`server running at http://localhost:${port}`);
})