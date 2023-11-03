'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class MCB extends Model {
		static associate(models) {}
	}
	MCB.init(
		{
			temperature: DataTypes.FLOAT,
			humidity: DataTypes.FLOAT,
			light: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: 'MCB',
		},
	);
	return MCB;
};
