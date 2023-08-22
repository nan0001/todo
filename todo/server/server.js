const express = require('express');
const db = require('./db.json');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json(db);
})

app.listen(port, () => {
  console.log(`App listening on port ${port}, link - http://localhost:3000/`);
})
