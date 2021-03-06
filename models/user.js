const Sequelize = require('sequelize');
const db = require('../config/database');
const Image = require('./image');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
Image.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Image, { foreignKey: 'userId' });
module.exports = User;