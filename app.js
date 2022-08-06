const express = require('express');
const hostsRouter = require('./routers/liveHosts');

const app = express();

app.use(express.json());
app.use(hostsRouter)

module.exports = app