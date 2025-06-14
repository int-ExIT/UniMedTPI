module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Admissions", [
      // Pacientes internados  
      {
        user_dni: 20000001, // recepcionista mañana
        patient_dni: 10123123, // hombre
        room_number: 602, // rehabilitacion
        motivo: "cita medica",
        sintomas: "procedimentos postquirurjicos",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000002, // recepcionista tarde
        patient_dni: 12123123, // mujer
        room_number: 202, // hospitalización
        motivo: "derivacion",
        sintomas: "dificultad para respirar",
        ingreso: new Date(2025, 6, 2, 10, 0),
        egreso: null,
      },
      {
        user_dni: 20000003, // recepcionista noche
        patient_dni: 13123123, // hombre
        room_number: 203, // hospitalización
        motivo: "urgencia",
        sintomas: "dolor en el pecho",
        ingreso: new Date(2025, 6, 2, 11, 0),
        egreso: null,
      },
      {
        user_dni: 20000004,
        patient_dni: 14123123, // mujer
        room_number: 601, // rehabilitacion
        motivo: "cita medica",
        sintomas: "tratamiento de rotula",
        ingreso: new Date(2025, 6, 2, 9, 30),
        egreso: null,
      },
      {
        user_dni: 20000005,
        patient_dni: 15123123, // hombre
        room_number: 702, // salud mental
        motivo: "derivacion",
        sintomas: "perdida de memoria severa",
        ingreso: new Date(2025, 6, 2, 10, 15),
        egreso: null,
      },
      {
        user_dni: 20000006,
        patient_dni: 16123123, // mujer
        room_number: 206, // hospitalización
        motivo: "urgencia",
        sintomas: "dificultad para respirar",
        ingreso: new Date(2025, 6, 2, 12, 0),
        egreso: null,
      },
      {
        user_dni: 20000007,
        patient_dni: 17123123, // hombre
        room_number: 207, // hospitalización
        motivo: "cita medica",
        sintomas: "fatiga extrema, dificultad para caminar",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000008,
        patient_dni: 18123123, // mujer
        room_number: 208, // hospitalización
        motivo: "derivacion",
        sintomas: "dolor en el abdomen",
        ingreso: new Date(2025, 6, 2, 10, 0),
        egreso: null,
      },
      {
        user_dni: 20000009,
        patient_dni: 19123123, // hombre
        room_number: 209, // hospitalización
        motivo: "urgencia",
        sintomas: "lesión en la pierna",
        ingreso: new Date(2025, 6, 2, 11, 30),
        egreso: null,
      },
      {
        user_dni: 20000010,
        patient_dni: 20123123, // mujer
        room_number: 210, // hospitalización
        motivo: "cita medica",
        sintomas: "malestar general",
        ingreso: new Date(2025, 6, 2, 9, 30),
        egreso: null,
      },
      {
        user_dni: 20000011,
        patient_dni: 21123123, // hombre
        room_number: 211, // hospitalización
        motivo: "derivacion",
        sintomas: "dolor muscular intenso",
        ingreso: new Date(2025, 6, 2, 10, 30),
        egreso: null,
      },
      {
        user_dni: 20000012,
        patient_dni: 22123123, // mujer
        room_number: 212, // hospitalización
        motivo: "urgencia",
        sintomas: "fiebre y dolor de garganta",
        ingreso: new Date(2025, 6, 2, 12, 15),
        egreso: null,
      },
      {
        user_dni: 20000013,
        patient_dni: 23123123, // hombre
        room_number: 213, // hospitalización
        motivo: "cita medica",
        sintomas: "dolor abdominal",
        ingreso: new Date(2025, 6, 2, 9, 45),
        egreso: null,
      },
      {
        user_dni: 20000014,
        patient_dni: 24123123, // mujer
        room_number: 214, // hospitalización
        motivo: "derivacion",
        sintomas: "dificultad para respirar",
        ingreso: new Date(2025, 6, 2, 10, 45),
        egreso: null,
      },
      {
        user_dni: 20000015,
        patient_dni: 25123123, // hombre
        room_number: 215, // hospitalización
        motivo: "urgencia",
        sintomas: "dolor en el pecho",
        ingreso: new Date(2025, 6, 2, 11, 0),
        egreso: null,
      },
      {
        user_dni: 20000016,
        patient_dni: 26123123, // mujer
        room_number: 216, // hospitalización
        motivo: "cita medica",
        sintomas: "migranas frecuentes",
        ingreso: new Date(2025, 6, 2, 9, 30),
        egreso: null,
      },
      {
        user_dni: 20000017,
        patient_dni: 27123123, // hombre
        room_number: 217, // hospitalización
        motivo: "derivacion",
        sintomas: "dolor abdominal",
        ingreso: new Date(2025, 6, 2, 10, 0),
        egreso: null,
      },
      {
        user_dni: 20000018,
        patient_dni: 28123123, // mujer
        room_number: 218, // urgencias
        motivo: "urgencia",
        sintomas: "dificultad para respirar",
        ingreso: new Date(2025, 6, 2, 11, 15),
        egreso: null,
      },
      {
        user_dni: 20000020,
        patient_dni: 30123123, // mujer
        room_number: 220, // hospitalización
        motivo: "derivacion",
        sintomas: "dolor en el abdomen",
        ingreso: new Date(2025, 6, 2, 10, 30),
        egreso: null,
      },
      {
        user_dni: 20000002, // recepcionista tarde
        patient_dni: 31123123, // hombre
        room_number: 301, // urgencias
        motivo: "cita medica",
        sintomas: "fiebre alta, tos persistente",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000003, // recepcionista noche
        patient_dni: 32123123, // mujer
        room_number: 302, // urgencias
        motivo: "derivacion",
        sintomas: "dificultad para respirar, dolor en el pecho",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000004, // recepcionista mañana
        patient_dni: 33123123, // hombre
        room_number: 303, // urgencias
        motivo: "urgencia",
        sintomas: "sangrado nasal, mareos",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000006, // recepcionista noche
        patient_dni: 47123123, // mujer
        room_number: 212, // hospitalizacion
        motivo: "derivacion",
        sintomas: "dolor en el pecho, dificultad para respirar",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000007, // recepcionista mañana
        patient_dni: 48123123, // hombre
        room_number: 211, // hospitalizacion
        motivo: "urgencia",
        sintomas: "desmayo, sudoración excesiva",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000008, // recepcionista tarde
        patient_dni: 10752234, // hombre
        room_number: 213, // hospitalización
        motivo: "cita medica",
        sintomas: "dolor en el cuello, mareos",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000009, // recepcionista noche
        patient_dni: 10752235, // mujer
        room_number: 214, // hospitalización
        motivo: "derivacion",
        sintomas: "dolor intenso en el abdomen, náuseas",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000010, // recepcionista mañana
        patient_dni: 10752236, // hombre
        room_number: 215, // urgencias
        motivo: "urgencia",
        sintomas: "vómitos, dolor de cabeza",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000011, // recepcionista tarde
        patient_dni: 10752237, // mujer
        room_number: 216, // hospitalización
        motivo: "cita medica",
        sintomas: "dolor lumbar, fiebre",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000012, // recepcionista noche
        patient_dni: 10752238, // mujer
        room_number: 218, // hospitalización
        motivo: "derivacion",
        sintomas: "dolor en la pierna, inflamación",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000013, // recepcionista mañana
        patient_dni: 10752239, // hombre
        room_number: 217, // hospitalización
        motivo: "urgencia",
        sintomas: "sangrado, presión arterial baja",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000014, // recepcionista tarde
        patient_dni: 10752240, // mujer
        room_number: 220, // hospitalización
        motivo: "cita medica",
        sintomas: "dolor en el estómago, vómitos",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000016, // recepcionista mañana
        patient_dni: 10752242, // mujer
        room_number: 401, // cuidados intensivos
        motivo: "urgencia",
        sintomas: "confusión, debilidad en un lado del cuerpo",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000017, // recepcionista tarde
        patient_dni: 10752243, // hombre
        room_number: 402, // cuidados intensivos
        motivo: "cita medica",
        sintomas: "dolor en el pecho, palpitaciones",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000018, // recepcionista noche
        patient_dni: 10752244, // mujer
        room_number: 403, // cuidados intensivos
        motivo: "derivacion",
        sintomas: "desorientación, mareos",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000005, // recepcionista tarde
        patient_dni: 34123123, // mujer
        room_number: 405, // cuidados intensivos
        motivo: "cita medica",
        sintomas: "dolor abdominal, náuseas",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000015, // recepcionista noche
        patient_dni: 10752241, // hombre
        room_number: 407, // cuidados intensivos
        motivo: "derivacion",
        sintomas: "dolor en el pecho, dificultad para respirar",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: null,
      },
      {
        user_dni: 20000019,
        patient_dni: 29123123, // hombre
        room_number: 408, //cuidados intensivos
        motivo: "cita medica",
        sintomas: "fatiga extrema",
        ingreso: new Date(2025, 6, 2, 9, 15),
        egreso: null,
      },

      // Pacientes que ya recibieron el alta
      {
        user_dni: 20000001, // recepcionista mañana
        patient_dni: 35123123, // hombre
        room_number: 101, // consulta general
        motivo: "cita medica",
        sintomas: "dolor abdominal leve",
        ingreso: new Date(2025, 6, 1, 9, 0), // horario de la mañana
        egreso: new Date(2025, 6, 1, 12, 0), // alta en la misma jornada
      },
      {
        user_dni: 20000002, // recepcionista mañana
        patient_dni: 36123123, // mujer
        room_number: 102, // consulta general
        motivo: "derivacion",
        sintomas: "fiebre moderada, tos persistente",
        ingreso: new Date(2025, 6, 1, 9, 30),
        egreso: new Date(2025, 6, 1, 11, 0),
      },
      {
        user_dni: 20000003, // recepcionista tarde
        patient_dni: 37123123, // hombre
        room_number: 103, // consulta general
        motivo: "urgencia",
        sintomas: "dolor en el pecho, dificultad para respirar",
        ingreso: new Date(2025, 6, 1, 14, 0),
        egreso: new Date(2025, 6, 1, 16, 0),
      },
      {
        user_dni: 20000004, // recepcionista tarde
        patient_dni: 38123123, // mujer
        room_number: 104, // consulta general
        motivo: "cita medica",
        sintomas: "dolor de cabeza intenso, mareos",
        ingreso: new Date(2025, 6, 1, 14, 30),
        egreso: new Date(2025, 6, 1, 17, 0),
      },
      {
        user_dni: 20000005, // recepcionista noche
        patient_dni: 39123123, // hombre
        room_number: 105, // consulta especializada
        motivo: "derivacion",
        sintomas: "problemas gastrointestinales persistentes",
        ingreso: new Date(2025, 6, 1, 22, 0),
        egreso: new Date(2025, 6, 1, 23, 0),
      },
      {
        user_dni: 20000006, // recepcionista noche
        patient_dni: 40123123, // hombre
        room_number: 106, // consulta especializada
        motivo: "urgencia",
        sintomas: "intenso dolor lumbar, fiebre alta",
        ingreso: new Date(2025, 6, 1, 23, 30),
        egreso: new Date(2025, 6, 1, 23, 59),
      },
      {
        user_dni: 20000001, // recepcionista mañana
        patient_dni: 41123123, // mujer
        room_number: 201, // habitacion de hospitalizacion
        motivo: "cita medica",
        sintomas: "presión arterial alta, mareos",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: new Date(2025, 6, 2, 14, 0),
      },
      {
        user_dni: 20000002, // recepcionista mañana
        patient_dni: 42123123, // hombre
        room_number: 202, // habitacion de hospitalizacion
        motivo: "derivacion",
        sintomas: "dolor en la pierna izquierda, inflamación",
        ingreso: new Date(2025, 6, 2, 9, 30),
        egreso: new Date(2025, 6, 2, 14, 0),
      },
      {
        user_dni: 20000003, // recepcionista tarde
        patient_dni: 43123123, // mujer
        room_number: 203, // habitacion de hospitalizacion
        motivo: "urgencia",
        sintomas: "dificultad para respirar, tos con sangre",
        ingreso: new Date(2025, 6, 2, 14, 0),
        egreso: new Date(2025, 6, 2, 18, 0),
      },
      {
        user_dni: 20000004, // recepcionista tarde
        patient_dni: 44123123, // hombre
        room_number: 204, // habitacion de hospitalizacion
        motivo: "cita medica",
        sintomas: "dolor de espalda persistente, fiebre baja",
        ingreso: new Date(2025, 6, 2, 14, 30),
        egreso: new Date(2025, 6, 2, 17, 0),
      },
      {
        user_dni: 20000005, // recepcionista noche
        patient_dni: 45123123, // mujer
        room_number: 301, // urgencias
        motivo: "urgencia",
        sintomas: "fractura en el brazo izquierdo, sangrado",
        ingreso: new Date(2025, 6, 2, 22, 0),
        egreso: new Date(2025, 6, 2, 23, 30),
      },
      {
        user_dni: 20000006, // recepcionista noche
        patient_dni: 46123123, // hombre
        room_number: 302, // urgencias
        motivo: "urgencia",
        sintomas: "desmayo, pérdida de conocimiento",
        ingreso: new Date(2025, 6, 2, 22, 30),
        egreso: new Date(2025, 6, 2, 23, 30),
      },
      {
        user_dni: 20000001, // recepcionista mañana
        patient_dni: 10752245, // hombre
        room_number: 303, // urgencias
        motivo: "cita medica",
        sintomas: "fatiga extrema, dificultad para caminar",
        ingreso: new Date(2025, 6, 2, 9, 0),
        egreso: new Date(2025, 6, 2, 12, 0),
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Admissions", null, {});
  },
};

/* Pacientes que recibieron el alta:
35123123 hombre, 36123123 mujer, 37123123 hombre, 38123123 mujer, 39123123 hombre, 40123123 hombre, 41123123 mujer, 42123123 hombre, 43123123 mujer, 44123123 hombre, 45123123 mujer, 46123123 hombre, 10752245 hombre

Pacientes que aun no lo reciben:
10123123 hombre, 12123123 mujer, 13123123 hombre, 14123123 mujer, 15123123 hombre, 16123123 mujer, 17123123 hombre, 18123123 mujer, 19123123 hombre, 20123123 mujer, 21123123 hombre, 22123123 mujer, 23123123 hombre, 24123123 mujer, 25123123 hombre, 26123123 mujer, 27123123 hombre, 28123123 mujer, 29123123 hombre, 30123123 mujer, 31123123 hombre, 32123123 mujer, 33123123 hombre, 34123123 mujer, 47123123 mujer, 48123123 hombre, 10752234 hombre, 10752235 mujer, 10752236 hombre, 10752237 mujer, 10752238 mujer, 10752239 hombre, 10752240 mujer, 10752241 hombre, 10752242 mujer, 10752243 hombre, 10752244 mujer */