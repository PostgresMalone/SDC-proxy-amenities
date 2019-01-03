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
	request(`http://127.0.0.1:4420/${req.params.Id}/amenities`, function(err, response, body) {
		if(err) {
			console.log(err);
		}
		res.json(JSON.parse(body));
	});
});

app.listen(port, () => {
	console.log(path.join(__dirname, './public'));
	console.log(`server running at http://localhost:${port}`);
})