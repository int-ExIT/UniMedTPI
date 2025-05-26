const { where } = require("sequelize");
const { Patient } = require("../models/index.model");

const ENTITY = Patient;

async function insert(body) {
  try { return await ENTITY.create(body); }
  catch (err) { throw err; }
}

async function selectOne(dni) {
  try { return await ENTITY.findOne({ where: { dni } }); }
  catch (err) { throw err; }
}

async function selectAll() {
  try { return await ENTITY.findAll(); }
  catch (err) { throw err; }
}

module.exports = {
  insert,
  selectOne,
  selectAll,
};