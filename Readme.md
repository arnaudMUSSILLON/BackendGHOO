# BackendGHOO

API based on a Node.js server that provides the necessary backend services for the GlobalHOO application to work properly.


## Configuration
All configurations are set up in the `/config/environment.js` file.
Every information is saved in a MySQL relationnal database using Sequelize.

## Routes
Here is listed all the operations available in this RESTful API.

### User service
Each route is preceded by the endpoint `/user`

|Method          |Path                      |Description              |
|----------------|--------------------------|-------------------------|
|POST            |`/authenticate`           |Sign in a user           |
|POST            |`/create`                 |Create a new account     |
|POST            |`/update`                 |Update user data         |

All data related to a user os stored in the USERS table.

### Imaging service
Each route is preceded by the endpoint `/image`

|Method          |Path                      |Description                                           |
|----------------|--------------------------|------------------------------------------------------|
|POST            |`/upload`                 |Upload a new image                                    |
|POST            |`/get/all`                |Get all informations of the images uploaded by a user |
|POST            |`/get/<id>`               |Get the image with the provided id                    |


## Uploads
All the uploaded images are stored in the `uploads/user_images` directory.
