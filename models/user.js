const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная для 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная для 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
  },
});

module.exports = mongoose.model('user', userSchema);
