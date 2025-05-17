module.exports = (sequelize, DataTypes) => {
  const Bed = sequelize.define(`Bed`, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    ala: {
      type: DataTypes.ENUM(`norte`, `sur`, `este`, `oeste`),
      allowNull: false,
    },
    numero_habitacion: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    capacidad: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: [[1, 2]],
      },
    },
    estado: {
      type: DataTypes.ENUM(`limpia`, `por limpiar`),
      allowNull: false,
    },
    restrict_genero: {
      type: DataTypes.ENUM(`hombre`, `mujer`, `none`),
      allowNull: false,
      defaultValue: `none`,
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    timestamps: false,
  });

  // --------------------------------------- DEFINE ASSOCIATION ---
  Bed.associate = models => {
    Bed.hasOne(models.Admission, {
      foreignKey: `bed_id`,
      as: `admission`,
      onDelete: `CASCADE`,
      onUpdate: `CASCADE`,
    });
  };

  return Bed;
};