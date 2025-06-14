module.exports = (sequelize, DataTypes) => {
  const Study = sequelize.define("Study", {
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
    tipo_estudio: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    detalle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    triage: {
      type: DataTypes.ENUM("reanimacion", "emergencia", "urgencia", "semiurgencia", "no urgente"),
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
  });

  Study.associate = models => {
    Study.belongsTo(models.User, {
      foreignKey: "user_dni",
      as: "user_study",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Study.belongsTo(models.Patient, {
      foreignKey: "patient_dni",
      as: "patient_study",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Study;
};