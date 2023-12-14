/***********************************************************************************************************************************
                                                        Formulario de LOGIN
***********************************************************************************************************************************/

// Variables con IDs
var emailInput_login = document.getElementById("email_login");
var passwordInput_login = document.getElementById("password_login");
var submitButton_login = document.getElementById("submitBtn_login");

// Expresiones regulares
var emailRegex_login = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passwordRegex_login = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// Evento para el campo del CORREO ELECTRONICO
emailInput_login.addEventListener("input", function () {
  validarEmailLogin();
  validarFormularioLogin();
});

// Evento para el campo de la CONTRASEÑA
passwordInput_login.addEventListener("input", function () {
  validarPasswordLogin();
  validarFormularioLogin();
});

// Funcion de mensajes de validacion del campo del CORREO ELECTRONICO
function validarEmailLogin() {
  // Obtenglo el ID del mensaje del campo
  var emailErrorMsg = document.getElementById("email_login_msg");
  //   Posibles mensajes
  if (!emailInput_login.value.trim())
    emailErrorMsg.textContent = "Este campo no puede estar vacío.";
  else if (!emailRegex_login.test(emailInput_login.value))
    emailErrorMsg.textContent = "Formato de correo electrónico no válido.";
  else emailErrorMsg.textContent = "";
}

// Funcion de mensajes de validacion del campo de CONTRASEÑA
function validarPasswordLogin() {
  // Obtengo el ID del mensaje del campo
  var passwordErrorMsg = document.getElementById("password_login_msg");
  // Posibles mensajes
  if (!passwordInput_login.value.trim())
    passwordErrorMsg.textContent = "Este campo no puede estar vacío.";
  // else if (!passwordRegex_login.test(passwordInput_login.value))
  //   passwordErrorMsg.textContent =
  //     "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
  else passwordErrorMsg.textContent = "";
}

// Funcion para validar el envio del FORMULARIO de LOGIN
function validarFormularioLogin() {
  // Variables que verifican los valores de los campos
  var isEmailValid = emailRegex_login.test(emailInput_login.value.trim());
  var isPasswordValid = passwordRegex_login.test(
    passwordInput_login.value.trim()
  );
  // Solo cuando sean validos todos los elementos, se envia el formulario
  if (isEmailValid)
    submitButton_login.removeAttribute("disabled");
  else submitButton_login.setAttribute("disabled", "disabled");
}

/***********************************************************************************************************************************
                                                        Formulario de REGISTER
***********************************************************************************************************************************/

// Variables con IDs
var nombreInput_register = document.getElementById("nombre_register");
var emailInput_register = document.getElementById("email_register");
var telefonoInput_register = document.getElementById("telefono_register");
var passwordInput_register = document.getElementById("password_register");
var password2Input_register = document.getElementById("password2_register");
var submitButton_register = document.getElementById("submitBtn_register");

// Expresiones regulares
var nombreRegex_register = /^[a-zA-Záéíóú ]{5,30}$/;
var emailRegex_register = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var telefonoRegex_register = /^\d{10}$/;
var passwordRegex_register = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// Evento para el campo del NOMBRE DE USUARIO
nombreInput_register.addEventListener("input", function () {
  validarNombreRegister();
  validarFormularioRegister();
});

// Evento para el campo del CORREO ELECTRONICO
emailInput_register.addEventListener("input", function () {
  validarEmailRegister();
  validarFormularioRegister();
});

// Evento para el campo del TELEFONO
telefonoInput_register.addEventListener("input", function () {
  validarTelefonoRegister();
  validarFormularioRegister();
});

// Evento para el campo del CONTRASEÑA
passwordInput_register.addEventListener("input", function () {
  validarPasswordRegister();
  validarFormularioRegister();
});

// Evento para el campo del CONFIRMAR CONTRASEÑA
password2Input_register.addEventListener("input", function () {
  validarConfirmarPasswordRegister();
  validarFormularioRegister();
});

// Funciones de mensajes de validación para cada campo
function validarNombreRegister() {
  // Obtenglo el ID del mensaje del campo
  var nombreErrorMsg = document.getElementById("nombre_register_msg");
  //   Posibles mensajes
  if (!nombreInput_register.value.trim())
    nombreErrorMsg.textContent = "Este campo no puede estar vacío.";
  else if (!nombreRegex_register.test(nombreInput_register.value))
    nombreErrorMsg.textContent = "Formato de Nombre no válido.";
  else nombreErrorMsg.textContent = "";
}

function validarEmailRegister() {
  // Obtenglo el ID del mensaje del campo
  var emailErrorMsg = document.getElementById("email_register_msg");
  //   Posibles mensajes
  if (!emailInput_register.value.trim()) {
    emailErrorMsg.textContent = "Este campo no puede estar vacío.";
  } else if (!emailRegex_register.test(emailInput_register.value)) {
    emailErrorMsg.textContent = "Formato de correo electrónico no válido.";
  } else {
    emailErrorMsg.textContent = "";
  }
}

function validarTelefonoRegister() {
  // Obtenglo el ID del mensaje del campo
  var telefonoErrorMsg = document.getElementById("telefono_register_msg");
  //   Posibles mensajes
  if (!telefonoInput_register.value.trim())
    telefonoErrorMsg.textContent = "Este campo no puede estar vacío.";
  else if (!telefonoRegex_register.test(telefonoInput_register.value))
    telefonoErrorMsg.textContent = "Formato de telefóno no válido.";
  else telefonoErrorMsg.textContent = "";
}

function validarPasswordRegister() {
  // Obtengo el ID del mensaje del campo
  var passwordErrorMsg = document.getElementById("password_register_msg");
  // Posibles mensajes
  if (!passwordInput_register.value.trim())
    passwordErrorMsg.textContent = "Este campo no puede estar vacío.";
  else if (!passwordRegex_register.test(passwordInput_register.value))
    passwordErrorMsg.textContent =
      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
  else passwordErrorMsg.textContent = "";
}

function validarConfirmarPasswordRegister() {
  // Obtengo el ID del mensaje del campo
  var confirmPasswordErrorMsg = document.getElementById(
    "password2_register_msg"
  );
  // Posibles mensajes
  if (!password2Input_register.value.trim())
    confirmPasswordErrorMsg.textContent = "Este campo no puede estar vacío.";
  else if (password2Input_register.value !== passwordInput_register.value)
    confirmPasswordErrorMsg.textContent = "Las contraseñas no coinciden.";
  else confirmPasswordErrorMsg.textContent = "";
}

// Función para validar el envío del formulario
function validarFormularioRegister() {
  var isNombreValid = nombreRegex_register.test(
    nombreInput_register.value.trim()
  );
  var isEmailValid = emailRegex_register.test(emailInput_register.value.trim());
  var isTelefonoValid = telefonoRegex_register.test(
    telefonoInput_register.value.trim()
  );
  var isPasswordValid = passwordRegex_register.test(
    passwordInput_register.value.trim()
  );
  var isConfirmPasswordValid =
    password2Input_register.value === passwordInput_register.value;
    console.log("pass2: "+isConfirmPasswordValid)
  if (
    isNombreValid &&
    isEmailValid &&
    isTelefonoValid &&
    isPasswordValid &&
    isConfirmPasswordValid
  ) {
    submitButton_register.removeAttribute("disabled");
  } else {
    submitButton_register.setAttribute("disabled", "disabled");
  }
}
