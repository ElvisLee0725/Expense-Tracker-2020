const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000; // Use environmental variable on heroku, or use static 3000 on local machine

// Provide the path of public folder in express.static()
app.use(express.static(publicPath));

// Tell Express whenever there is not a match, return to index.html in public folder
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Give port number and callback
app.listen(port, () => {
    console.log('Server is up!');
});