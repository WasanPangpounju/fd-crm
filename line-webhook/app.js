var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var webhookRouter = require('./routes/webhook');

const { Client, middleware } = require('@line/bot-sdk');

var app = express();

// Line SDK Configuration
const config = {
    channelAccessToken: 'zXNSmsTUPcOAEt+c6k/8AAn/16rLmtQVNssnTpsyaKOLNcNmvAlSe9muoU79JOgnfLATOncA3pqRIogRjhEB0teYGsGbSlRlrL4JMSbP4FTRz7DcltsNzErAqqhLziWnMAewkCS10fbB9LzB1eqytwdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'a9c7b16fadc00cb2e4fff146edd0bbfb',
  };
// Line SDK client
const client = new Client(config);  

// Middleware
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/webhook', webhookRouter);

// Middleware for Line webhook
app.post('/webhook', middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const echo = { type: 'text', text: event.message.text };

  return client.replyMessage(event.replyToken, echo);
}

module.exports = app;
