const express = require('express');

const router = express.Router();

const allTopics = [
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
  response.render('topicNew');
});

router.post('/new', (request, response) => {
  console.log(request.body);
  const { title } = request.body ?? {};
  response.send(`Submited Form ${title}`);
});

router.get('/:topicId', (request, response) => {
  console.log(request.params);
  const { topicId } = request.params;
  const oneTopic = allTopics.find(topic => topic.id === +topicId);
  const customTitle = !!oneTopic ? `${oneTopic.title} | ` : 'Not found | ';
  response.render('topic', { oneTopic, customTitle });
});

module.exports = router;
