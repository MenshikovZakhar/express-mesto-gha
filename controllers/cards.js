const Card = require('../models/card');
const { VALIDATION_ERROR, DOCUMENT_NOT_FOUND_ERROR, INTERNAL_SERVER_ERROR } = require('../utils/constants');

// Поиск всех карточек GET
module.exports.getCards = (_req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' }));
};

// Создание карточки POST
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR).send({ message: `Переданы некорректные данные при создании карточки:${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
    });
};

// Удалить карточку по ID DELETE
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null) {
        return res.status(DOCUMENT_NOT_FOUND_ERROR).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATION_ERROR).send({ message: `Пользователь по указанному _id не найден: ${err.message}` });
      }
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR).send({ message: `Переданы некорректные данные для удаления: ${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
    });
};

// Поставить лайк карточке
module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card === null) {
      return res.status(DOCUMENT_NOT_FOUND_ERROR).send({ message: 'Передан несуществующий _id карточки.' });
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(VALIDATION_ERROR).send({ message: `Переданы некорректные данные для постановки/снятии лайка: ${err.message}` });
    }
    if (err.name === 'CastError') {
      return res.status(VALIDATION_ERROR).send({ message: `Передан несуществующий _id карточки: ${err.message}` });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
  });

// Убрать лайк
module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card === null) {
      return res.status(DOCUMENT_NOT_FOUND_ERROR).send({ message: 'Передан несуществующий _id карточки.' });
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(VALIDATION_ERROR).send({ message: `Переданы некорректные данные для постановки/снятии лайка: ${err.message}` });
    }
    if (err.name === 'CastError') {
      return res.status(VALIDATION_ERROR).send({ message: `Передан несуществующий _id карточки: ${err.message}` });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
  });
