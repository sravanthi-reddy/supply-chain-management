require('dotenv').config();
const mongoose = require('mongoose');
const dbRoute = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mongocluster.5obwo9h.mongodb.net/SampleDB?retryWrites=true&w=majority`;

//Creates connection to the mongo DB
const createDbConnection = () => {
    mongoose.connect(dbRoute, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.once('open', () => {
        console.log("MongoDB database connection established successfully");
    })
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
}
//returns an instance of the connected database
const getDbInstance = () => {
    mongoose.connect(dbRoute, { useNewUrlParser: true });
    return mongoose.connection;
}

module.exports = {createDbConnection, getDbInstance}