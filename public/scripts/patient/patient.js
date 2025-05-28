import queryFetch from "../fetch.js";

(async () => {
  try {
    const $fragment = document.createDocumentFragment();
    const $trhead = document.getElementById("trHead");
    const $trbody = document.getElementById("trBody");

    const PATIENTS = await queryFetch(`http://localhost:8000/patient/all`);

    for (const key in PATIENTS[0]) {
      let th = document.createElement(`th`);
      th.innerHTML = `<th>${key}</th>`;

      $fragment.appendChild(th);
    }
    $trhead.appendChild($fragment);

    for (const patient of PATIENTS) {
      let tr = document.createElement(`tr`);

      for (const key in patient) {
        let td = document.createElement(`td`);
        td.innerHTML = `<td>${patient[key]}</td>`;

        tr.appendChild(td);
      }
      $fragment.appendChild(tr);
    }
    $trbody.appendChild($fragment);

    new DataTable(`#myTable`, {});
  }
  catch (err) { console.error(`TABLE ERROR ${err}`) }
})();