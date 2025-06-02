const $userHelp = document.querySelector("#userHelp");
const $passHelp = document.querySelector("#passHelp");
const $error = document.querySelector(".error");
const $form = document.querySelector("form");
const $user = document.querySelector("#user");
const $pass = document.querySelector("#pass");
const $look = document.querySelector("#look");

$form.addEventListener("submit", event => {
  event.preventDefault();
  
  let flag = checkFields($user.value, $pass.value);
  
  // EN ESTE PUNTO CORRESPONDE LA CORROBORACION DEL TOKEN
  if (flag) checkUser($user.value, $pass.value);
});

// Mostrar contrasenia
$look.addEventListener("click", () => {
  $pass.type = ($pass.type === "password") ? "text" : "password";
});

function checkFields(user, pass) {
  let flag = true;
  
  // [password] 
  if (!/^.{8,12}$/.test(pass)) { // Menos de 8 o mas de 12 caracteres
    $passHelp.style.display = `block`;
    $passHelp.innerHTML = `La contraseña debe contener entre 8 y 12 caracteres`;
    
    flag = false;
  }
  else if (!/^[A-Za-z0-9]+$/.test(pass)) { // Caracteres que no sean letras o numeros
    $passHelp.style.display = `block`;
    $passHelp.innerHTML = `Solo se permiten letras y numeros`;
    
    flag = false;
  }
  else $passHelp.style.display = `none`;
  
  // [user] 
  if (!/^.{8,12}$/.test(user)) { // Menos de 8 o mas de 12 caracteres
    $userHelp.style.display = `block`;
    $userHelp.innerHTML = `El nombre debe contener entre 8 y 12 caracteres`;
    
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

// EN ESTE PUNTO CORRESPONDE LA CORROBORACION DEL TOKEN
function checkUser(user, pass) {
  if (user === `ignaciot` && pass === `12345678`) $error.style.display = `none`;
  else $error.style.display = `block`;
}