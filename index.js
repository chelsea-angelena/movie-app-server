require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const port = process.env.PORT || process.argv[2] || 8080;
const axios = require('axios');

const OMDB_API_KEY = process.env.OMDB_API_KEY;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('combined'));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/movies/:searchTerm', (req, res) => {
	const searchTerm = req.params.searchTerm;
	console.log(searchTerm, 'SearchTerm');
	const movieUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchTerm}`;
	const getData = async () => {
		let axiosRes;
		try {
			const response = await axios.get(`${movieUrl}`);
			axiosRes = response.data;
		} catch (e) {
			console.log(e);
		}
		res.json(axiosRes);
	};
	getData();
});

app.get('/api/:id', (req, res) => {
	const imdbID = req.params.id;
	console.log(imdbID, 'imdbID');
	const movieIDUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}`;
	const getData = async () => {
		let axiosRes;
		try {
			const response = await axios.get(`${movieIDUrl}`);
			axiosRes = response.data;
		} catch (e) {
			console.log(e);
		}
		res.json(axiosRes);
	};
	getData();
});

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const today = new Date();
const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;

app.listen(port, () => {
	console.log(`Listening on ${port} @ ${dateTime}`);
});
