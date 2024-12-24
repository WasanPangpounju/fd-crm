const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const events = req.body.events;

    events.forEach((event) => {
        console.log(event); // Log incoming events for debugging

        // Handle the event (e.g., reply to messages)
    });

    res.status(200).send('OK'); // Respond with 200 OK to LINE
});

module.exports = router;

// const express = require('express');
// const crypto = require('crypto');
// const line = require('@line/bot-sdk');

// const router = express.Router();

// // LINE Bot Configuration
// const config = {
//     channelAccessToken: '2006710158', // Replace with your actual Channel Access Token
//     channelSecret: 'a9c7b16fadc00cb2e4fff146edd0bbfb',           // Replace with your actual Channel Secret
// };

// // Initialize LINE Client
// const client = new line.Client(config);

// // Middleware to verify LINE signature
// function verifyLineSignature(req, res, next) {
//     try {
//         const signature = req.headers['x-line-signature'];
//         const body = JSON.stringify(req.body);

//         // Generate HMAC hash for signature verification
//         const hash = crypto.createHmac('SHA256', config.channelSecret).update(body).digest('base64');

//         if (signature === hash) {
//             next(); // Signature is valid
//         } else {
//             console.error('Invalid signature:', { signature, hash });
//             res.status(401).send('Unauthorized'); // Respond with 401 if the signature is invalid
//         }
//     } catch (err) {
//         console.error('Error verifying signature:', err);
//         res.status(500).send('Internal Server Error');
//     }
// }

// // Webhook route
// router.post('/', verifyLineSignature, async (req, res) => {
//     try {
//         const events = req.body.events;

//         // Respond immediately to LINE
//         res.status(200).send('OK');

//         if (!events || events.length === 0) {
//             console.log('No events received');
//             return;
//         }

//         // Process each event
//         for (const event of events) {
//             console.log('Received event:', event);

//             // Example: Handle text messages
//             if (event.type === 'message' && event.message.type === 'text') {
//                 const replyText = `You said: ${event.message.text}`;
//                 await handleTextMessage(event, replyText);
//             } else {
//                 console.log(`Unhandled event type: ${event.type}`);
//             }
//         }
//     } catch (err) {
//         console.error('Error handling webhook event:', err);
//     }
// });

// // Function to handle text messages
// async function handleTextMessage(event, replyText) {
//     try {
//         // Reply to the user
//         await client.replyMessage(event.replyToken, {
//             type: 'text',
//             text: replyText,
//         });
//         console.log('Reply sent:', replyText);
//     } catch (err) {
//         console.error('Error sending reply:', err);
//     }
// }

// module.exports = router;
