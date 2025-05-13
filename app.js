require(`dotenv`).config();
const express = require(`express`);
const morgan = require(`morgan`);
const path = require(`path`);
const config = require(`./config`);

const index = require(`./routers/index`); // BORRAR

const app = express();

app.set(`port`, config.app.port || 4000);
app.set(`view engine`, `pug`);

//-------------------------------------------------- MIDDLEWARS ---

app.use(morgan(`dev`));
app.use(`/public`, express.static(path.join(__dirname, `public`)));

//----------------------------------------------------- ROUTERS ---

app.use(`/`, index);

module.exports = app;