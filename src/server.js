import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import http from 'http';
import socketIoControl from './config/connectSocketIO';
import db from './models';

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

app.post('/', async (req, res) => {
	const temperature = req.body.temperature;
	const humidity = req.body.humidity;
	const light = req.body.light;

	// Lưu dữ liệu vào cơ sở dữ liệu ở đây
	try {
		// Tạo một bản ghi mới trong bảng SensorData
		const sensorData = await db.MCB.create({
			temperature,
			humidity,
			light,
		});
		res.status(200).send('Data received and stored');

		console.log('Data inserted into MySQL:', sensorData.toJSON());

		console.log(
			`Received data - Temperature: ${temperature}, Humidity: ${humidity}, Light: ${light}`,
		);

		return;
	} catch (error) {
		console.error('Error inserting data into MySQL:', error);
		res.status(500).send('Internal Server Error');
		return;
	}
});

let port = process.env.PORT || 6007;

socketIoControl(io);

server.listen(port, () => {
	//callback
	console.log('Backend Nodejs is runing on the port : ' + port);
});
