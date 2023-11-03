let cacheData = {
	temperature: null,
	humidity: null,
	light: null,
};

let updateData = () => {
	return new Promise(async (resolve, reject) => {
		try {
			cacheData = await getData();
			resolve(cacheData);
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	updateData,
};
