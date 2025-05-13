module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(`Patient`, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    nombres: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      unique: true,
    },
    numero_cel: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    direccion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    estado_civil: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    sexo: {
      type: DataTypes.ENUM(`hombre`, `mujer`),
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    contacto_particular: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: [`dni`, `id`],
      }
    ]
  });

  // --------------------------------------- DEFINE ASSOCIATION ---
  Patient.associate = models => {
    Patient.belongsToMany(models.User, {
      through: models.Admission,
      foreignKey: `patient_id`,
      as: `admission`
    });
  };

  return Patient;
};