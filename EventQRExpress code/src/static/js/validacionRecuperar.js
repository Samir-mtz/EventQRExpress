/***********************************************************************************************************************************
                                                        Formulario de RECUPERAR
***********************************************************************************************************************************/

// Variables con IDs
var emailInput_recuperar = document.getElementById("email_recuperar");
var submitButton_recuperar = document.getElementById("submitBtn_recuperar");

// Expresiones regulares
var emailRegex_recuperar = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Evento para el campo del CORREO ELECTRONICO
emailInput_recuperar.addEventListener("input", function () {
  validarEmailRecuperar();
  validarFormularioRecuperar();
});

// Funcion de mensajes de validacion del campo del CORREO ELECTRONICO
function validarEmailRecuperar() {
  // Obtenglo el ID del mensaje del campo
  var emailErrorMsg = document.getElementById("email_recuperar_msg");
  //   Posibles mensajes
  if (!emailInput_recuperar.value.trim())
    emailErrorMsg.textContent = "Este campo no puede estar vacío.";
  else if (!emailRegex_recuperar.test(emailInput_recuperar.value))
    emailErrorMsg.textContent = "Formato de correo electrónico no válido.";
  else emailErrorMsg.textContent = "";
}

// Funcion para validar el envio del FORMULARIO de RECUPERAR
function validarFormularioRecuperar() {
  // Variables que verifican los valores de los campos
  var isEmailValid = emailRegex_recuperar.test(emailInput_recuperar.value.trim());
  // Solo cuando sean validos todos los elementos, se envia el formulario
  if (isEmailValid) submitButton_recuperar.removeAttribute("disabled");
  else submitButton_recuperar.setAttribute("disabled", "disabled");
}
