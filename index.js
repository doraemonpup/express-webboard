const express = require('express');
const hbs = require('hbs');
const generalRouter = require('./routers/general');
const topicsRouter = require('./routers/topics');

// create app
const app = express();
const PORT = process.env.PORT || 8888;
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// use routers
app.use('/', generalRouter);
app.use('/t', topicsRouter);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
