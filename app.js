const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  req.user = {
    _id: '62a6016b3cc0b2306247fb45',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.patch('*', (_req, res) => {
  res.status(404).send({ message: 'Не найдено' });
});

app.listen(PORT);
