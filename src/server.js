import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import http from 'http';
import socketIoControl from './config/connectSocketIO';

require('dotenv').config();

let app = express();
let server = http.createServer(app);
let io = require('socket.io')(server); //connect socket to server

//config app
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6007;

socketIoControl(io);

app.post('/store-data', (req, res) => {
	const temperature = req.body.temperature;
	const humidity = req.body.humidity;
	const light = req.body.light;	

	// Lưu dữ liệu vào cơ sở dữ liệu ở đây

	console.log(
		`Received data - Temperature: ${temperature}, Humidity: ${humidity}, Light: ${light}`,
	);
	res.send('Data received');
});

server.listen(port, () => {
	//callback
	console.log('Backend Nodejs is runing on the port : ' + port);
});
