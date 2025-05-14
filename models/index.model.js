const sequelize = require(`../config/bdd`);
const { DataTypes } = require(`sequelize`);

// ---------------------------------------------- IMPORT MODELS ---
const User = require(`./user.model`);
const Login = require(`./login.model`);
const Patient = require(`./patient.model`);
const Admission = require(`./admission.model`);

// ----------------------------------------------- CARGA MODELS ---
const models = {
  User: User(sequelize, DataTypes),
  Login: Login(sequelize, DataTypes),
  Patient: Patient(sequelize, DataTypes),
  Admission: Admission(sequelize, DataTypes),
};

// ------------------------------------------- ASSOCIATE MODELS ---
Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

// ----------------------------------------------- CARGA DE BDD ---
async function loadTables(force) {
  try {
    await sequelize.sync({force: force}); // CAMBIAR POR false
    console.log(`Tablas cargadas correctamente`);
  }
  catch(err) {
    console.error(`Error al cargar las tablas: ${err}`);
  }
}

module.exports = loadTables;