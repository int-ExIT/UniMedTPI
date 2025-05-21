const { Patient } = require(`../models/index.model`);

async function createPatient(body) {
  try {
    const newPatient = await Patient.create(body);
    
    return newPatient.id;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createPatient,
};