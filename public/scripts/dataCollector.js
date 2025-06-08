// Import ES6 para el reconocimiento del front-end
import queryFetch from './fetch.js';

document.querySelectorAll("form").forEach($form => {
  $form.addEventListener("submit", async evt => {
    // Prevengo que el formulario recargue la pagina
    evt.preventDefault();
    // Instancio un objeto con todos los datos del formulario
    const formData = new FormData($form);
    // Filtro aquellos elementos que contengan informacion
    const body = Object.fromEntries(
      Array.from(formData).filter(value => value[1] !== "")
    );
    
    console.log(`This is body ---> ${JSON.stringify(body)}`);
    console.log(`This is action ---> ${$form.action}`);
    console.log(`This is method ---> ${$form.name}`);
    try { await queryFetch($form.action, $form.name, body); }
    catch (err) { console.error(`Fetch ${err}`) }
  });
});