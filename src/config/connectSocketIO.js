import db from '../models';

const socketIoControl = (io) => {
	io.on('connection', function (socket) {
		console.log('>>> ID : ' + socket.id + ' connected !!!');

		socket.on('disconnect', () => {
			console.log('>>> ID : ' + socket.id + ' disconnected ???');
		});

		socket.on('get-data', async () => {
			try {
				const latestData = await db.MCB.findOne({
					order: [['updatedAt', 'DESC']],
				});
				if (latestData) {
					socket.emit('send-data', latestData);
				}
			} catch (e) {
				console.log(e);
			}
		});

		socket.on('get-chart-data', async () => {
			try {
				socket.emit('initChartData', await db.MCB.findAll());

				setInterval(async () => {
					const updatedData = await fetchDataForChart();
					socket.emit('updateChartData', updatedData);
				}, 1000);
			} catch (e) {
				console.log(e);
			}
		});
	});
};

module.exports = socketIoControl;
