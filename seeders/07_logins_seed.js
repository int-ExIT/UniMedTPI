const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Logins', [
      // Recepcionistas (6)
      // Turno mañana 
      {
        user_dni: 20000001,
        user_name: 'AnaLopez',
        user_pass: await bcrypt.hash('12345600', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000002,
        user_name: 'CarlosRamirez',
        user_pass: await bcrypt.hash('12345601', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      // Turno tarde 
      {
        user_dni: 20000003,
        user_name: 'LuisMartinez',
        user_pass: await bcrypt.hash('12345602', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000004,
        user_name: 'LuciaFernandez',
        user_pass: await bcrypt.hash('12345603', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      // Turno noche 
      {
        user_dni: 20000005,
        user_name: 'PedroLopez',
        user_pass: await bcrypt.hash('12345604', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000006,
        user_name: 'SofiaDiaz',
        user_pass: await bcrypt.hash('12345605', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      // Enfermeros (18)
      // Turno mañana
      {
        user_dni: 20000007,
        user_name: 'EvaSanchez',
        user_pass: await bcrypt.hash('12345606', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000008,
        user_name: 'JavierMorales',
        user_pass: await bcrypt.hash('12345607', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000009,
        user_name: 'LauraVargas',
        user_pass: await bcrypt.hash('12345608', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      // Turno tarde
      {
        user_dni: 20000010,
        user_name: 'MarcoParedes',
        user_pass: await bcrypt.hash('12345609', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000011,
        user_name: 'SaraCruz',
        user_pass: await bcrypt.hash('12345610', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000012,
        user_name: 'AndresLopez',
        user_pass: await bcrypt.hash('12345611', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      // Turno noche
      {
        user_dni: 20000013,
        user_name: 'MartaJimenez',
        user_pass: await bcrypt.hash('12345612', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000014,
        user_name: 'RobertoDiaz',
        user_pass: await bcrypt.hash('12345613', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000015,
        user_name: 'ClaraMartinez',
        user_pass: await bcrypt.hash('12345614', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      // Médicos (9)
      // Turno mañana
      {
        user_dni: 20000016,
        user_name: 'JuanLopez',
        user_pass: await bcrypt.hash('12345615', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000017,
        user_name: 'ElenaJuarez',
        user_pass: await bcrypt.hash('12345616', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000018,
        user_name: 'LauraAllende',
        user_pass: await bcrypt.hash('12345617', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      // Turno tarde
      {
        user_dni: 20000019,
        user_name: 'LuciaMartinez',
        user_pass: await bcrypt.hash('12345618', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000020,
        user_name: 'MarioMartinez',
        user_pass: await bcrypt.hash('12345619', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000021,
        user_name: 'DarioAvellaneda',
        user_pass: await bcrypt.hash('12345620', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      // Turno noche
      {
        user_dni: 20000022,
        user_name: 'CarlosGomez',
        user_pass: await bcrypt.hash('12345621', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000023,
        user_name: 'JosePepe',
        user_pass: await bcrypt.hash('12345622', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
      {
        user_dni: 20000024,
        user_name: 'LazaroGane',
        user_pass: await bcrypt.hash('12345623', 10),
        fecha_creacion: new Date(2025, 6, 1),
        fecha_actualizacion: new Date(2025, 6, 1),
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Logins', null, {});
  },
};