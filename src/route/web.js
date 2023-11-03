import express from 'express';
import homeController from '../controller/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
	router.get('/', homeController.getDataPage);

	return app.use('/', router);
};

module.exports = initWebRoutes;
