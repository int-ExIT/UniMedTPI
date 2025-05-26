const answer = require("../logs/answers");
const { Patient } = require("../models/index.model");

const ENTITY = Patient;

async function insert(req, res) {
  try {
    const patient = await ENTITY.create(req.body);

    answer.success(res, 201, `(Patient) Successful Insertion`, patient);
  }
  catch (err) {
    if (err.name === `SequelizeUniqueConstraintError`) {
      answer.error(res, 400, `(Patient) Unsuccessful Insertion: Existing Patient`);
    }
    else {
      answer.error(res, 500, `(Patient) Unsuccessful Insertion ${err}`);
    }
  }
}

// Modificar esta
async function selectOne(req, res) {
  try {
    const patient = await ENTITY.findOne({
      where: { dni: req.body.dni }
    });

    answer.success(res, 200, `(Patient) Successful Selection`, patient);
  }
  catch (err) {
    answer.error(res, 500, `(Patient) Unsuccessful Selection ${err}`);
  }
}

async function selectAll(req, res) {
  try {
    const patients = await ENTITY.findAll();

    answer.success(res, 200, `(Patient) Successful Selections`, patients);
  }
  catch (err) {
    answer.error(res, 500, `(Patient) Unsuccessful Selections ${err}`);
  }
}

module.exports = {
  insert,
  selectOne,
  selectAll,
};