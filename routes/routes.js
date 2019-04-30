const createUser = require('./user/create');
const profileUser = require('./user/profile');
const authUser = require('./user/authenticate');

const uploadImage = require('./image/upload');

module.exports = (app) => {
    app.use(
        '/user',
        createUser, 
        profileUser,
        authUser
    );

    app.use(
        '/image',
        uploadImage
    )
}