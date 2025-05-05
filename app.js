require(`dotenv`).config();
const express = require(`express`);
const morgan = require(`morgan`);
const config = require(`./config`);

const index = require(`./routers/index`);

const app = express();

app.set(`port`, config.app.port || 4000);

//-------------------------------------------------- MIDDLEWARS -

app.use(morgan(`dev`));

//-------------------------------------------------- ROUTERS ---

app.use(`/`, index);

module.exports = app;