const Sequelize = require('sequelize');
const env = require('./environment');

const db = new Sequelize(env.dbName, env.dbUser, env.dbPassword, {
    host: env.dbLocation,
    dialect: 'mysql'
});
module.exports = db;