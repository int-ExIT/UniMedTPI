module.exports = (sequelize, DataTypes) => {
  const Admission = sequelize.define("Admission", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    user_dni: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      unique: false,
    },
    patient_dni: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      unique: false,
    },
    room_number: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      unique: false,
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
    Admission.belongsTo(models.User, {
      foreignKey: "user_dni",
      as: "user_admission",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Admission.belongsTo(models.Patient, {
      foreignKey: "patient_dni",
      as: "patient_admission",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Admission.belongsTo(models.Bed, {
      foreignKey: "room_number",
      as: "bed",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Admission;
};