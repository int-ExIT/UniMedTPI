const { Patient } = require(`../models/index.model`);

const ENTITY = Patient;

async function insert(body) {
  try { return await ENTITY.create(body); }
  catch (err) { throw err; }
}

async function selectOne(body) {
  try { return await ENTITY.findOne(body); }
  catch (err) { throw err; }
}

module.exports = {
  insert,
  selectOne,
};