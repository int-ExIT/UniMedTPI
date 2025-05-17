module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(`User`, {
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
      // Sequelize tiene su propio validador de emails
      validate: {
        isEmail: true,
      },
    },
    sexo: {
      type: DataTypes.ENUM(`hombre`, `mujer`),
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    turno: {
      type: DataTypes.ENUM(`mañana`, `tarde`, `noche`),
      allowNull: false,
    },
  }, {}); // El tercer parametro del metodo '.define()' sirve para controlar los comportamientos de la tabla

  // --------------------------------------- DEFINE ASSOCIATION ---
  User.associate = models => {
    /**
     * Para relaciones de uno a uno usar '.hasOne()' en el modelo fuerte, y '.belongsTo()'
     * en el modelo debil
     */
    User.hasOne(models.Login, {
      foreignKey: `user_id`,
      as: `login`,
      onDelete: `CASCADE`,
      onUpdate: `CASCADE`,
    });

    User.hasOne(models.Specialty, {
      foreignKey: `user_id`,
      as: `specialty`,
      onDelete: `CASCADE`,
      onUpdate: `CASCADE`,
    });

    /**
     * Para relaciones de muchos a muchos usar '.belongsToMany()' en ambos modelos a relacionar
     * 
     * No es necesario agregar ningun associate en la tabla intermediaria ('through:')
    */
    User.belongsToMany(models.Patient, {
      through: models.Admission,
      foreignKey: `user_id`,
      as: `admission`,
    });

    User.belongsToMany(models.Patient, {
      through: models.Study,
      foreignKey: `user_id`,
      as: `study`,
    });
  };

  return User;
};