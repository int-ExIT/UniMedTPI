import queryFetch from './fetch.js';

// Selecciono TODOS los elementos del tipo form y los guardo en un Array
const $forms = Array.from(document.querySelectorAll("form"));

// Itero sobre el Array para asignarle a cada uno de estos la funcion recolectora
for (const $form of $forms) {
  $form.addEventListener("submit", async evt => {
    // Prevengo que el formulario recargue la pagina
    evt.preventDefault();

    // Instancio un objeto que contenga todos los datos del formulario
    const formData = new FormData($form);
    const body = Object.fromEntries(formData);

    // Identifico el metodo HTTP y la URL de la query
    const action = $form.action;
    const method = $form.name;

    try {
      const element = await queryFetch(action, method, body);

      console.log(`Element of dataCollector: ${element.nombres}`);
    }
    catch (err) { console.error(`Fetch ${err}`) }
  });
}