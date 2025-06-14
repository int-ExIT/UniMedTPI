const {
  Admission: MODEL,
  Patient,
  Study,
  Bed
} = require("../models/index.model");
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
      attributes: ["egreso"],
      include: [{
        model: Patient,
        as: "patient_admission",
        attributes: [
          "dni", "nombre", "apellido",
          "contacto", "email", "direccion",
          "estado_civil", "sexo", "edad",
          "contacto_particular", "fecha_nacimiento"
        ],
        include: [{
          model: Study,
          as: "patient_study",
          attributes: ["triage"],
        }]
      }],
      where: { patient_dni: req.params.patient_dni },
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
    const getAll = req.params.patient_dni === `undefined`;
    const filter = req.params.filter === `not`;

    const CONDITION_DNI = (getAll) ? { [Op.not]: null } : { [Op.like]: `${req.params.patient_dni}%` };
    const CONDITION_EGRESS = (filter) ? { [Op.not]: null } : { [Op.is]: null };

    const elements = await MODEL.findAll({
      attributes: ["room_number", "ingreso", "egreso"],
      include: [
        {
          model: Bed,
          as: "bed",
          attributes: ["tipo_habitacion"]
        },
        {
          model: Patient,
          as: "patient_admission",
          attributes: [
            "dni", "nombre", "apellido", "contacto", 
            "email", "direccion", "estado_civil", 
            "sexo", "edad", "contacto_particular", 
            "fecha_nacimiento"
          ],
          include: [{
            model: Study,
            as: "patient_study",
            attributes: ["triage"],
          }]
        }
      ], where: {
        patient_dni: CONDITION_DNI,
        egreso: CONDITION_EGRESS
      }
    });

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
  update,
  remove,
  selectOne,
  selectAll,
};