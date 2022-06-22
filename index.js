const express = require('express');
const hbs = require('hbs');
const app = express();

const PORT = 8888;

app.use(express.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

const allQuestions = [
  {
    id: 2,
    title: 'Where can I find a luxus watch?',
    from: 'Big O',
    createdAtText: '14 Febuary 2022',
    commentsCount: 2,
  },
  {
    id: 1,
    title: 'How much does it cost?',
    from: 'Big Too',
    createdAtText: '22 September 2022',
    commentsCount: 0,
  },
];

app.get('/', (request, response) => {
  response.render('home', { allQuestions });
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
  const oneQuestion = allQuestions.find(
    question => question.id === +questionId
  );
  const customTitle = !!oneQuestion
    ? `${oneQuestion.title} | `
    : 'Not found | ';
  response.render('question', { oneQuestion, customTitle });
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
