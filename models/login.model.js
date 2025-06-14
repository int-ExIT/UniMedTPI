module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define("Login", {
    user_dni: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      unique: true,
    },
    user_name: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
    user_pass: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
    indexes: [
      {
        unique: true,
        fields: ["user_name"],
      }
    ],
  });

  // --------------------------------------- DEFINE ASSOCIATION ---
  Login.associate = models => {
    Login.belongsTo(models.User, {
      foreignKey: "user_dni",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Login;
};