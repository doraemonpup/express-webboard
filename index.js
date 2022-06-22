const express = require('express');
const hbs = require('hbs');
const app = express();

const PORT = 8888;

app.use(express.urlencoded({ extended: true }));
// set view engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (request, response) => {
  console.log(request.query); // for query parameter ?q=xxx
  const { q, sortedBy } = request.query;
  response.render('home', { q, sortedBy });
});

app.get('/q/new', (request, response) => {
  response.render('questionNew');
});

app.post('/q/new', (request, response) => {
  console.log(request.body);
  const { title } = request.body ?? {};
  response.send(`Submited Form ${title}`);
});

app.get('/q/:questionId', (request, response) => {
  console.log(request.params);
  const { questionId } = request.params;
  response.render('question', { questionId });
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
