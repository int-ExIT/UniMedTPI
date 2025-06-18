module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define("Patient", {
    dni: {
      type: DataTypes.INTEGER(8),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    contacto: {
      type: DataTypes.BIGINT(10),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    estado_civil: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    sexo: {
      type: DataTypes.ENUM("hombre", "mujer"),
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    contacto_particular: {
      type: DataTypes.BIGINT(10),
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
    indexes: [
      {
        unique: true,
        fields: ["dni"],
      }
    ],
  });

  // --------------------------------------- DEFINE ASSOCIATION ---
  Patient.associate = models => {
    Patient.hasOne(models.Medical_History, {
      foreignKey: "patient_dni",
      as: "patient_medical_history",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Patient.hasMany(models.Admission, {
      foreignKey: "patient_dni",
      as: "patient_admission",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Patient.hasMany(models.Study, {
      foreignKey: "patient_dni",
      as: "patient_study",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Patient;
};