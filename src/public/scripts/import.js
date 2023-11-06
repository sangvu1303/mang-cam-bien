const socket = io('http://localhost:6006');

let chart;

socket.on('connect', function () {
	socket.emit('get-data');
	socket.emit('get-chart-data');
});
function initializeChart() {
	chart = Highcharts.chart('myChart', {
		title: {
			text: 'Đồ thị nhiệt độ - độ ẩm - ánh sáng',
			align: 'left',
		},

		yAxis: [
			{
				// trục tung
				labels: {
					format: '{value}',
					style: {
						color: 'black',
					},
				},
				title: {
					text: 'Value',
					style: {
						color: 'black',
					},
				},
			},
		],

		xAxis: [
			{
				categories: [],
				tickWidth: 1,
			},
		],

		tooltip: {
			shared: true,
		},

		legend: {
			layout: 'vertical',
			align: 'right',
			x: -40,
			verticalAlign: 'top',
			y: -8,
			floating: true,
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || // theme
				'rgba(255,255,255,0.25)',
		},

		series: [
			{
				name: 'Humidity',
				type: 'line',
				color: '#3cc9fc',
				data: [],
				tooltip: {
					valueSuffix: '%',
				},
			},
			{
				name: 'Temperature',
				type: 'line',
				color: '#f7a35c',
				data: [],
				tooltip: {
					valueSuffix: '°C',
				},
			},
			{
				name: 'Light',
				type: 'line',
				color: '#57f254',
				data: [],
				tooltip: {
					valueSuffix: 'Lux',
				},
			},
		],
	});
}

initializeChart();

socket.on('initChartData', (data) => {
	updateChart(data);
});

socket.on('updateChartData', (data) => {
	updateChart(data);
});

// so lieu 3 thông so
socket.on('send-data', function (data) {
	$('#temperature-display').html(data.temperature + ' °C');
	$('#humidity-display').html(data.humidity + ' %');
	$('#light-display').html(data.light + ' Lux');
});

function updateChart(data) {
	if (chart) {
		chart.series[0].setData(data.map((entry) => entry.temperature));
		chart.series[1].setData(data.map((entry) => entry.humidity));
		chart.series[2].setData(data.map((entry) => entry.light));
		chart.xAxis[0].setCategories(data.map((entry) => entry.updatedAt));
	}
}
