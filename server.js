const express = require('express');
const http = require('http');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

const env = require('./config/environment.js');
const db = require('./config/database');

// Define application
const port = env.port;
let app = express();
let server = http.Server(app);

// Database
db.authenticate()
    .then(() => console.log('Database successfully connected'))
    .catch(err => console.log('Error connecting db : ' + err));

// Middlewares
// app.use(cors({'origin':'*', 'credentials':true}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
const routes = require('./routes/routes')(app);
app.get('/', (req, res) => { res.send('Hello World!') });

server.listen(port, () => {
    console.log('Server is runnning on port '+ port);
});
