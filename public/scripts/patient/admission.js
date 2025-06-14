import queryFetch from "../fetch.js";

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

let PATIENTS = [];
$("#tester").onclick = x;
async function x() {
  // try {
  //   const patientData = await queryFetch(
  //     `http://localhost:8000/admission/get-all/10123123/is`
  //   );
  //   const { bed: { tipo_habitacion: habitacion } } = patientData[0];

  //   console.log(`object --> ${JSON.stringify(patientData)}`);
  //   console.log(`object --> ${habitacion}`);
  // }
  // catch (err) { console.error(`test-- > ${err}`); }
}

const $table = $("#main");
const $rooms = $("#tipo_habitacion");
const $filter = $(`#filter`);
const $input_fecha = $("#fecha_nacimiento")
const $patient_form = $("#main_r");
const $buttons_forms = $$(".send");
const $admission_form = $("#l_main");
const $search_patient = $("#search");

fillTableHeaders();

$filter.addEventListener("click", () => { fillTableHeaders(); });

$search_patient.addEventListener("keyup", function (output) {
  const onlyNumbers = /^\d+$/.test(output.key) && /^\d+$/.test(this.value);
  const isBackspace = output.key === `Backspace`;
  const isEmpty = this.value.length === 0;

  if (isEmpty) fillTableHeaders();
  else if (onlyNumbers || isBackspace) fillTableHeaders(this.value);
});

$buttons_forms.forEach($btn => {
  $btn.addEventListener("click", async function (evt) {
    const flag = evt.target.closest(`form`).action.includes(`admission`)

    if (flag) {
      const patientSelected = PATIENTS.filter(value =>
        value.dni === +$(`#patient_dni`).value
      )[0];

      const room = await queryFetch(
        `http://localhost:8000/bed/get-one/${$(`#room_number`).value}`
      );

      if (room.capacidad === 3) {
        room.capacidad = 2;

        room.disponible = false;
      }
      else if (room.capacidad === 2) room.capacidad = 3;
      if (room.capacidad === 1) room.disponible = false;

      room.restriccion_genero = patientSelected.sexo;

      queryFetch(
        `http://localhost:8000/bed/${$(`#room_number`).value}`,
        `put`,
        room
      );
    } else $input_fecha.value = formatDate($input_fecha.value);

    $buttons_forms.forEach($btn => $btn.innerHTML = `Registrar`);

    $search_patient.value = ``;

    actViewAdmission(false);
    actViewPatient(false);

    setTimeout(() => fillTableHeaders(), 1000);
  });
});

// Arerglar el tema de la seleccion por defecto de la 1ra opcion
$rooms.addEventListener("change", async function () {
  try {
    const patientSelected = PATIENTS.filter(value =>
      value.dni === +$(`#patient_dni`).value
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

    $room_number.querySelectorAll(`option`).forEach($option => $option.remove());

    if ($fragment.children.length !== 0) $room_number.appendChild($fragment);
    else {
      const $option = document.createElement(`option`);
      $option.innerHTML = `Sin habitacion`
      $option.value = `sin habitacion`

      $room_number.appendChild($option);
    }
  }
  catch (err) { console.error(`Failure to load rooms ${err}`) }
});

$input_fecha.addEventListener("keyup", function (output) {
  const onlyNumbers = /^\d+$/.test(output.key);

  if (onlyNumbers) {
    console.log(this.value.substring(0, 1));

    if (output.key > 3 && this.value.length === 1) this.value = `0${output.key}`;

    if (output.key > 1 && this.value.length === 4) this.value = `${this.value.substring(0, 3)}0${output.key}`;

    if (this.value.length === 2 || this.value.length === 5) this.value += `-`;
  }
});

// Configurar para que no haga tantas consultas innecesarias
async function fillTableHeaders(dni) {
  try {
    const $theads = $(`thead`).querySelectorAll(`th`);

    if ($filter.checked) {
      $theads[4].innerHTML = `Egreso`;
      $theads[5].innerHTML = `Contacto`;
      $theads[6].innerHTML = `Email`;
      $filter.value = `not`; // Egreso NOT null (Dados de Alta)
    } else {
      $theads[4].innerHTML = `Ingreso`;
      $theads[5].innerHTML = `Estado`;
      $theads[6].innerHTML = `Habitacion`;
      $filter.value = `is`; // Egreso IS null (Internos)
    }

    const patientData = await queryFetch(
      `http://localhost:8000/admission/get-all/${dni}/${$filter.value}`
    );

    const elements = [];
    for (const pd of patientData) {
      const {
        bed: { tipo_habitacion },
        patient_admission: {
          patient_study: [{ triage: estado }],
          ...patient
        }
      } = pd;

      const habitacion = `${pd.room_number} ${tipo_habitacion}`;
      const ingreso = formatDate(pd.ingreso);
      const egreso = pd?.egreso ? formatDate(pd.egreso) : ``;

      if ($filter.checked) elements.push({ egreso, ...patient });
      else elements.push({ habitacion, ingreso, egreso, estado, ...patient });
    }

    PATIENTS.push(...elements);

    fillTableBody(elements, $theads);
  }
  catch (err) { console.error(`Error fillTableHeaders() ${err}`); }
}

function fillTableBody(elements, $theads) {
  const headers = Array.from($theads).reverse();

  $$(`td`).forEach($td => $td.remove());

  const $fragment = document.createDocumentFragment();
  const $template = $(`#my_template`);
  const $tr_body = $(`#tr_body`);
  let count = 1;

  for (const patient in elements) {
    const $tr = $template.content.cloneNode(true).children[0];
    const $btn_update = $tr.querySelector(`.update`);
    const $btn_delete = $tr.querySelector(`.delete`);

    const $td = document.createElement(`td`);

    headers.forEach($th => {
      const value = elements[patient][$th.innerHTML.toLowerCase()];

      if (value) {
        const $td_patient = $td.cloneNode();
        $td_patient.innerHTML = value;
        $tr.insertAdjacentElement(`afterbegin`, $td_patient);
      }
    });

    $td.innerHTML = count++;
    $td.style.textAlign = `center`;
    $tr.insertAdjacentElement(`afterbegin`, $td);

    $tr.addEventListener(`click`, registerAdmission);
    $btn_update.addEventListener(`click`, updateElement);
    $btn_delete.addEventListener(`click`, deleteElement);

    $fragment.appendChild($tr);
  }
  $tr_body.appendChild($fragment);
}

async function deleteElement(evt) {
  evt.stopPropagation();

  try {
    const $form = $patient_form.querySelector(`form`);
    const $tr = evt.target.closest(`tr`);
    const $td = $tr.querySelectorAll(`td`);

    if (this.innerHTML === `Cancelar`) {
      $$(`tr`).forEach($all_tr => $all_tr.className = ``);

      $$(`.update`).forEach($btn => $btn.classList.remove(`hidden_button`));

      $buttons_forms.forEach($btn => $btn.innerHTML = `Registrar`);

      this.innerHTML = `Eliminar`;
      this.classList.remove(`cancel`);

      $filter.closest(`tfoot`).style.display = `table-footer-group`;

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

    patientSelected.fecha_nacimiento = formatDate(patientSelected.fecha_nacimiento);

    for (const key in patientSelected) {
      try { $(`#${key}`).value = patientSelected[key] }
      catch (err) { console.log(`>:P`) }
    }

    const $form = $patient_form.querySelector(`form`);
    $form.action = $form.action.replace(`new`, dniPatient);
    $form.name = `PUT`;

    $buttons_forms.forEach($btn => $btn.innerHTML = `Actualizar`);

    $$(`.delete`).forEach($btn => {
      $btn.innerHTML = `Eliminar`;
      $btn.classList.remove(`cancel`);
    });

    $$(`tr`).forEach($all_tr => $all_tr.className = `tr`);
    $tr.className = ``;

    $td[8].querySelector(`button`).innerHTML = `Cancelar`;
    $td[8].querySelector(`button`).classList.add(`cancel`);

    $filter.closest(`tfoot`).style.display = `none`;

    actViewPatient(true);
  }
}

// Adaptar para poder CAMBIAR de habitacion a un paciente
function registerAdmission() {
  if (!$table.classList.contains(`left_shift`)) {
    const $td = this.querySelectorAll(`td`);

    $$(`tr`).forEach($all_tr => $all_tr.className = `tr`);

    this.className = `selected_row`;

    $$(`.delete`).forEach($btn => {
      $btn.innerHTML = `Eliminar`
      $btn.classList.remove(`cancel`);
    });

    $$(`.update`).forEach($btn =>
      $btn.classList.add(`hidden_button`)
    );

    $td[8].querySelector(`button`).innerHTML = `Cancelar`;
    $td[8].querySelector(`button`).classList.add(`cancel`);

    $(`#patient_dni`).value = $td[3].innerHTML;

    $filter.closest(`tfoot`).style.display = `none`;

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

function formatDate(date) {
  if (date.length > 11) date = date.substring(0, 10);

  return date.split(`-`).reverse().join(`-`);
}