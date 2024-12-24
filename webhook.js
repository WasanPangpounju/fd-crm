const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // Parse JSON requests

// Webhook route
app.post('/webhook', (req, res) => {
    console.log('Received a webhook event:');
    console.log(JSON.stringify(req.body, null, 2)); // Log the received message for debugging

    // Respond with 200 OK to acknowledge the event
    res.status(200).send('OK');
});

// Start the server on port 3456
const PORT = 3456;
app.listen(PORT, () => {
    console.log(`LINE webhook test server is running on port ${PORT}`);
});
