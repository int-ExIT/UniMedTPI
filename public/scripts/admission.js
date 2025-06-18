import queryFetch from "./fetch.js";

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const formatDate = date => {
  date = (date.length > 11)
    ? date.substring(0, 10)
    : date;

  return date.split(`-`).reverse().join(`-`);
}

const PATIENTS = [];

// OTHERS
const $table = $("#main");
const $rooms = $("#tipo_habitacion");
const $div_patient = $("#main_r");
const $inputs_fecha = [$("#fecha_nacimiento"), $("#ingreso")];
const $div_admission = $("#l_main");
const $search_patient = $("#search");

// BUTTONS
const $buttons_forms = $$(".send");
const $button_emergency = $("#emergency");
const $button_new_patient = $("#new_patient");

// CHECKBOXS
const $no_admissions = $(`#sinAdm`);
const $pending_visits = $(`#pending`);
const $update_admission = $(`#update`);
const $program_admission = $("#program");
const $discharged_patients = $(`#filter`);

document.addEventListener("DOMContentLoaded", async () => {
  await recoverPatients();
  fillTableHeaders();
});

$button_new_patient.addEventListener("click", async function () {
  try { 
    const data = await queryFetch(`http://localhost:8000/patient/get-one/10123123`)
    
    console.log(`\nRESULTADO ==>> ${JSON.stringify(data)}`);
  } catch (err) { console.log(`\nERROR ${err}\n`); }






  if ($table.classList.contains(`right_shift`)) return;

  const $form = $div_patient.querySelector(`form`);

  this.innerHTML = (this.innerHTML === `Cancelar`)
    ? `Nuevo Paciente`
    : `Cancelar`;

  $form.querySelector(`button`).innerHTML = `Registrar`;
  $form.querySelectorAll(`input`).forEach($input => {
    $input.type = `text`;
    $input.value = ``;
  });
  $form.action = `http://localhost:8000/patient/new`;
  $form.name = `POST`;

  if (this.innerHTML === `Cancelar`) {
    $$(`.update`).forEach($btn => $btn.classList.add(`hidden_button`));
    $$(`.delete`).forEach($btn => $btn.classList.add(`hidden_button`));

    actViewPatient(true);
  } else {
    $$(`tr`).forEach($all_tr => $all_tr.className = ``);
    $$(`.update`).forEach($btn => $btn.classList.remove(`hidden_button`));
    $$(`.delete`).forEach($btn => {
      $btn.innerHTML = `Eliminar`;
      $btn.classList.remove(`cancel`);
      $btn.classList.remove(`hidden_button`)
    });

    actViewPatient(false);
  }
});

$button_emergency.addEventListener("click", () => {
  if ($table.classList.contains(`right_shift`)) {
    actViewAdmission(false);
    $$(`tr`).forEach($all_tr => $all_tr.className = ``);
    $$(`.update`).forEach($btn => $btn.classList.remove(`hidden_button`));
    $$(`.delete`).forEach($btn => {
      $btn.innerHTML = `Eliminar`;
      $btn.classList.remove(`cancel`);
      $btn.classList.remove(`hidden_button`)
    });
    setTimeout(() => actViewPatient(true), 1500);
  } else actViewPatient(true);


  const $form = $div_patient.querySelector(`form`);
  $form.querySelector(`button`).innerHTML = `Registrar`;
  $form.querySelectorAll(`input`).forEach($input => {
    if ($input.name !== `dni`) $input.type = `password`;
    $input.value = ``;
  });
  $form.action = `http://localhost:8000/patient/new`;
  $form.name = `POST`;

  // Set DNI
  const date = new Date();
  const dni = `${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  $(`#dni`).value = dni;
  $(`#nombre`).value = `USUARIO`;
  $(`#apellido`).value = `DE URGENCIA`;
  $(`#fecha_nacimiento`).value = `2000-01-01`;
  $(`#edad`).value = 99;
  $(`#direccion`).value = `UniMEd`;
  $(`#estado_civil`).value = `soltero`;
  $(`#contacto`).value = 1122345678;
  $(`#contacto_particular`).value = 1122345678;
  $(`#email`).value = `${dni}@gmail.com`;

  $button_new_patient.innerHTML = `Cancelar`;

  $$(`.update`).forEach($btn => $btn.classList.add(`hidden_button`));
  $$(`.delete`).forEach($btn => $btn.classList.add(`hidden_button`));

  $form.addEventListener(`submit`, newRegistration);

  async function newRegistration() {
    const admission = {
      user_dni: 20000001,
      patient_dni: dni,
      tipo_habitacion: `Quirofano`,
      room_number: 801,
      motivo: `Urgencia`,
      ingreso: new Date(),
      egreso: null,
      sintomas: `uniMed`,
    };
    const room = {
      restriccion_genero: $(`#sexo`).value,
      disponible: false,
    };

    try {
      await queryFetch(
        `http://localhost:8000/new`,
        `POST`,
        admission
      );

      await queryFetch(
        `http://localhost:8000/bed/801`,
        `PUT`,
        room
      );
    } catch (err) { console.error(`Emergency registration failure ${err}`); }

    $form.querySelectorAll(`input`).forEach($input => {
      $input.type = `text`;
      $input.value = ``;
    });

    $form.removeEventListener(`submit`, newRegistration);
  }
});

$discharged_patients.addEventListener("click", async function () {
  $pending_visits.checked = false;
  $no_admissions.checked = false;

  this.value = (this.checked) ? `not` : `is`;

  await filterPatients(this.checked);
});

$no_admissions.addEventListener("click", async function () {
  $discharged_patients.checked = false;
  $pending_visits.checked = false;

  await filterPatients(this.checked);
});

$pending_visits.addEventListener("click", async function () {
  $discharged_patients.checked = false;
  $no_admissions.checked = false;

  if (this.checked) {
    try {
      const data = await queryFetch(`http://localhost:8000/get-all-users`);

      PATIENTS.length = 0;

      for (const patient of data) {
        const {
          user_admission,
          patient_admission
        } = patient;

        const nombre = patient_admission.nombre;
        const apellido = patient_admission.apellido;
        const contacto = patient_admission.contacto;
        const email = patient_admission.email;
        const doctor = `${user_admission.nombre} ${user_admission.apellido}`
        const turno = formatDate(patient.ingreso);

        PATIENTS.push({ nombre, apellido, contacto, email, doctor, turno });
      }
    } catch (err) { console.error(`Failure ${err}`) }

    fillTableHeaders();

    $$(`.update`).forEach($btn => {
      $btn.classList.add(`hidden_button`);
    });
    $$(`.delete`).forEach($btn => {
      $btn.classList.add(`hidden_button`);
    });
  } else {
    $$(`.update`).forEach($btn => {
      $btn.classList.remove(`hidden_button`);
    });
    $$(`.delete`).forEach($btn => {
      $btn.classList.remove(`hidden_button`);
    });

    await recoverPatients();
    fillTableHeaders();
  }
});

$program_admission.addEventListener("click", function () {
  const $title = $div_admission.querySelector(`h2`);

  const $submit = $div_admission.querySelector(`button`);

  const $div_user = $(`#user_dni`).closest(`div`);

  const $room_number = $(`#room_number`);
  const $div_room = $room_number.closest(`div`);
  const $option = document.createElement(`option`);
  $option.innerHTML = 102;
  $option.value = 102;
  $room_number.appendChild($option);
  $room_number.value = 102;

  const $tipo_habitacion = $(`#tipo_habitacion`);
  const $div_categoria = $tipo_habitacion.closest(`div`);
  $tipo_habitacion.value = `Consulta General`;

  const $ingreso = $(`#ingreso`);
  const $div_ingreso = $ingreso.closest(`div`);
  $ingreso.value = ``;

  // Motivo: Solo Cita Medica
  const $motivo = $(`#motivo`);
  const $div_motivo = $motivo.closest(`div`);
  $motivo.value = `Cita Medica`;

  // Egreso: null
  const $egreso = $(`#egreso`);
  $egreso.value = null;

  if (this.checked) {
    $title.innerHTML = `Programar Cita Medica`

    $div_ingreso.style.display = `flex`;
    $div_user.style.display = `flex`;

    $div_categoria.style.display = `none`;
    $div_room.style.display = `none`;
    $div_motivo.style.display = `none`;

    $submit.innerHTML = `Reservar`;
  } else {
    $title.innerHTML = `Registrar Paciente`

    $div_ingreso.style.display = `none`;
    $div_user.style.display = `none`;

    $div_categoria.style.display = `flex`;
    $div_room.style.display = `flex`;
    $div_motivo.style.display = `flex`;

    $submit.innerHTML = `Registrar`;
  }
});

$search_patient.addEventListener("keyup", function (output) {
  const onlyNumbers = /^\d+$/.test(output.key) && /^\d+$/.test(this.value);
  const isBackspace = output.key === `Backspace`;
  const isEmpty = this.value.length === 0;

  if (onlyNumbers || isBackspace) {
    const patients = PATIENTS.filter(patient => {
      return patient.dni.toString().startsWith(this.value);
    });
    fillTableHeaders(patients);
  }

  if (isEmpty) fillTableHeaders();
});

// Busca y muestra las habitaciones disponibles
$rooms.addEventListener("change", async function () {
  const $room_number = $(`#room_number`);

  $room_number.querySelectorAll(`option`).forEach($option => $option.remove());

  if (this.value === `none`) {
    const $option = document.createElement(`option`);
    $option.innerHTML = `-- none --`;
    $option.value = `-- none --`;

    $room_number.appendChild($option);

    return;
  }

  const patientSelected = PATIENTS.filter(value =>
    value.dni === +$(`#patient_dni`).value
  )[0];

  try {
    const ROOMS = await queryFetch(
      `http://localhost:8000/bed/get-all/${this.value}`
    );

    const $fragment = document.createDocumentFragment();

    ROOMS.forEach(value => {
      const $option = document.createElement(`option`);

      if (!value.disponible) return;

      if (value.estado !== `limpia`) return;

      if (
        value.capacidad === 2 &&
        value.restriccion_genero !== `none` &&
        value.restriccion_genero !== patientSelected.sexo
      ) return;

      if (
        value.capacidad === 3 &&
        value.restriccion_genero !== patientSelected.sexo
      ) return;

      $option.innerHTML = value.room_number;
      $option.value = value.room_number;

      $fragment.appendChild($option);
    });

    if ($fragment.children.length !== 0) $room_number.appendChild($fragment);
    else {
      const $option = document.createElement(`option`);
      $option.innerHTML = `Sin habitacion`
      $option.value = `sin habitacion`

      $room_number.appendChild($option);
    }
  } catch (err) { console.error(`Failure to load rooms ${err}`) }
});

$inputs_fecha.forEach($input => {
  $input.addEventListener("keyup", function (output) {
    const onlyNumbers = /^\d+$/.test(output.key);

    if (onlyNumbers) {
      if (output.key > 3 && this.value.length === 1) this.value = `0${output.key}`;

      if (output.key > 1 && this.value.length === 4) this.value = `${this.value.substring(0, 3)}0${output.key}`;

      if (this.value.length === 2 || this.value.length === 5) this.value += `-`;
    }
  });
});

$update_admission.addEventListener("click", function () {
  const $form = $div_admission.querySelector(`form`);
  $(`#egreso`).value = null;

  if (this.checked) {
    $div_admission.querySelector(`h2`).innerHTML = `Modificar Admision`;

    const patientDNI = $(`#patient_dni`).value;
    const admissionID = PATIENTS.filter(value =>
      value.dni === +patientDNI
    )[0].id;

    $form.action = `http://localhost:8000/${admissionID}`;
    $form.name = `PUT`;

    $form.querySelector(`button`).innerHTML = `Actualizar`;
  } else {
    $div_admission.querySelector(`h2`).innerHTML = `Derivar Paciente`;
    $form.action = `http://localhost:8000/new`;
    $form.name = `POST`;

    $form.querySelector(`button`).innerHTML = `Derivar`;
  }
});

// Acciones post-submit
$buttons_forms.forEach($btn => {
  $btn.addEventListener("click", async function (evt) {
    const $form = evt.target.closest(`form`);
    const flag = $form.action.includes(`patient`);
    $button_new_patient.innerHTML = `Nuevo Paciente`;

    if (flag) $inputs_fecha[0].value = formatDate($inputs_fecha[0].value);
    else {
      const patientDNI = $(`#patient_dni`).value;

      if ($update_admission.checked) await updateRoom(`revert`, patientDNI);
      else if (!$discharged_patients.checked) await updateRoom(`vacate`, patientDNI);

      if ($program_admission.checked) $(`#ingreso`).value = formatDate($(`#ingreso`).value);
      else await assignRoom(patientDNI);
    }

    $discharged_patients.closest(`tfoot`).style.display = `table-footer-group`;

    actViewAdmission(false);
    actViewPatient(false);
    setTimeout(async () => {
      await recoverPatients();
      fillTableHeaders()
    }, 1000);
  });
});

async function recoverPatients(dni) {
  try {
    PATIENTS.length = 0;

    const URL = ($no_admissions.checked)
      ? `http://localhost:8000/patient/get-all/${dni}`
      : `http://localhost:8000/get-all/${dni}/${$discharged_patients.value}`;

    const patientData = await queryFetch(URL);

    for (const pd of patientData) {
      if ($no_admissions.checked) {
        pd.ingreso = `sin ingresos aun`;

        PATIENTS.push({ ...pd });
      } else {
        const {
          bed: { tipo_habitacion },
          patient_admission: {
            patient_study,
            ...patient
          }
        } = pd;
        const habitacion = `${pd?.room_number} ${tipo_habitacion}`;
        const ingreso = formatDate(pd.ingreso);
        const egreso = pd?.egreso
          ? formatDate(pd.egreso)
          : `aun en tratamiento`;
        let estado = patient_study[0]?.triage
          ? patient_study[0].triage
          : `en espera`;
        if (patient.nombre === `USUARIO`) estado = `URGENCIA`;
        const id = pd?.id;

        if ($discharged_patients.checked) PATIENTS.push({ egreso, ...patient });
        else PATIENTS.push({ habitacion, ingreso, id, egreso, estado, ...patient });
      }
    }
  } catch (err) { console.error(`Failure in recover ${err}`); }
}

function fillTableHeaders(patients) {
  const $theads = $(`thead`).querySelectorAll(`th`);

  if ($discharged_patients.checked || $no_admissions.checked) {
    $theads[3].innerHTML = `DNI`;
    $theads[4].innerHTML = ($no_admissions.checked)
      ? `Ingreso`
      : `Egreso`;
    $theads[5].innerHTML = `Contacto`;
    $theads[6].innerHTML = `Email`;
  } else if ($pending_visits.checked) {
    $theads[3].innerHTML = `Contacto`;
    $theads[4].innerHTML = `Email`;
    $theads[5].innerHTML = `Doctor`;
    $theads[6].innerHTML = `Turno`;
  } else {
    $theads[3].innerHTML = `DNI`;
    $theads[4].innerHTML = `Ingreso`;
    $theads[5].innerHTML = `Estado`;
    $theads[6].innerHTML = `Habitacion`;
  }

  fillTableBody($theads, patients);
}

function fillTableBody($theads, patients = PATIENTS) {
  const headers = Array.from($theads).reverse();

  $$(`td`).forEach($td => $td.remove());

  const $fragment = document.createDocumentFragment();
  const $template = $(`#my_template`);
  const $tr_body = $(`#tr_body`);
  const elements = patients;

  elements.forEach((patient, count) => {
    const $tr = $template.content.cloneNode(true).children[0];
    const $btn_update = $tr.querySelector(`.update`);
    const $btn_delete = $tr.querySelector(`.delete`);

    const $td = document.createElement(`td`);

    headers.forEach($th => {
      const value = patient[$th.innerHTML.toLowerCase()];

      if (value) {
        const $td_patient = $td.cloneNode();
        $td_patient.innerHTML = value;
        $tr.insertAdjacentElement(`afterbegin`, $td_patient);
      }
    });

    $td.innerHTML = count++;
    $td.style.textAlign = `center`;
    $tr.insertAdjacentElement(`afterbegin`, $td);

    if (!$pending_visits.checked) {
      $tr.addEventListener(`click`, registerAdmission);
      $btn_update.addEventListener(`click`, updatePatient);
      $btn_delete.addEventListener(`click`, deletePatient);
    }

    $fragment.appendChild($tr);
  });
  $tr_body.appendChild($fragment);
}

function registerAdmission(evt) {
  if (!$table.classList.contains(`left_shift`)) {
    const $tr = evt.target.closest(`tr`);
    const $td = $tr.querySelectorAll(`td`);
    const $form = $div_admission.querySelector(`form`);
    const $button = $form.querySelector(`button`);
    const $ingreso = $(`#ingreso`);
    const patientDNI = $td[3].innerHTML;

    $form.action = `http://localhost:8000/new`;
    $form.name = `POST`;
    $button.innerHTML = ($discharged_patients.checked || $no_admissions.checked)
      ? `Registrar`
      : `Derivar`;

    $ingreso.value = ($program_admission.checked)
      ? new Date()
      : ``;

    if ($update_admission.checked) {
      const selectedPatient = PATIENTS.filter(
        value => value.dni === +patientDNI
      )[0];

      const admissionID = selectedPatient.id;

      $form.action = `http://localhost:8000/${admissionID}`;

      $ingreso.value = selectedPatient.ingreso;
    }

    $(`#user_dni`).value = 20000001; // Aca va el dni del usuario de turno

    $(`#patient_dni`).value = patientDNI;

    $(`#sintomas`).value = ``;

    $$(`.update`).forEach($btn => $btn.classList.add(`hidden_button`));

    toggleButtons($tr, $td);
    actViewAdmission(true);
  }
}

function updatePatient(evt) {
  evt.stopPropagation();

  if (!$table.classList.contains(`right_shift`)) {
    $div_patient.querySelector(`h2`).innerHTML = `Modificar Paciente`;

    const $tr = evt.target.closest(`tr`);
    const $td = $tr.querySelectorAll(`td`);
    const patientDNI = $td[3].innerHTML;

    const patientSelected = PATIENTS.filter(
      value => value.dni === +patientDNI
    )[0];

    patientSelected.fecha_nacimiento = formatDate(patientSelected.fecha_nacimiento);

    for (const key in patientSelected) {
      try { $(`#${key}`).value = patientSelected[key] }
      catch (err) { console.log(`:x`) }
    }

    const $form = $div_patient.querySelector(`form`);
    $form.action = `http://localhost:8000/patient/${patientDNI}`;
    $form.name = `PUT`;

    $form.querySelector(`button`).innerHTML = `Actualizar`;

    toggleButtons($tr, $td);
    actViewPatient(true);
  }
}

async function deletePatient(evt) {
  evt.stopPropagation();

  const $patient_form = $div_patient.querySelector(`form`);
  const $admission_form = $div_admission.querySelector(`form`);
  const $delete_btn = evt.target;
  const $tr = $delete_btn.closest(`tr`);
  const $td = $tr.querySelectorAll(`td`);

  if ($delete_btn.innerHTML === `Cancelar`) {
    $div_patient.querySelector(`h2`).innerHTML = `Registrar Paciente`;
    $div_admission.querySelector(`h2`).innerHTML = ($discharged_patients.checked)
      ? `Registrar Admision`
      : `Derivar Paciente`;
    $patient_form.querySelector(`button`).innerHTML = `Registrar`;
    $admission_form.querySelector(`button`).innerHTML = ($discharged_patients.checked)
      ? `Registrar`
      : `Derivar`;

    $admission_form.action = `http://localhost:8000/new`;
    $admission_form.name = `POST`;
    $patient_form.action = `http://localhost:8000/patient/new`;
    $patient_form.name = `POST`;

    $$(`tr`).forEach($all_tr => $all_tr.className = ``);

    $$(`.update`).forEach($btn => $btn.classList.remove(`hidden_button`));

    $delete_btn.innerHTML = `Eliminar`;
    $delete_btn.classList.remove(`cancel`);

    $update_admission.checked = false;
    $program_admission.checked = false;

    $(`#ingreso`).closest(`div`).style.display = `none`;
    $(`#user_dni`).closest(`div`).style.display = `none`;

    $(`#tipo_habitacion`).closest(`div`).style.display = `flex`;
    $(`#room_number`).closest(`div`).style.display = `flex`;
    $(`#motivo`).closest(`div`).style.display = `flex`;

    $discharged_patients.closest(`tfoot`).style.display = `table-footer-group`;

    actViewAdmission(false);
    actViewPatient(false);

    return;
  }

  const apellido = $td[2].innerHTML;
  const nombre = $td[1].innerHTML;
  const dni = $td[3].innerHTML;

  const confirmDeleted = confirm(
    `Seguro que desea eliminar al usuario ${nombre} ${apellido} DNI ${dni}?`
  );

  try {
    if (confirmDeleted) {
      $tr.classList.add(`hidden_tr`);

      setTimeout(async () => {
        $tr.remove();

        await queryFetch(
          `http://localhost:8000/patient/${dni}`,
          `DELETE`
        );
      }, 1000);
    }
  } catch (err) { console.error(`Deleting ${err}`); }
}

function actViewPatient(condition) {
  // Desplazo la tabla a la derecha
  if (condition) {
    $table.addEventListener(`transitionend`, addTran);
    $table.style.removeProperty(`right`);
    $table.style.left = `15px`;
    $div_patient.style.display = `flex`;
    $table.classList.add(`left_shift`);
    return;
  }

  // Si la tabla esta desplazada a la izquierda
  if ($table.classList.contains(`left_shift`)) {
    $div_patient.addEventListener(`transitionend`, remTran);
    // Oculto el registro de paciente
    $div_patient.classList.remove(`look_right`);
    return;
  }

  function remTran() {
    // Vuelvo a centrar la tabla
    $table.className = `main_center`;
    $div_patient.style.display = `none`;
    $div_patient.removeEventListener(`transitionend`, remTran);
  }

  function addTran() {
    // Muestro el registro del paciente SOLO si la tabla esta desplazada
    if ($table.classList.contains(`left_shift`)) {
      $div_patient.classList.add(`look_right`);
      $table.removeEventListener(`transitionend`, addTran);
    }
  }
}

function actViewAdmission(condition) {
  // Despazo la tabla a la izquierda
  if (condition) {
    $table.addEventListener(`transitionend`, addTran);
    $table.style.removeProperty(`left`);
    $table.style.right = `15px`;
    $div_admission.style.display = `flex`;
    $table.classList.add(`right_shift`);
    return;
  }

  // Si la tabla esta desplazada a la derecha
  if ($table.classList.contains(`right_shift`)) {
    $div_admission.addEventListener(`transitionend`, remTran);
    // Oculto el registro de admision
    $div_admission.classList.remove(`look_left`);
    return;
  }

  function remTran() {
    // Vuelvo a centrar la tabla
    $table.className = `main_center`;
    $div_admission.style.display = `none`;
    $div_admission.removeEventListener(`transitionend`, remTran);
  }

  function addTran() {
    // Muestro el registro del paciente SOLO si la tabla esta desplazada
    if ($table.classList.contains(`right_shift`)) {
      $div_admission.classList.add(`look_left`);
      $table.removeEventListener(`transitionend`, addTran);
    }
  }
}

function toggleButtons($tr, $td) {
  $$(`.delete`).forEach($btn => {
    $btn.innerHTML = `Eliminar`;
    $btn.classList.remove(`cancel`);
  });

  $$(`tr`).forEach($all_tr => $all_tr.className = `tr`);
  $tr.className = ``;

  $td[8].querySelector(`button`).innerHTML = `Cancelar`;
  $td[8].querySelector(`button`).classList.add(`cancel`);

  $discharged_patients.closest(`tfoot`).style.display = `none`;
}

async function assignRoom(patientDNI) {
  try {
    const roomNumber = $(`#room_number`).value;
    const patientSex = PATIENTS.filter(value =>
      value.dni === +patientDNI
    )[0].sexo;

    const room = await queryFetch(
      `http://localhost:8000/bed/get-one/${roomNumber}`
    );

    switch (room.capacidad) {
      case 1:
        room.disponible = false;
        break;
      case 2:
        room.capacidad = 3; // El valor 3 indica que solo una cama esta ocupada
        break;
      case 3:                    // Cuando la habitacion se ocupade por 2 
        room.capacidad = 2;      // pacientes, se le reasignara el valor 2 y se 
        room.disponible = false; // cambiara la disp. a 'false' para no ser
        break;                   // recuperada en el fitrado del evento $rooms 
    }
    room.restriccion_genero = patientSex;

    await queryFetch(
      `http://localhost:8000/bed/${roomNumber}`,
      `PUT`,
      room
    );
  } catch (err) { console.error(`Room assignment failure ${err}`); }
}

/** 
 * @param {int} patientDNI 
 * @param {revert || vacate} action 
 */
async function updateRoom(action, patientDNI) {
  try {
    const selectedPatient = PATIENTS.filter(value =>
      value.dni === +patientDNI
    )[0];
    const roomNumber = selectedPatient.habitacion.split(` `)[0];
    const admissionID = selectedPatient.id;

    const room = await queryFetch(
      `http://localhost:8000/bed/get-one/${roomNumber}`
    );

    if (room.capacidad !== 2) {
      if (room.capacidad === 3) room.capacidad = 2;

      // En caso de revertir cambios vuelvo a declarla como disponible
      if (action === `revert`) room.disponible = true;
      // De lo contrario indico que necesita limpieza
      else room.estado = `por limpiar`;

      room.restriccion_genero = `none`;
    } else room.capacidad = 3;

    if (action === `vacate`) {
      // Actualizo la informacion de la 'vieja' recepcion
      await queryFetch(
        `http://localhost:8000/${admissionID}`,
        `PUT`,
        { egreso: new Date() }
      );
    }

    // Actualizo la informacion de la habitacion/cama que se acaba de liberar
    await queryFetch(
      `http://localhost:8000/bed/${roomNumber}`,
      `PUT`,
      room
    );
  } catch (err) { console.error(`Room release failed ${err}`); }
}

async function filterPatients(isChecked) {
  const $div_modify = $(`.check_modify`);
  const $div_program = $(`.check_program`);
  const $button = $div_admission.querySelector(`button`);
  const $title = $div_admission.querySelector(`h2`);
  $(`#ingreso`).value = new Date();

  if (isChecked) {
    $div_modify.style.display = `none`;
    $div_program.style.display = `flex`;
    $button.innerHTML = `Registrar`;
    $title.innerHTML = `Registrar Admision`;
  } else {
    $div_modify.style.display = `flex`;
    $div_program.style.display = `none`;
    $button.innerHTML = `Derivar`;
    $title.innerHTML = `Derivar Paciente`;
  }

  await recoverPatients();
  fillTableHeaders();
}