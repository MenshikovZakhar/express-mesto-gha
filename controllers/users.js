const User = require('../models/user');
const { VALIDATION_ERROR, DOCUMENT_NOT_FOUND_ERROR, INTERNAL_SERVER_ERROR } = require('../utils/constants');

// Поиск всех пользователей GET
module.exports.getUsers = (_req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' }));
};

// Поиск пользователя по ID GET
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        return res.status(DOCUMENT_NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATION_ERROR).send({ message: `Переданы некорректные данные при создании пользователя: ${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка по умолчанию: ${err.message}` });
    });
};

// Создание нового пользователя POST
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR).send({ message: `Переданы некорректные данные при создании пользователя: ${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка по умолчанию: ${err.message}` });
    });
};

// Редактирование данных пользователя
module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.body._id,
    {
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR).send({ message: `Переданы некорректные данные при обновлении профиля: ${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(DOCUMENT_NOT_FOUND_ERROR).send({ message: `Пользователь по указанному _id не найден:${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка по умолчанию: ${err.message}` });
    });
};

// Редактирование аватара пользователя
module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.body._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR).send({ message: `Переданы некорректные данные при обновлении аватара: ${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(DOCUMENT_NOT_FOUND_ERROR).send({ message: `Пользователь по указанному _id не найден: ${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка по умолчанию: ${err.message}` });
    });
};
