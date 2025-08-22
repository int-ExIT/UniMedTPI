import queryFetch from "./fetch.js";

const BASE_URL = `http://localhost:8000/`;

// --------------------------------------------------------------------------
const $tfoot = document.querySelector('tfoot');
const $button_new_patient = document.querySelector("#new_patient");

$tfoot.style.display = 'none';
$button_new_patient.style.display = 'none';
// --------------------------------------------------------------------------

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const formatDate = date => {
  date = (date.length > 11) ? date.substring(0, 10) : date;

  return date.split(`-`).reverse().join(`-`);
}

const PATIENTS = [];

const $table = $('#main');
const $div_report = $("#report");
const $div_register = $("#register");
const $search_patient = $("#search");
const $button_emergency = $('#emergency');

document.addEventListener("DOMContentLoaded", async () => {
  await recoverPatients();
  fillTableHeaders();
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

$button_new_patient.addEventListener('click', () => {
  $button_new_patient.style.display = `none`;

  $$(`tr`).forEach($all_tr => $all_tr.className = ``);
  $$(`.info`).forEach($btn => $btn.classList.remove(`hidden_button`));
  $$(`.report`).forEach($btn => $btn.classList.remove(`hidden_button`));

  actViewPatient(false, $div_register);
});

$button_emergency.addEventListener('click', () => {
  // actViewPatient(!$table.classList.contains(`left_shift`), $div_register);

  $button_new_patient.innerHTML = `Cancelar`;
  $button_new_patient.style.display = `block`;

  if ($table.classList.contains(`right_shift`)) {
    actViewPatient(false, $div_report);
    // actViewPatient(false, $div_history);
    $$(`tr`).forEach($all_tr => $all_tr.className = ``);
    // CAMBIAR INFO POR REPORT
    $$(`.report`).forEach($btn => $btn.classList.remove(`hidden_button`));
    $$(`.info`).forEach($btn => {
      $btn.innerHTML = `Informacion`;
      $btn.classList.remove(`cancel`);
      $btn.classList.remove(`hidden_button`)
    });
    setTimeout(() =>
      actViewPatient(true, $div_register)
      , 1500);
  } else actViewPatient(true, $div_register);

  const $form = $div_register.querySelector(`form`);
  $form.querySelectorAll(`input`).forEach($input => {
    if ($input.name !== `dni`) $input.type = `password`;
    $input.value = ``;
  });

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

  $$(`.info`).forEach($btn => $btn.classList.add(`hidden_button`));
  $$(`.report`).forEach($btn => $btn.classList.add(`hidden_button`));

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
        `${BASE_URL}admission/new`,
        `POST`,
        admission
      );

      await queryFetch(
        `${BASE_URL}bed/801`,
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

async function recoverPatients(dni) {
  try {
    PATIENTS.length = 0;

    const URL = `${BASE_URL}admission/get-all/${dni}/is`;
    const patientData = await queryFetch(URL);

    for (const pd of patientData) {
      const {
        bed: { tipo_habitacion },
        patient_admission: {
          patient_study,
          ...patient
        }
      } = pd;
      const habitacion = `${pd?.room_number} ${tipo_habitacion}`;
      const ingreso = formatDate(pd.ingreso);
      let estado = patient_study[0]?.triage
        ? patient_study[0].triage
        : `en espera`;

      // Paciente registrado de urgencia
      if (patient.nombre === `USUARIO`) estado = `URGENCIA`;
      const id = pd?.id;

      PATIENTS.push({ habitacion, ingreso, id, estado, ...patient });
    }
  } catch (err) { console.error(`Failure in recover ${err}`); }
}

function fillTableHeaders(patients) {
  const $theads = $(`thead`).querySelectorAll(`th`);

  $theads[3].innerHTML = `DNI`;
  $theads[4].innerHTML = `Ingreso`;
  $theads[5].innerHTML = `Estado`;
  $theads[6].innerHTML = `Habitacion`;

  fillTableBody($theads, patients);
}

function fillTableBody($theads, patients = PATIENTS) {
  const headers = Array.from($theads).reverse();

  $$(`td`).forEach($td => $td.remove());

  const $fragment = document.createDocumentFragment();
  const $template = $(`#my_template2`);
  const $tr_body = $(`#tr_body`);
  const elements = patients;

  elements.forEach((patient, count) => {
    const $tr = $template.content.cloneNode(true).children[0];
    const $btn_report = $tr.querySelector(`.report`);
    const $btn_info = $tr.querySelector(`.info`);

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

    $btn_report.addEventListener(`click`, () => console.log(`report`));
    $btn_info.addEventListener(`click`, test);

    $fragment.appendChild($tr);
  });
  $tr_body.appendChild($fragment);
}

function test(evt) {
  if ($info_btn.innerHTML === `Cancelar`) {
    const $info_btn = evt.target;

    $$(`tr`).forEach($all_tr => $all_tr.className = ``);
    // $$(`.update`).forEach($btn => $btn.classList.remove(`hidden_button`));

    $info_btn.innerHTML = `Informacion`;
    $info_btn.classList.remove(`cancel`);
  } else {
    const $tr = evt.target.closest(`tr`);
    const $td = $tr.querySelectorAll(`td`);

    toggleButtons($tr, $td)
  }

  actViewPatient(!$table.classList.contains(`left_shift`), $div_report);
}

function actViewPatient(condition, $div) {
  // Desplazo la tabla a la derecha
  if (condition) {
    $table.addEventListener(`transitionend`, addTran);
    $table.style.removeProperty(`right`);
    $table.style.left = `15px`;
    $div.style.display = `flex`;
    $table.classList.add(`left_shift`);
    return;
  }

  // Si la tabla esta desplazada a la izquierda
  if ($table.classList.contains(`left_shift`)) {
    $div.addEventListener(`transitionend`, remTran);
    // Oculto el registro de paciente
    $div.classList.remove(`look_right`);
    return;
  }

  function remTran() {
    // Vuelvo a centrar la tabla
    $table.className = `main_center`;
    $div.style.display = `none`;
    $div.removeEventListener(`transitionend`, remTran);
  }

  function addTran() {
    // Muestro el registro del paciente SOLO si la tabla esta desplazada
    if ($table.classList.contains(`left_shift`)) {
      $div.classList.add(`look_right`);
      $table.removeEventListener(`transitionend`, addTran);
    }
  }
}

function toggleButtons($tr, $td) {
  $$(`.info`).forEach($btn => {
    $btn.innerHTML = `Informacion`;
    $btn.classList.remove(`cancel`);
  });

  $$(`tr`).forEach($all_tr => $all_tr.className = `tr`);
  $tr.className = ``;

  $td[8].querySelector(`button`).innerHTML = `Cancelar`;
  $td[8].querySelector(`button`).classList.add(`cancel`);

  // $discharged_patients.closest(`tfoot`).style.display = `none`;
}
