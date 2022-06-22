const express = require('express');

const router = express.Router();

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

router.get('/new', (request, response) => {
  response.render('questionNew');
});

router.post('/new', (request, response) => {
  console.log(request.body);
  const { title } = request.body ?? {};
  response.send(`Submited Form ${title}`);
});

router.get('/:questionId', (request, response) => {
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

module.exports = router;
