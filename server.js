require('newrelic');
const express = require('express');
const BodyParser = require('body-parser');
const Partials = require('express-partials');
const path = require('path');
const morgan = require('morgan');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('http-proxy-middleware');
const axios = require('axios');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

app.get(`/:Id`, (req, res) => {
	res.sendFile(path.join(__dirname,'./public/index.html'))
});

app.get(`/:Id/amenities`, (req, res) => {
	request(`http://localhost:4420/${req.params.Id}/amenities`, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.json(JSON.parse(body));
	});
});

app.get(`/:Id/reviews`, (req, res) => {
	request(`http://13.56.234.247/${req.params.Id}/reviews?limit=${req.query.limit}&offset=${req.query.offset}`, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.json(JSON.parse(body));
	})
});

app.get(`//amenities`, (req, res) => {
	request(`http://localhost:4420//amenities`, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.json(JSON.parse(body));
	})
});

app.get('/amenities/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  request(`http://localhost:4420/rooms/${roomId}`, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.json(JSON.parse(body));
	})
});

app.post('/amenities/rooms', (req, res) => {
  console.log('req.body ', req.body );
  // res.send('ok');
  axios.post('http://localhost:4420/rooms', { ...req.body })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log('Error', err);
      res.send('Error in posting new room.');
    });
});
// app.use('/amenities/rooms/:roomId', proxy({ target: 'http://localhost:4420', changeOrigin: true }));
// app.delete('/amenities/rooms/:roomId', (req, res) => {
//   const { roomId } = req.params;
//   request(`http://localhost:4420/rooms/${roomId}`, (err, response, body) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		res.json(JSON.parse(body));
// 	})
// });

app.get(`/photos/:Id`, (req, res) => {
	request(`http://18.217.250.139/photos/${req.params.Id}`, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.json(JSON.parse(body));
	})
});

app.get(`/homes/:Id/suggestions`, (req, res) => {
	request(`http://18.212.20.57/homes/${req.params.Id}/suggestions`, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.json(JSON.parse(body));
	})
});

app.get('/availabilities/:Id', (req, res) => {
	request(`http://18.191.46.241/availabilities/${req.params.Id}`, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.send(body);
	})
});


app.get(`/user/favorites`, (req, res) => {
	request(`http://18.212.20.57/user/favorites`, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.json(JSON.parse(body));
	})
});

app.post(`user/favorites`, (req, res) => {
	request({
		method: 'POST',
		uri:`http://18.212.20.57/user/favorites`,
		data:[{
			'content-type': 'application/json',
			body: req.body.listName,
		}]
	}, (err, response, body) => {
		if (err) {
			console.log(err);
		}
		res.status(201).send('List Added');
	})
});

app.put(`/availabilities/:Id`, (req, res) => {
	request({
		method: 'PUT',
		uri:`http://18.191.46.241/availabilities/${req.params.Id}`,
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
});

app.listen(port, () => {
	console.log(path.join(__dirname, './public'));
	console.log(`server running at http://localhost:${port}`);
});