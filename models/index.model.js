const sequelize = require("../config/bdd");
const { DataTypes } = require("sequelize");

// ---------------------------------------------- IMPORT MODELS ---
const Bed = require("./bed.model")(sequelize, DataTypes);
const User = require("./user.model")(sequelize, DataTypes);
const Study = require("./study.model")(sequelize, DataTypes);
const Login = require("./login.model")(sequelize, DataTypes);
const Patient = require("./patient.model")(sequelize, DataTypes);
const Admission = require("./admission.model")(sequelize, DataTypes);
const Specialty = require("./specialty.model")(sequelize, DataTypes);
const Medical_History = require("./medicalHistory.model")(sequelize, DataTypes);

// ----------------------------------------------- CARGA MODELS ---
const models = {
  Bed: Bed,
  User: User,
  Study: Study,
  Login: Login,
  Patient: Patient,
  Admission: Admission,
  Specialty: Specialty,
  Medical_History: Medical_History,
};

// ------------------------------------------- ASSOCIATE MODELS ---
Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

// ----------------------------------------------- CARGA DE BDD ---
async function loadTables(force) {
  try {
    await sequelize.sync({ force });
    console.log(`Tables Loaded Successfully`);
  }
  catch (err) { console.error(`Error Loading Tables: ${err}`); }
}
loadTables(true);

module.exports = {
  Admission,
  Patient,
  Study,
  Bed,
};