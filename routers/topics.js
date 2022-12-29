const express = require('express');
const dayjs = require('dayjs');
const db = require('../dbs');
const formatDistanceToNow = require('date-fns/formatDistanceToNow');

const router = express.Router();

router.get('/new', (request, response) => {
  response.render('topicNew');
});

router.post('/new', async (request, response) => {
  // console.log(request.body);
  const { title, content, from, accepted } = request.body; // ชื่อจะเหมือนใน name
  try {
    // Validation
    if (!title || !content || !from) {
      throw new Error('not completed');
    } else if (accepted != 'on') {
      throw new Error('accepted not checked');
    }

    // Create topic in DB
    await db
      .insert({ title, content, from, createdAt: new Date() })
      .into('topic');
  } catch (error) {
    // show an error messege
    let errorMessage = 'Something went wrong';
    if (error.message === 'not completed') {
      errorMessage = 'Form not completed, some input has not been filled';
    } else if (error.message === 'accepted not checked') {
      errorMessage = 'Please accept the term!';
    }
    // if an error occured
    return response.render('topicNew', {
      errorMessage,
      values: { title, content, from },
    });
  }
  // if no error -> redirect to Done page
  response.redirect('/topics/new/done');
});

router.get('/new/done', (request, response) => {
  response.render('topicNewDone');
});

router.get('/:topicId', async (request, response) => {
  // console.log(request.params);
  const { topicId } = request.params;
  const topicData = await getTopicAndComments(topicId);
  response.render('topic', topicData);
});

router.post('/:topicId/comment', async (request, response) => {
  const { topicId } = request.params;
  const { content, from, accepted } = request.body; // ชื่อจะเหมือนใน name
  try {
    // Validation
    if (!content || !from) {
      throw new Error('not completed');
    } else if (accepted != 'on') {
      throw new Error('accepted not checked');
    }

    // Create comment
    await db
      .insert({ content, from, createdAt: new Date(), topicId: +topicId })
      .into('comment');
  } catch (error) {
    // show an error messege
    let errorMessage = 'Something went wrong';
    if (error.message === 'not completed') {
      errorMessage = 'Form not completed, some input has not been filled';
    } else if (error.message === 'accepted not checked') {
      errorMessage = 'Please accept the term!';
    }

    const topicData = await getTopicAndComments(topicId);

    // if an error occured
    return response.render('topic', {
      ...topicData,
      errorMessage,
      values: { content, from },
    });
  }
  // if no error -> redirect to Done page
  response.redirect(`/topics/${topicId}`);
});

async function getTopicAndComments(topicId) {
  let oneTopic = null;
  let topicComments = [];
  try {
    // Get one topic
    const someTopics = await db.select('*').from('topic').where('id', +topicId);
    oneTopic = someTopics[0]; // because we always get an array back, although only 1 topic
    // oneTopic.createdAtText = dayjs(oneTopic.createdAt).format(
    //   'D MMM YYYY - HH:mm'
    // );
    oneTopic.createdAtText = formatDistanceToNow(new Date(oneTopic.createdAt), {
      addSuffix: true,
    });

    // Get topic comments
    topicComments = await db
      .select('*')
      .from('comment')
      .where('topicId', +topicId);

    topicComments = topicComments.map(comment => {
      // const createdAtText = dayjs(comment.createdAt).format(
      //   'D MMM YYYY - HH:mm'
      // );
      const createdAtText = formatDistanceToNow(new Date(comment.createdAt), {
        addSuffix: true,
      });
      return { ...comment, createdAtText };
    });
  } catch (error) {}

  const customTitle = !!oneTopic ? `${oneTopic.title} | ` : 'Not found | ';
  return { oneTopic, topicComments, customTitle };
}

module.exports = router;
