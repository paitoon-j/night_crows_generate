const express = require("express");
const server = express();
const path = require('path');

server.use(express.static("scripts"));
server.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
server.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}/`);
});