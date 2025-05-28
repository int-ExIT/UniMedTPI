const { Patient: MODEL } = require("../models/index.model");

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
        message: `(${MODEL.name}) Unsuccessful Insertion`,
        body: `Error: ${err}`,
      });
    }
  }
}

async function selectOne(req, res) {
  try {
    const patient = await MODEL.findOne({
      where: { dni: req.params.dni }
    });

    res.status(200).json({
      message: `(${MODEL.name}) Successful Selection`,
      body: patient,
    });
  }
  catch (err) {
    res.status(500).json({
      message: `(${MODEL.name}) Unsuccessful Selection`,
      body: `Error: ${err}`,
    });
  }
}

async function selectAll(req, res) {
  try {
    const patients = await MODEL.findAll();
    
    res.status(200).json({ 
      message: `(${MODEL.name}) Successful All Selections`, 
      body: patients,
    });
  }
  catch (err) {
    res.status(500).json({ 
      message: `(${MODEL.name}) Unsuccessful All Selections`, 
      body: `Error: ${err}`,
    });
  }
}

async function update(req, res) {
  try {
    const affectedRows = await MODEL.update(req.body, {
      where: { id: req.params.id }
    });
    
    res.status(200).json({ 
      message: `(${MODEL.name}) Successful Update`, 
      body: `Affected Rows: ${affectedRows}`, 
    });
  }
  catch (err) {
    res.status(500).json({ 
      message: `(${MODEL.name}) Unsuccessful Update`, 
      body: `Error: ${err}`, 
    });
  }
}

async function remove(req, res) {
  try {
    const affectedRows = await MODEL.destroy({
      where: { id: req.params.id }
    });
    
    res.status(200).json({ 
      message: `(${MODEL.name}) Successful Removal`, 
      body: `Affected Rows: ${affectedRows}`, 
    });
  }
  catch (err) {
    res.status(500).json({ 
      message: `(${MODEL.name}) Unsuccessful Removal`, 
      body: `Error: ${err}`, 
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