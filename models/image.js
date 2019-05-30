const Sequelize = require('sequelize');
const db = require('../config/database');

const Image = db.define('image', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: { type: Sequelize.STRING },
    size: { type: Sequelize.STRING },
    infos: { type: Sequelize.STRING },
    stranding: { type: Sequelize.BOOLEAN },
    lat: {
        type: Sequelize.STRING,
        allowNull: false
    },
    long: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
})
module.exports = Image;