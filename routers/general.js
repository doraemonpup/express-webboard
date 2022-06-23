const express = require('express');
const dayjs = require('dayjs');
const db = require('../dbs');

const router = express.Router();

router.get('/', async (request, response) => {
  // console.log(request.query); // to find query like '?user=abc&pw=1234'
  let allTopics = [];
  try {
    // get Array of object back
    allTopics = await db
      .select('topic.id', 'topic.title', 'topic.from', 'topic.createdAt')
      .count('comment.id as commentsCount')
      .from('topic')
      .leftJoin('comment', 'topic.id', 'comment.topicId')
      .groupBy('topic.id')
      .orderBy('topic.id', 'desc');

    allTopics = allTopics.map(topic => {
      const createdAtText = dayjs(topic.createdAt).format('D MMM YYYY - HH:mm');
      return { ...topic, createdAtText };
    });
  } catch (error) {
    console.error(error);
  }
  response.render('home', { allTopics });
});

module.exports = router;
