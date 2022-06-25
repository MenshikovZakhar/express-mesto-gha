const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
    unique: true,
    validate: [validator.isEmail, 'Некорректный email'],
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
    minlength: [8, 'Минимальная длина 8 символов'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная для 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная для 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
