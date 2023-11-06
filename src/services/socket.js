import db from '../models';

const socketIoControl = (io) => {
	io.on('connection', function (socket) {
		console.log(socket.id + ' connected !!!');

		socket.on('disconnect', () => {
			console.log(socket.id + ' disconnected ???');
		});

		const updateInterval = 1000;

		const sendLatestData = async () => {
			try {
				const latestData = await db.MCB.findOne({
					order: [['updatedAt', 'DESC']],
				});

				if (latestData) {
					const { temperature, humidity, light } = latestData;

					socket.on('getSensorData', () => {
						const sensorData = latestData; // Dữ liệu cảm biến của bạn

						// Gửi dữ liệu cảm biến tới client
						socket.emit('sensorData', sensorData);
					});
					console.log(latestData);
				}
			} catch (error) {
				console.error('Error fetching data from the database:', error);
			}
		};

		const intervalId = setInterval(sendLatestData, updateInterval);

		socket.on('disconnect', () => {
			clearInterval(intervalId);
		});
	});
};

module.exports = socketIoControl;
