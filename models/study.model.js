module.exports = (sequelize, DataTypes) => {
  const Study = sequelize.define("Study", {
    user_dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    patient_dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    tipo_estudio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resultado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
  });

  return Study;
};