const { Login: MODEL, User } = require('../models/index.model');
const bcrypt = require('bcrypt');
const config = require('../config');
const jwt = require('jsonwebtoken');

async function selectOne(req, res) {
  const { username, password } = req.params;

  try {
    // Recupero el elemento
    const element = await MODEL.findOne({
      include: [{
        model: User,
        as: "user",
        attributes: ["rol"],
      }],
      where: { user_name: username }
    });

    // Corroboro que este exista
    if (!element) return res.status(204).send();

    // De existir comrpuebo que las contrasenias coincidan
    const isValid = await bcrypt.compare(password, element.user_pass);

    if (!isValid) return res.status(401).json({
      message: `The Password is Not Valid`
    });

    // Establezco los roles que puede tener el usuario
    const rolUser = {
      Recepcionista: '/admission',
      Enfermero: '/nurse',
      Medico: '/doctor'
    };

    // De ser correctos los datos instancio el token
    const token = jwt.sign(
      {
        user: element.user_name,
        dni: element.user_dni,
        rol: element.user.rol,
      },
      config.jwt.secret_key,
      {
        expiresIn: '1h',
      }
    )

    // Guardo el token en las cookies
    res.cookie(`access_token`, token, {
      httpOnly: true, // La cookie solo es accesible en el servidor
      sameSite: `strict`, // La cookie solo es accesible en el mismo dominio
      maxAge: 1000 * 60 * 60, // La cookie sera valida por una hora
    }).status(200).json({
      message: `(${MODEL.name}) Successful Selection`,
      body: rolUser[element.user.rol]
    });
  } catch (err) {
    res.status(500).json({
      message: `(${MODEL.name}) Unsuccessful Selection ${err}`
    });
  }
}

module.exports = { selectOne };