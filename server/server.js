const express = require('express');
const app = express();
const port = 3000;
const weather = require('./routes/weather');

app.use('/weather', weather);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});