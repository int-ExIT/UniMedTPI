const $ = selector => document.querySelector(selector);

const $userHelp = $("#userHelp");
const $passHelp = $("#passHelp");
const $error = $(".error");
const $form = $("form");
const $user = $("#user");
const $pass = $("#pass");
const $look = $("#look");

$form.addEventListener("submit", async evt => {
  evt.preventDefault();

  const username = $user.value;
  const password = $pass.value;

  let flag = checkFields(username, password);

  if (!flag) return;

  try {
    const res = await fetch(`http://localhost:8000/${username}/${password}`);

    if (res.status === 200) {
      const result = await res.json();

      $error.innerHTML = `Bienvenid@ ${username}`;
      $error.style.color = 'green';

      window.location.href = result.body;
    } else {
      $error.innerHTML = 'Error: Nombre de usuario y/o contraseña incorrecta';
      $error.style.color = 'red';
    }

    $error.style.display = 'block';
  } catch (err) { console.error(`---> ${err}`); }
});

// Mostrar contrasenia
$look.addEventListener("click", () => {
  $pass.type = ($pass.type === "password") ? "text" : "password";
});

[$user, $pass].forEach($input => 
  $input.addEventListener('click', () => $error.style.display = 'none')
);

function checkFields(user, pass) {
  let flag = true;

  // [password] 
  if (!/^.{8,12}$/.test(pass)) { // Menos de 8 o mas de 12 caracteres
    $passHelp.style.display = `block`;
    $passHelp.innerHTML = `La contraseña debe contener entre 8 y 12 caracteres`;

    flag = false;
  }
  else if (!/^[A-Za-z0-9]+$/.test(pass)) { // Caracteres especiales
    $passHelp.style.display = `block`;
    $passHelp.innerHTML = `Solo se permiten letras y numeros`;

    flag = false;
  }
  else $passHelp.style.display = `none`;

  // [user] 
  if (!/^.{8,15}$/.test(user)) { // Menos de 8 o mas de 15 caracteres
    $userHelp.style.display = `block`;
    $userHelp.innerHTML = `El nombre debe contener entre 8 y 15 caracteres`;

    flag = false;
  }
  else if (!/^[A-Za-z]+$/.test(user)) { // Caracteres que no sean letras
    $userHelp.style.display = `block`;
    $userHelp.innerHTML = `Solo se permiten letras`;

    flag = false;
  }
  else $userHelp.style.display = `none`;

  return flag;
}