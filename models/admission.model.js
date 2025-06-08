module.exports = (sequelize, DataTypes) => {
  const Admission = sequelize.define("Admission", {
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
    room_number: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      unique: true,
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sintomas: {
      type: DataTypes.STRING,
      defaultValue: "none",
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

  Admission.associate = models => {
    Admission.belongsTo(models.Bed, {
      foreignKey: "room_number",
      as: "bed",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Admission;
};