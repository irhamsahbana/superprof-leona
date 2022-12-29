const express = require('express');
const app = express();
const port = 3001;
const routes = require('./routes');

app.use(express.json());
app.use('/', routes);

app.listen(port, () => console.log(`Visit http://localhost:${port}`));