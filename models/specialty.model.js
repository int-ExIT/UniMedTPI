module.exports = (sequelize, DataTypes) => {
  const Specialty = sequelize.define("Specialty", {
    user_dni: {
      type: DataTypes.INTEGER(8),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    tipo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  // --------------------------------------- DEFINE ASSOCIATION ---
  Specialty.associate = models => {
    Specialty.belongsTo(models.User, {
      foreignKey: "user_dni",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Specialty;
};