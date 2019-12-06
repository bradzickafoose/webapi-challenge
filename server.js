const express = require('express');

const server = express();

// Routes
const projectRoutes = require('./projects/project-routes');

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

server.use('/api/projects', projectRoutes);

module.exports = server;