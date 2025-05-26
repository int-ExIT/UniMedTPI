const $form = document.querySelector("form");
const $user = document.querySelector("#user");
const $password = document.querySelector("#pass");
const $userHelp = document.querySelector("#userHelp");
const $passHelp = document.querySelector("#passHelp");
const $error = document.querySelector(".error");
const $look = document.querySelector("#look");

$form.addEventListener("submit", event => {
  event.preventDefault();
  
  let user = $user.value;
  let password = $password.value;
  
  let flag = checkFields(user, password);
  
  // EN ESTE PUNTO CORRESPONDE LA CORROBORACION DEL TOKEN
  if (flag) checkUser(user, password);
});

// Mostrar contrasenia
$look.addEventListener("click", () => {
  if ($password.type === "password") $password.type = "text";
  else $password.type = "password";
});

function checkFields(user, password) {
  let flag = true;
  
  // [password] 
  if (!/^.{8,12}$/.test(password)) { // Menos de 8 o mas de 12 caracteres
    $passHelp.style.display = `block`;
    $passHelp.innerHTML = `La contraseña debe contener entre 8 y 12 caracteres`;
    
    flag = false;
  }
  else if (!/^[A-Za-z0-9]+$/.test(password)) { // Caracteres que no sean letras o numeros
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
function checkUser(user, password) {
  if (user === `ignaciot` && password === `12345678`) $error.style.display = `none`;
  else $error.style.display = `block`;
}