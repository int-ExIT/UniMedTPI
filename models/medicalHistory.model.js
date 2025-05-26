module.exports = (sequelize, DataTypes) => {
  const Medical_History = sequelize.define("Medical_History", {
    patient_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    enfermedades_previas: {
      type: DataTypes.STRING(2000),
      defaultValue: "ninguna",
      allowNull: false,
    },
    intervenciones_previas: {
      type: DataTypes.STRING(2000),
      defaultValue: "ninguna",
      allowNull: false,
    },
    alergias: {
      type: DataTypes.STRING(2000),
      defaultValue: "ninguna",
      allowNull: false,
    },
    vacunas: {
      type: DataTypes.STRING(2000),
      defaultValue: "ninguna",
      allowNull: false,
    },
    medicamentos_actuales: {
      type: DataTypes.STRING(2000),
      defaultValue: "ninguno",
      allowNull: false,
    },
    enfermedades_hereditarias: {
      type: DataTypes.STRING(2000),
      defaultValue: "ninguna",
      allowNull: false,
    },
    dieta: {
      type: DataTypes.STRING(2000),
      defaultValue: "ninguna",
      allowNull: false,
    },
    insomnio: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    sustancias: {
      type: DataTypes.ENUM("tabaco", "alcohol", "drogas", "ninguna"),
      defaultValue: "ninguna",
      allowNull: false,
    },
    embarazo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    hijos: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: 0,
    },
    abortos: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: 0,
    },
    metodos_anticonceptivos: {
      type: DataTypes.STRING(1000),
      defaultValue: "ninguno",
      allowNull: false,
    },
    convulciones: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    enfermedades_respiratorias: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    enfermedades_cardiovasculares: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {});

  // --------------------------------------- DEFINE ASSOCIATION ---
  Medical_History.associate = models => {
    Medical_History.belongsTo(models.Patient, {
      foreignKey: "patient_id",
      as: "patient",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Medical_History;
};