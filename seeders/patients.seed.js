const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PATIENTS = [];
    for (let i = 0; i < 100; i++) {
      const dni = 10000000 + i;
      const contacto = 1234000000 + i * 958;
      const contacto_particular = 1234000000 + i * 327;
      const edad = Math.floor(Math.random() * 50) + 18;
      const sexo = (Math.random() > 0.5) ? "hombre" : "mujer";
      const nombres = [
        "Ana", "Alejandro", "Alicia", "Armando", "Anai", "Aron",
        "Camila", "Carlos", "Candela", "Carla", "Clara", "Cielo",
        "Dario", "Dalila", "Daiana", "Damian", "Denis", "Day",
        "Esteban", "Ester", "Ernesto", "Elisa", "Elias", "Elena",
        "Mario", "Maria", "Mariano", "Melisa", "Mia", "Matias",
        "Jeremias", "Jimena", "Jasmin", "Juana", "Jose", "Juan",
      ];
      const apellidos = [
        "Arias", "Arce", "Amaya", "Alcaraz", "Anis", "Abedul",
        "Jeres", "Torres", "Barroso", "Novillo", "Gil", "Gomez",
        "Messi", "Villegas", "Sosa", "Lucero", "Correa", "Nodar",
        "Busto", "Contrera", "Diaz", "Rojo", "Suarez", "Leyes",
        "Ribba", "Peres", "Cuaranta", "Rojas", "Castro", "Vilela",
        "Rivarola", "Olguin", "Luna", "Sulgay", "Lopes", "Dartes",
      ];

      const nombre = faker.helpers.arrayElement(nombres);
      const apellido = faker.helpers.arrayElement(apellidos);
      const email = faker.internet.email(nombre, apellido);
      const direccion = faker.location.streetAddress();
      const estado_civil = faker.helpers.arrayElement([
        "soltero",
        "casado",
        "viudo",
        "divorciado",
      ]);
      const fecha_nacimiento = new Date(
        new Date().setFullYear(new Date().getFullYear() - edad)
      );

      PATIENTS.push({
        dni,
        nombre,
        apellido,
        contacto,
        email,
        direccion,
        estado_civil,
        sexo,
        edad,
        contacto_particular,
        fecha_nacimiento,
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date()
      });
    }
    await queryInterface.bulkInsert("Patients", PATIENTS, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Patients", {
      dni: Array.from({ length: 100 }, (_, i) => 10000000 + i)
    }, {});
  }
};