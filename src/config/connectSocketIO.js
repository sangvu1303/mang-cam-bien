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

		let continuousData = [];
		socket.on('get-chart-data', async () => {
			try
			{
				const initialChartData = await db.MCB.findAll();
				socket.emit('initChartData', initialChartData);

				setInterval(async () => {
					const updatedData = await db.MCB.findAll();
					continuousData = updatedData; // Lưu dữ liệu thay đổi liên tục
					socket.emit('updateChartData', continuousData);
				}, 1000);
			} catch (e) {
				console.log(e);
			}
		});
	});
};

module.exports = socketIoControl;
