// Import ES6 para el reconocimiento del front-end
import queryFetch from './fetch.js';
// Almaceno TODOS los elementos del tipo form en un Array
const $forms = Array.from(document.querySelectorAll("form"));
// Asigno a cada formulario la funcion recolectora
for (let $form of $forms) {
  $form.addEventListener("submit", async evt => {
    // Prevengo que el formulario recargue la pagina
    evt.preventDefault();
    // Instancio un objeto con todos los datos del formulario
    const formData = new FormData($form);
    // Filtro aquellos elementos que contengan informacion
    const body = Object.fromEntries(
      Array.from(formData).filter(value => value[1] !== "")
    );
    
    // try { await queryFetch("http://localhost:8000/patient/8", "DELETE", body); }
    try { await queryFetch($form.action, $form.method, body); }
    catch (err) { console.error(`Fetch ${err}`) }
  });
}