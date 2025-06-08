module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        dni: 12345678,
        nombre: 'John',
        apellido: 'Doe',
        contacto: 1234567890,
        email: 'johnd@gmail.com',
        sexo: 'hombre',
        edad: 49,
        rol: 'medico',
        turno: 'tarde',
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date()
      },
      {
        dni: 87654321,
        nombre: 'Dolly',
        apellido: 'Doe',
        contacto: 1098765432,
        email: 'dollyd@gmail.com',
        sexo: 'mujer',
        edad: 27,
        rol: 'enfermera',
        turno: 'tarde',
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date()
      },
      {
        dni: 12876123,
        nombre: 'Grace',
        apellido: 'Robbie',
        contacto: 1234020202,
        email: 'rgrace@gmail.com',
        sexo: 'mujer',
        edad: 31,
        rol: 'recepcionista',
        turno: 'tarde',
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date()
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {
      dni: [12345678, 87654321, 12876123],
    }, {});
  }
};