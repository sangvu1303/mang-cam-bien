let getDataPage = async (req, res) => {
	try {
		return res.render('homePage', {});
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	getDataPage: getDataPage,
};
