module.exports = (sequelize, DataTypes) => {
  const Study = sequelize.define(`Study`, {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    study_type: {
      type: DataTypes.ENUM(`revicion`, `estudio`),
      allowNull: false,
    },
    resultado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {});
  
  return Study;
};