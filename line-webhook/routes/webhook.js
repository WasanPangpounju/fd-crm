const express = require('express');
const router = express.Router();

const WEBHOOK_SECRET = 'a9c7b16fadc00cb2e4fff146edd0bbfb'; // Replace with your actual secret token

router.post('/', (req, res) => {
    const token = req.headers['authorization']; // Expect a Bearer token
    if (token !== `Bearer ${WEBHOOK_SECRET}`) {
        return res.status(401).send('Unauthorized'); // Reject non-authenticated requests
    }

    console.log(req.body); // Log the incoming request body
    res.status(200).send('Webhook received!');
});

module.exports = router;

// var express = require('express');
// var router = express.Router();
// const line = require('@line/bot-sdk');
// const bodyParser = require('body-parser');

// // LINE Bot configuration
// const config = {
//   channelAccessToken: '2006710158',
//   channelSecret: 'a9c7b16fadc00cb2e4fff146edd0bbfb',
// };



// // Webhook route
// router.post('/webhook', line.middleware(config), (req, res) => {
//   const events = req.body.events;

//   // Handle each event
//   events.forEach((event) => {
//     handleEvent(event);
//   });

//   res.status(200).send('OK');
// });

// // Event handler function
// const client = new line.Client(config);

// async function handleEvent(event) {
//   if (event.type !== 'message' || event.message.type !== 'text') {
//     // Ignore non-text messages
//     return;
//   }

//   // Reply to the message
//   const replyMessage = { type: 'text', text: `You said: ${event.message.text}` };

//   try {
//     await client.replyMessage(event.replyToken, replyMessage);
//   } catch (err) {
//     console.error('Error:', err);
//   }
// }

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
