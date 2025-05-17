const sequelize = require(`../config/bdd`);
const { DataTypes } = require(`sequelize`);

// ---------------------------------------------- IMPORT MODELS ---
const Bed = require(`./bed.model`);
const User = require(`./user.model`);
const Study = require(`./study.model`);
const Login = require(`./login.model`);
const Patient = require(`./patient.model`);
const Admission = require(`./admission.model`);
const Specialty = require(`./specialty.model`);
const Medical_History = require(`./medicalHistory.model`);

// ----------------------------------------------- CARGA MODELS ---
const models = {
  Bed: Bed(sequelize, DataTypes),
  User: User(sequelize, DataTypes),
  Study: Study(sequelize, DataTypes),
  Login: Login(sequelize, DataTypes),
  Patient: Patient(sequelize, DataTypes),
  Admission: Admission(sequelize, DataTypes),
  Specialty: Specialty(sequelize, DataTypes),
  Medical_History: Medical_History(sequelize, DataTypes),
};

// ------------------------------------------- ASSOCIATE MODELS ---
Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

// ----------------------------------------------- CARGA DE BDD ---
async function loadTables(force) {
  try {
    await sequelize.sync({ force: force });
    console.log(`Tablas cargadas correctamente`);
  }
  catch (err) {
    console.error(`Error al cargar las tablas: ${err}`);
  }
}

module.exports = loadTables;