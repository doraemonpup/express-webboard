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

router.get('/', (request, response) => {
  response.render('home', { allQuestions });
});

module.exports = router;
