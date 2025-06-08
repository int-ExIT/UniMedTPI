import queryFetch from "../fetch.js";

let PATIENTS;
$("#tester").onclick = x;
function x() {
  const y = PATIENTS.filter(value => value.dni === 10000000)[0];

  console.log(y);
}

const $table = $("#main");
const $rooms = $("#tipo_habitacion");
const $register_btn = $(".send", "All");
const $patient_form = $("#main_r");
const $admission_form = $("#l_main");
const $search_patient = $("#search");

fillTable();

$search_patient.addEventListener("keyup", async function (output) {
  const isBackspace = output.key === `Backspace`;
  const onlyNumbers = /^\d+$/.test(output.key) && /^\d+$/.test(this.value);

  if (onlyNumbers || isBackspace) {
    const numberPatients = await fillTable(this.value) === 0;
    const longValue = /^\d{8}$/.test(this.value);

    // Si no hay pacientes y se ingresaron 8 digitos
    if (numberPatients && longValue) {
      $(`#dni`).value = this.value;

      actViewPatient(true);
    }
    else actViewPatient(false);

    return;
  }
  if (this.value === ``) fillTable();
});

$register_btn.forEach($btn => {
  $btn.addEventListener("click", async function () {
    $register_btn.forEach($btn => $btn.innerHTML = `Registrar`);

    $search_patient.value = ``;

    actViewAdmission(false);
    actViewPatient(false);

    setTimeout(() => fillTable(), 1000);
  });
});

$rooms.addEventListener("change", async function () {
  try {
    const dniPatient = $(`#patient_dni`).value;

    const patientSelected = PATIENTS.filter(value =>
      value.dni === +dniPatient
    )[0];

    const $room_number = $(`#room_number`);
    const $fragment = document.createDocumentFragment();

    const ROOMS = await queryFetch(
      `http://localhost:8000/bed/get-all/${this.value}`
    );

    ROOMS.forEach(value => {
      const $option = document.createElement(`option`);

      if (!value.disponible) return;

      if (value.estado !== `limpia`) return;

      if (
        value.capacidad === 2 &&
        value.restriccion_genero !== `none` &&
        value.restriccion_genero !== patientSelected.sexo
      ) return;

      $option.innerHTML = value.room_number;
      $option.value = value.room_number;

      $fragment.appendChild($option);
    });

    $room_number.querySelectorAll(`option`).forEach($option =>
      $option.remove()
    );
    $room_number.appendChild($fragment);
  }
  catch (err) { console.error(`Failure to load rooms ${err}`) }
});

async function fillTable(dni = ``) {
  try {
    PATIENTS = await queryFetch(
      `http://localhost:8000/patient/get-all/${dni}`
    );

    $(`td`, `All`).forEach($td => $td.remove());

    const $fragment = document.createDocumentFragment();
    const $template = $(`#my_template`);
    const $tr_body = $(`#tr_body`);
    let count = 1;

    for (const patient of PATIENTS) {
      const $tr = $template.content.cloneNode(true).children[0];
      const $btn_update = $tr.querySelector(`.update`);
      const $btn_delete = $tr.querySelector(`.delete`);

      const $td = document.createElement(`td`);
      [
        "email",
        "contacto",
        "edad",
        "dni",
        "apellido",
        "nombre",
      ].forEach(key => {
        const $td_patient = $td.cloneNode();
        $td_patient.innerHTML = patient[key];
        $tr.insertAdjacentElement(`afterbegin`, $td_patient);
      });

      $td.innerHTML = count++;
      $tr.insertAdjacentElement(`afterbegin`, $td);

      $tr.addEventListener(`click`, registerAdmission);
      $btn_update.addEventListener(`click`, updateElement);
      $btn_delete.addEventListener(`click`, deleteElement);

      $fragment.appendChild($tr);
    }
    $tr_body.appendChild($fragment);

    return PATIENTS.length;
  }
  catch (err) { console.error(`Error loading table ${err}`); }
}

async function deleteElement(evt) {
  evt.stopPropagation();

  try {
    const $form = $patient_form.querySelector(`form`);
    const $tr = evt.target.closest(`tr`);
    const $td = $tr.querySelectorAll(`td`);

    if (this.innerHTML === `Cancelar`) {
      $(`tr`, `All`).forEach($all_tr => $all_tr.className = ``);

      this.innerHTML = `Eliminar`;
      this.classList.remove(`cancel`);

      $(`.update`, `All`).forEach($btn =>
        $btn.classList.remove(`hidden_button`)
      );

      $register_btn.forEach($btn => $btn.innerHTML = `Registrar`);

      $form.action = $form.action.replace($td[3].innerHTML, `new`);
      $form.name = `POST`;

      actViewAdmission(false);
      actViewPatient(false);

      return;
    }

    const result = confirm(
      `Seguro que desea eliminar al usuario ${$td[1].innerHTML} ${$td[2].innerHTML} DNI ${$td[3].innerHTML}?`
    );

    if (result) {
      $tr.classList.add(`hidden_tr`);

      setTimeout(async () => {
        evt.target.closest(`tr`).remove();

        await queryFetch(
          $form.action.replace(`new`, $td[3].innerHTML),
          `DELETE`,
        );
      }, 1000);
    }
  }
  catch (err) { console.error(`Deleting ${err}`); }
}

function updateElement(evt) {
  evt.stopPropagation();

  if (!$table.classList.contains(`right_shift`)) {
    const $tr = evt.target.closest(`tr`);
    const $td = $tr.querySelectorAll(`td`);

    const dniPatient = $td[3].innerHTML;

    const patientSelected = PATIENTS.filter(value =>
      value.dni === +dniPatient
    )[0];

    for (const key in patientSelected) {
      try { $(`#${key}`).value = patientSelected[key] }
      catch (err) { console.log(`>:P`) }
    }

    const $form = $patient_form.querySelector(`form`);
    $form.action = $form.action.replace(`new`, dniPatient);
    $form.name = `PUT`;

    $register_btn.forEach($btn => $btn.innerHTML = `Actualizar`);

    $(`.delete`, `All`).forEach($btn => {
      $btn.innerHTML = `Eliminar`;
      $btn.classList.remove(`cancel`);
    });

    $(`tr`, `All`).forEach($all_tr => $all_tr.className = `tr`);

    $tr.className = ``;

    $td[8].querySelector(`button`).innerHTML = `Cancelar`;
    $td[8].querySelector(`button`).classList.add(`cancel`);

    actViewPatient(true);
  }
}

function registerAdmission() {
  if (!$table.classList.contains(`left_shift`)) {
    const $td = this.querySelectorAll(`td`);

    $(`tr`, `All`).forEach($all_tr => $all_tr.className = `tr`);

    this.className = `selected_row`;

    $(`.delete`, `All`).forEach($btn => {
      $btn.innerHTML = `Eliminar`
      $btn.classList.remove(`cancel`);
    });

    $(`.update`, `All`).forEach($btn =>
      $btn.classList.add(`hidden_button`)
    );

    $td[8].querySelector(`button`).innerHTML = `Cancelar`;
    $td[8].querySelector(`button`).classList.add(`cancel`);

    $(`#patient_dni`).value = $td[3].innerHTML;

    actViewAdmission(true);
  }
}

function actViewPatient(condition) {
  // Desplazo la tabla a la derecha
  if (condition) {
    $table.addEventListener(`transitionend`, addTran);
    $table.style.removeProperty(`right`);
    $table.style.left = `15px`;
    $patient_form.style.display = `flex`;
    $table.classList.add(`left_shift`);
    return;
  }

  // Si la tabla esta desplazada a la izquierda
  if ($table.classList.contains(`left_shift`)) {
    $patient_form.addEventListener(`transitionend`, remTran);
    // Oculto el registro de paciente
    $patient_form.classList.remove(`look_right`);
    return;
  }

  function remTran() {
    // Vuelvo a centrar la tabla
    $table.className = `main_center`;
    $patient_form.style.display = `none`;
    $patient_form.removeEventListener(`transitionend`, remTran);
  }

  function addTran() {
    // Muestro el registro del paciente SOLO si la tabla esta desplazada
    if ($table.classList.contains(`left_shift`)) {
      $patient_form.classList.add(`look_right`);
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
    $admission_form.style.display = `flex`;
    $table.classList.add(`right_shift`);
    return;
  }

  // Si la tabla esta desplazada a la derecha
  if ($table.classList.contains(`right_shift`)) {
    $admission_form.addEventListener(`transitionend`, remTran);
    // Oculto el registro de admision
    $admission_form.classList.remove(`look_left`);
    return;
  }

  function remTran() {
    // Vuelvo a centrar la tabla
    $table.className = `main_center`;
    $admission_form.style.display = `none`;
    $admission_form.removeEventListener(`transitionend`, remTran);
  }

  function addTran() {
    // Muestro el registro del paciente SOLO si la tabla esta desplazada
    if ($table.classList.contains(`right_shift`)) {
      $admission_form.classList.add(`look_left`);
      $table.removeEventListener(`transitionend`, addTran);
    }
  }
}

function $(element, all) {
  if (all) return document.querySelectorAll(element);
  else return document.querySelector(element);
}