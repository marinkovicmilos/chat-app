const express = require('express');
const http = require('http');
const socket = require('./src/socket');

const port = 3000;

const init = () => {
    const app = express();
    const httpServer = http.createServer(app);

    socket.initializeSocket(httpServer);

    setupRoutes(app);

    httpServer.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
};

const setupRoutes = (app) => {
    app.use(express.static('src/public'));

    app.get('/', (req, res) => {
        res.sendFile(`${__dirname}/src/public/index.html`);
    });
};

init();
