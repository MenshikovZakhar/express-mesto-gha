[![Tests](https://github.com/MenshikovZakhar/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/MenshikovZakhar/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

# Бэкенд проекта Место
<p align="center">
    <img alt="Version 1.0.0" src="https://img.shields.io/badge/version-1.0.0-blue" />
    <img alt="Quality" src="https://img.shields.io/badge/status-release-orange.svg" >
    <img alt="Made by: Comediany" src="https://img.shields.io/badge/made%20by-MenshikovZakhar-blue" />
</p>

## :memo: Описание
Место - это интерактивная страница, на которой пользователи могут делиться фотографиями, удалять их и ставить лайки.
В проекте задействованы две сущности: пользователи и карточки. Схемы и модели созданы через Mongoose с валидируемыми полями. Все роуты, кроме логина и логаута, защищены мидлвэрей auth, которая проверяет Authorization и наличие в нем токена в приходящих запросах. Обращение к API происходит через роуты с валидацией запросов через Joi и celebrate. В контроллерах описана логика обработки запросов. Контроллер логина создает JWT токен сроком на неделю. В контроллере регистрации пользователя пароль хешеруется модулем bcryptjs. В проекте реализована централизованная обработка ошибок через конструкторы ошибок - конструкторы передаются в блоках catch через функцию next и далее в мидлвэр обработки ошибок в app.js. Для логгирования запросов и ошибок используется библиотека Winston.
Проект выполнен в рамках учебной программы Яндекс.Практикум по специальности веб-разработчик.

## :hammer: Стэк технологий
- JavaScript:
- Rest API;
- Node.js;
- Express;
- MongoDB.

## Директории
`/routes` — папка с файлами роутера; 
`/controllers` — папка с файлами контроллеров пользователя и карточки;  
`/models` — папка с файлами описания схем пользователя и карточки;
* `/middleware` – содержит файлы промежуточного по;
Остальные директории вспомогательные, создаются при необходимости разработчиком.

## 💻 Как развернуть проект
Клонировать репозиторий: `git clone https://github.com/MenshikovZakhar/express-mesto-gha.gitt`;
Установить зависимости: npm install;
Запустить сервер: npm run start;
Запустить сервер с hot-reload: npm run dev.
