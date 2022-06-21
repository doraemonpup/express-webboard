const express = require('express');
const app = express();

const PORT = 8888;

app.get('/', (request, response) => {
  response.send('Hello Express');
});

app.listen(PORT, () => {
  console.log(`Come on! http://localhost:${PORT}`);
});
