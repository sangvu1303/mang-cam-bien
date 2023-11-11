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
					let updatedData = latestData;
					const intervalId = setInterval(async () => {
						// Lấy dữ liệu cập nhật mới
						updatedData = await db.MCB.findOne({
							order: [['updatedAt', 'DESC']],
						});

						// Gửi dữ liệu cập nhật đến client
						socket.emit('send-data', updatedData);
					}, 1000);
					socket.intervalIds = socket.intervalIds || [];
					socket.intervalIds.push(intervalId);
				}
			} catch (e) {
				console.log(e);
			}
		});

		socket.on('get-chart-data', async () => {
			try {
				const initialChartData = await db.MCB.findAll();
				socket.emit('initChartData', initialChartData);

				const intervalId = setInterval(async () => {
					const updatedData = await db.MCB.findAll();
					socket.emit('updateChartData', updatedData);
				}, 1000);
				socket.intervalIds = socket.intervalIds || [];
				socket.intervalIds.push(intervalId);
			} catch (e) {
				console.log(e);
			}
		});
	});
};

module.exports = socketIoControl;
