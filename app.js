const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const ejs = require('ejs');
const usersRoutes = require('./routes/usersRoutes');
const questionRoutes = require('./routes/questionRoutes.js');
const viewRoutes = require('./routes/viewRoutes.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
dotenv.config({ path: './config.env' });

app.use(cors({
    origin: 'http://localhost:3000', // Add the protocol
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'files')));
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.cookies);
    next();
});

app.use('/', viewRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/questions', questionRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(() => {
    console.log('DB connection successful!');
});
