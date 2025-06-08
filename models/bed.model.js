module.exports = (sequelize, DataTypes) => {
  const Bed = sequelize.define("Bed", {
    room_number: {
      type: DataTypes.INTEGER(4),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    tipo_habitacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ala: {
      type: DataTypes.ENUM("norte", "sur", "este", "oeste"),
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
      type: DataTypes.ENUM("limpia", "por limpiar"),
      allowNull: false,
    },
    restriccion_genero: {
      type: DataTypes.ENUM("hombre", "mujer", "none"),
      allowNull: false,
      defaultValue: "none",
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
      foreignKey: "room_number",
      as: "admission",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Bed;
};