module.exports = (sequelize, DataTypes) => {
  const Admission = sequelize.define(`Admission`, {
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
    bed_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sintomas: {
      type: DataTypes.STRING,
      defaultValue: `none`,
    },
    ingreso: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    egreso: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  }, {
    timestamps: false,
  });

  return Admission;
};