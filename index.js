const express = require('express');
const { createDbConnection, configureData } = require('./config/appConfig');
const bodyParser  = require("body-parser");
const passport = require("passport");
const routes = require('./routes/routes');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./middlewares/passport")(passport);

createDbConnection();

//configureData();


app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

