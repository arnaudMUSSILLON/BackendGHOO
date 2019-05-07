const createUser = require('./user/create');
const updateUser = require('./user/update');
const authUser = require('./user/authenticate');

const uploadImage = require('./image/upload');

module.exports = (app) => {
    app.use(
        '/user',
        createUser, 
        updateUser,
        authUser
    );

    app.use(
        '/image',
        uploadImage
    )
}