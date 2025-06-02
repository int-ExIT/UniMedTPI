import queryFetch from "../fetch.js";

const $search_patient = document.getElementById("search");
const $register = document.getElementById("register");
const TABLE_DATA = [
  "nombres",
  "apellidos",
  "dni",
  "edad",
  "numero_cel",
  "email",
];
let count = 1;

fillTable();

$search_patient.addEventListener("keyup", async function (output) {
  const onlyLettersAndNumbers = /^[A-Za-z0-9]+$/.test(output.key);
  const onlyNumbers = !/^[A-Za-z]+$/.test(output.key);
  const resetTable = this.value === "";

  if (onlyLettersAndNumbers && onlyNumbers) fillTable();

  if (resetTable) {
    $register.innerHTML = ``;
    fillTable();
  }
});

$register.addEventListener("click", handleTransitions);

function handleTransitions() {
  const $center_main = document.getElementById(`main`);
  const $main_right = document.getElementById(`main_r`);
  const $left_main = document.getElementById(`l_main`);

  
  if ($center_main.classList.contains(`right_shift`)) {
    $left_main.addEventListener(`transitionend`, removeTran);
    $left_main.classList.remove(`look_left`);
    console.log($center_main.classList);
    console.log($left_main.classList);
    console.log($main_right.classList);
    return;
  }
  
  if ($center_main.classList.contains(`left_shift`)) {
    $main_right.addEventListener(`transitionend`, removeTran);
    $main_right.classList.remove(`look_right`);
    console.log($center_main.classList);
    console.log($left_main.classList);
    console.log($main_right.classList);
    return;
  }
  
  if (this.innerHTML.endsWith(`Admision`)) {
    $center_main.addEventListener(`transitionend`, addTran);
    $center_main.style.right = `15px`;
    $center_main.classList.add(`right_shift`);
    
    console.log($center_main.classList);
    console.log($left_main.classList);
    console.log($main_right.classList);
  }
  
  if (this.innerHTML.endsWith(`Paciente`)) {
    console.log("\n"+this.innerHTML+"\n");
    $center_main.addEventListener(`transitionend`, addTran);
    $center_main.style.left = `15px`;
    $center_main.classList.add(`left_shift`);
    
    console.log($center_main.classList);
    console.log($left_main.classList);
    console.log($main_right.classList);
  }
  
  function removeTran() {
    if ($center_main.classList.contains(`right_shift`)) {
      $center_main.classList.remove(`right_shift`);
      $left_main.removeEventListener(`transitionend`, removeTran);
      return;
    }

    if ($center_main.classList.contains(`left_shift`)) {
      $center_main.classList.remove(`left_shift`);
      $main_right.removeEventListener(`transitionend`, removeTran);
      return;
    }
  }

  function addTran() {
    if ($register.innerHTML.endsWith(`Admision`)) {
      $left_main.classList.add(`look_left`);
      $left_main.removeEventListener(`transitionend`, addTran);
      return;
    }

    if ($register.innerHTML.endsWith(`Paciente`)) {
      $main_right.classList.add(`look_right`);
      $main_right.removeEventListener(`transitionend`, addTran);
      return;
    }
  }
}

async function fillTable() {
  try {
    const GET_ALL = `http://localhost:8000/patient/get-all/`;
    const FILTER = GET_ALL + $search_patient.value;

    const PATIENTS = await queryFetch(
      ($search_patient.value === "") ? GET_ALL : FILTER
    );

    if (PATIENTS.length === 0) $register.innerHTML = `Registrar Paciente`;
    if (PATIENTS.length === 1) $register.innerHTML = `Registrar Admision`;

    const $fragment = document.createDocumentFragment();
    const $tr_body = document.getElementById(`tr_body`);

    $tr_body.querySelectorAll(`td`).forEach($td => $td.remove());

    for (const patient of PATIENTS) {
      const $tr = document.createElement(`tr`);

      const $position = document.createElement(`td`);
      $position.innerHTML = `<td>${count++}</td>`;
      $tr.appendChild($position);

      TABLE_DATA.forEach(key => {
        const $patientData = document.createElement(`td`);
        $patientData.innerHTML = `<td>${patient[key]}</td>`;
        $tr.appendChild($patientData);
      });

      const $btnUpdate = document.createElement(`td`);
      $btnUpdate.innerHTML = `<button class='update'>Actualizar</button>`;
      $tr.appendChild($btnUpdate);

      const $btnDelete = document.createElement(`td`);
      $btnDelete.innerHTML = `<button class='delete'>Eliminar</button>`;
      $tr.appendChild($btnDelete);

      $fragment.appendChild($tr);
    }
    $tr_body.appendChild($fragment);
  }
  catch (err) { console.error(`Error loading table ${err}`); }
}

// TAL VEZ NO SEA NECESARIO USAR DataTables
// new DataTable(`#myTable`, {});