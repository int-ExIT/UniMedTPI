const express = require("express");
const config = require("../config");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();

//----------------------------------------------------- CONFIGS ---
app.set("port", config.app.port || 4000);
app.set("view engine", config.app.viewEngine);

//-------------------------------------------------- MIDDLEWARS ---
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: 'https://unimedtpi-production.up.railway.app'
}));

module.exports = app;