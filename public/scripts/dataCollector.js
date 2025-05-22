// Toma un formulario
const $form = document.querySelector(`form`);

$form.addEventListener(`submit`, evt => {
  // Evita que el formulario se envie
  evt.preventDefault();

  /**
   * Crea un objeto con los datos recolectados del formulario 
   * luego, este podra ser usado para las consultas a la bdd 
   */
  const formData = new FormData($form);
  const body = Object.fromEntries(formData);
  
  fetch(`http://localhost:8000/patient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(response => {
    // Chequeo el codigo de estado de la rsta
    if (response.ok) return response.json();

    // Si el estado no es correcto devuelvo un error
    return response.json().then(data => {
      throw new Error(data.message);
    });
  }).then(result => {
    // PROBABLEMENTE TENGA QUE CAMBIAR ESTA LINEA POR ALGO MAS GENERICO
    const idPatient = result.body;

    console.log(result.message);
  }).catch(err => {
    console.error(`Error Fetch: ${err}`);
  });
});