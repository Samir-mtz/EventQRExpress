/***********************************************************************************************************************************
                                                        Formulario de CAMBIAR
***********************************************************************************************************************************/

// Variables con IDs
var passwordInput_cambiar = document.getElementById("password_cambiar");
var password2Input_cambiar = document.getElementById("password2_cambiar");
var submitButton_cambiar = document.getElementById("submitBtn_cambiar");

// Expresiones regulares
var passwordRegex_cambiar = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// Evento para el campo del CONTRASEÑA
passwordInput_cambiar.addEventListener("input", function () {
  validarPasswordCambiar();
  validarFormularioCambiar();
});

// Evento para el campo del CONFIRMAR CONTRASEÑA
password2Input_cambiar.addEventListener("input", function () {
  validarConfirmarPasswordCambiar();
  validarFormularioCambiar();
});

// Funcion de mensajes de validacion del campo del CONTRASEÑÁ
function validarPasswordCambiar() {
  // Obtengo el ID del mensaje del campo
  var passwordErrorMsg = document.getElementById("password_cambiar_msg");
  // Posibles mensajes
  if (!passwordInput_cambiar.value.trim())
    passwordErrorMsg.textContent = "Este campo no puede estar vacío.";
  else if (!passwordRegex_cambiar.test(passwordInput_cambiar.value))
    passwordErrorMsg.textContent =
      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
  else passwordErrorMsg.textContent = "";
}

// Funcion de mensajes de validacion del campo del CONFIRMAR CONTRASEÑÁ
function validarConfirmarPasswordCambiar() {
  // Obtengo el ID del mensaje del campo
  var confirmPasswordErrorMsg = document.getElementById(
    "password2_cambiar_msg"
  );
  // Posibles mensajes
  if (!password2Input_cambiar.value.trim())
    confirmPasswordErrorMsg.textContent = "Este campo no puede estar vacío.";
  else if (password2Input_cambiar.value !== passwordInput_cambiar.value)
    confirmPasswordErrorMsg.textContent = "Las contraseñas no coinciden.";
  else confirmPasswordErrorMsg.textContent = "";
}

// Función para validar el envío del formulario
function validarFormularioCambiar() {
  var isPasswordValid = passwordRegex_cambiar.test(passwordInput_cambiar.value.trim());
  var isConfirmPasswordValid = password2Input_cambiar.value === passwordInput_cambiar.value;

  if (isPasswordValid && isConfirmPasswordValid) {
    submitButton_cambiar.removeAttribute("disabled");
  } else {
    submitButton_cambiar.setAttribute("disabled", "disabled");
  }
}
