import db from '../models';

let socketIoControl = (io) => {
	io.on('connection', function (socket) {
		console.log(socket.id + ' connected !!! ');

		socket.on('disconnect', function () {
			console.log(socket.id + ' disconnected ??? ');
		});

		// Sử dụng setInterval để cập nhật dữ liệu theo khoảng thời gian nhất định
		const updateInterval = 1000; // 5 giây
		const sendLatestData = async () => {
			try {
				const temperatureData = await db.MCB.findOne({
					attributes: ['temperature'],
					order: [['updatedAt', 'DESC']], // Sắp xếp theo thời gian giảm dần
					limit: 1, // Giới hạn số lượng kết quả trả về (chỉ lấy bản ghi mới nhất)
				});
				const humidityData = await db.MCB.findOne({
					attributes: ['humidity'],
					order: [['updatedAt', 'DESC']],
					limit: 1,
				});
				const lightData = await db.MCB.findOne({
					attributes: ['light'],
					order: [['updatedAt', 'DESC']],
					limit: 1,
				});

				// Gửi dữ liệu đến client thông qua socket.emit
				socket.emit('temperature', temperatureData.temperature);
				socket.emit('humidity', humidityData.humidity);
				socket.emit('light', lightData.light);
			} catch (error) {
				console.error('Error fetching data from the database:', error);
			}
		};

		// Gửi dữ liệu liên tục theo khoảng thời gian
		const intervalId = setInterval(sendLatestData, updateInterval);

		// Xóa interval khi ngắt kết nối
		socket.on('disconnect', () => {
			clearInterval(intervalId);
		});
	});
};

module.exports = socketIoControl;
