const {
  Patient: MODEL,
  Admission
} = require("../models/index.model");
const { Op } = require("sequelize");

async function insert(req, res) {
  try {
    const patient = await MODEL.create(req.body);

    res.status(201).json({
      message: `(${MODEL.name}) Successful Insertion`,
      body: patient,
    });
  }
  catch (err) {
    if (err.name === `SequelizeUniqueConstraintError`) {
      res.status(400).json({
        message: `(${MODEL.name}) Unsuccessful Insertion`,
        body: `Error: Registered ${MODEL.name}`,
      });
    }
    else {
      res.status(500).json({
        message: `(${MODEL.name}) Unsuccessful Insertion ${err}`
      });
    }
  }
}

async function selectOne(req, res) {
  try {
    const patient = await MODEL.findOne({
      where: { dni: req.params.dni },
    });

    res.status(200).json({
      message: `(${MODEL.name}) Successful Selection`,
      body: patient,
    });
  }
  catch (err) {
    res.status(500).json({
      message: `(${MODEL.name}) Unsuccessful Selection ${err}`
    });
  }
}

async function selectAll(req, res) {
  try {
    const getAll = req.params.dni === `undefined`;
    const CONDITION_DNI = getAll
      ? { dni: { [Op.not]: null } }  
      : { dni: { [Op.like]: `${req.params.dni}%` } };

    const patients = await MODEL.findAll({
      include: [{
        model: Admission,
        as: `patient_admission`,
        required: false
      }],
      where: {
        ...CONDITION_DNI,
        "$patient_admission.patient_dni$": null
      },
      attributes: [
        "dni", "nombre", "apellido", "contacto",
        "email", "direccion", "estado_civil",
        "sexo", "edad", "contacto_particular",
        "fecha_nacimiento"
      ]
    });

    res.status(200).json({
      message: `(${MODEL.name}) Successful All Selections`,
      body: patients,
    });
  }
  catch (err) {
    res.status(500).json({
      message: `(${MODEL.name}) Unsuccessful All Selections ${err}`
    });
  }
}

async function update(req, res) {
  try {
    const affectedRows = await MODEL.update(req.body, {
      where: { dni: req.params.dni }
    });

    res.status(200).json({
      message: `(${MODEL.name}) Successful Update`,
      body: `Affected Rows: ${affectedRows}`,
    });
  }
  catch (err) {
    res.status(500).json({
      message: `(${MODEL.name}) Unsuccessful Update ${err}`
    });
  }
}

async function remove(req, res) {
  try {
    const affectedRows = await MODEL.destroy({
      where: { dni: req.params.dni }
    });

    res.status(200).json({
      message: `(${MODEL.name}) Successful Removal`,
      body: `Affected Rows: ${affectedRows}`,
    });
  }
  catch (err) {
    res.status(500).json({
      message: `(${MODEL.name}) Unsuccessful Removal ${err}`
    });
  }
}

module.exports = {
  insert,
  selectOne,
  selectAll,
  update,
  remove,
};