require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const generalRouter = require('./routers/general');
const topicsRouter = require('./routers/topics');

// create app
const app = express();
const PORT = process.env.APP_PORT;

app.use(express.urlencoded({ extended: true }));
// tell express to activate static folder
app.use('/static', express.static('static'));

// set view engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// use routers
app.use('/', generalRouter);
app.use('/t', topicsRouter);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
