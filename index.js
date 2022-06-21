const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

const PORT = 8888;

app.get('/', (request, response) => {
  response.send('Hello Express');
});

app.get('/q/new', (request, response) => {
  response.send('New Question Form');
});

app.post('/q/new', (request, response) => {
  console.log(request.body);
  const { title } = request.body ?? {};
  response.send(`Submited Form ${title}`);
});

app.get('/q/:questionId', (request, response) => {
  console.log(request.params);
  response.send(`Question Page -> questionId: ${request.params.questionId}`);
});

app.listen(PORT, () => {
  console.log(`Come on! http://localhost:${PORT}`);
});
