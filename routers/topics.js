const express = require('express');
const dayjs = require('dayjs');
const db = require('../dbs');

const router = express.Router();

router.get('/new', (request, response) => {
  response.render('topicNew');
});

router.post('/new', (request, response) => {
  // console.log(request.body);
  const { title } = request.body ?? {};
  response.send(`Submited Form ${title}`);
});

router.get('/:topicId', async (request, response) => {
  // console.log(request.params);
  const { topicId } = request.params;

  let oneTopic = null;
  let topicComments = [];
  try {
    // Get one topic
    const someTopics = await db
      .select('*')
      .from('topic')
      .where('id', +topicId);
    oneTopic = someTopics[0]; // because we always get an array back, although only 1 topic
    oneTopic.createdAtText = dayjs(oneTopic.createdAt).format(
      'D MMM YYYY - HH:mm'
    );

    // Get topic comments
    topicComments = await db
      .select('*')
      .from('comment')
      .where('topicId', +topicId);

    topicComments = topicComments.map(comment => {
      const createdAtText = dayjs(comment.createdAt).format(
        'D MMM YYYY - HH:mm'
      );
      return { ...comment, createdAtText };
    });
  } catch (error) {}

  const customTitle = !!oneTopic ? `${oneTopic.title} | ` : 'Not found | ';
  response.render('topic', { oneTopic, topicComments, customTitle });
});

module.exports = router;
