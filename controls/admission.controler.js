const { Admission: MODEL } = require("../models/index.model");
const { Op } = require("sequelize");

// AGREGAR LA OPCION DE BUSCAR YA SEA POR EL DNI DEL PACIENTE O EL DEL USUARIO...

async function insert(req, res) {
  try {
    const element = await MODEL.create(req.body);

    res.status(201).json({
      message: `(${MODEL.name}) Successful Insertion`,
      body: element,
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
    const element = await MODEL.findOne({
      where: { patient_dni: req.params.patient_dni }
    });

    res.status(200).json({
      message: `(${MODEL.name}) Successful Selection`,
      body: element,
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
    let elements;
    
    if (req.params.patient_dni) elements = await MODEL.findAll({
      where: {
        patient_dni: {
          [Op.like]: `${req.params.patient_dni}%`
        }
      }
    });
    else elements = await MODEL.findAll();

    res.status(200).json({
      message: `(${MODEL.name}) Successful All Selections`,
      body: elements,
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
      where: { patient_dni: req.params.patient_dni }
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
      where: { patient_dni: req.params.patient_dni }
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