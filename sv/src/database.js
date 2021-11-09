const mongoose = require('mongoose');

const URI = process.env.DB_URI 
    ? process.env.DB_URI 
    : 'mongodb://localhost/mernstack';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database successfully connected');
});