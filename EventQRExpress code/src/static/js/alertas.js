// Alerta para validacion de correo (Register y Recuperar
function validarCorreo(event) {
  event.preventDefault();
  Swal.fire({
    icon: "info",
    title: "Validación de Correo Electrónico",
    html: "Para continuar, se requiere la validación de tu correo electrónico.<br/><br/> Por favor, revisa tus correos recibidos, spam y sigue las instrucciones enviadas.",
  }).then((result) => {
    if (result.isConfirmed) {
      event.target.submit();
    }
  });
}
// Alerta para validacion de correo (Register y Recuperar
function recuperarContrasena(event) {
  event.preventDefault();
  Swal.fire({
    icon: "info",
    title: "Recuperar Contraseña",
    html: "Si tu correo es valido, enviaremos un correo electrónico para recuperar tu contraseña.<br/><br/> Por favor, revisa tus correos recibidos, spam y sigue las instrucciones enviadas.",
  }).then((result) => {
    if (result.isConfirmed) {
      event.target.submit();
    }
  });
}
// Alerta con mensaje de confirmacion al cambiar contraseña
function passwordActualizado(event) {
  event.preventDefault();
  Swal.fire({
    icon: "success",
    title: "Contraseña Actualizada",
    text: "La contraseña se actualizó con éxito.",
    confirmButtonText: "¡Genial!",
  }).then((result) => {
    if (result.isConfirmed) {
      event.target.submit();
    }
  });
}
// Alerta con mensaje de confirmacion al cambiar contraseña
function eventoCreado(event, id, idEvento) {
  event.preventDefault();
  convertir_HTML_Imagen(id, idEvento);
  Swal.fire({
    icon: "success",
    title: "Evento Creado",
    text: "Tu evento se ha creado con exito, puedes modificarlo en la seccion de gestionar evento.",
    confirmButtonText: "¡Genial!",
  }).then((result) => {
    if (result.isConfirmed) {
      event.target.submit();
    }
  });
}

function convertir_HTML_Imagen(id, idEvento) {
  // Obtener el contenedor
  var contenedor = document.getElementById("contenedor_invitacion");

  // Guardar las dimensiones originales del contenedor
  var originalWidth = contenedor.offsetWidth;
  var originalHeight = contenedor.offsetHeight;

  // Estilos del contenedor
  contenedor.style.width = "10000px";
  contenedor.style.height = "650px";
  contenedor.style.transform = "scale(1.5)";

  // Convertir elemento HTML en PNG
  domtoimage
    .toPng(contenedor)
    .then(function (dataUrl) {
      var nombreArchivo = id + "_" + idEvento + ".png";
      // Restaurar el estilo del contenedor
      contenedor.style.width = originalWidth + "px";
      contenedor.style.height = originalHeight + "px";
      contenedor.style.transform = "scale(1)";
      contenedor.style.backgroundColor = "";
      // Agrega un botón de descarga
      var downloadButton = document.createElement("a");
      downloadButton.href = dataUrl;
      downloadButton.download = nombreArchivo;
      downloadButton.innerText = "Descargar";
      downloadButton.style.display = "block";
      enviar_Imagen_Servidro(dataUrl, nombreArchivo);
    })
    .catch(function (error) {
      console.error("Error al convertir HTML a imagen:", error);
    });
}

function convertir_HTML_Imagen_Invitacion(id, idEvento, idConfirmacion) {
  // Obtener el contenedor
  var contenedor = document.getElementById("contenedor_invitacion");

  // Guardar las dimensiones originales del contenedor
  var originalWidth = contenedor.offsetWidth;
  var originalHeight = contenedor.offsetHeight;

  // Estilos del contenedor
  contenedor.style.width = "10000px";
  contenedor.style.height = "650px";
  contenedor.style.transform = "scale(1.5)";

  // Convertir elemento HTML en PNG
  domtoimage
    .toPng(contenedor)
    .then(function (dataUrl) {
      var nombreArchivo = id + "_" + idEvento + idConfirmacion + ".png";
      // Restaurar el estilo del contenedor
      contenedor.style.width = originalWidth + "px";
      contenedor.style.height = originalHeight + "px";
      contenedor.style.transform = "scale(1)";
      contenedor.style.backgroundColor = "";
      // Agrega un botón de descarga
      var downloadButton = document.createElement("a");
      downloadButton.href = dataUrl;
      downloadButton.download = nombreArchivo;
      downloadButton.innerText = "Descargar";
      downloadButton.style.display = "block";
      enviar_Imagen_Servidro(dataUrl, nombreArchivo);
    })
    .catch(function (error) {
      console.error("Error al convertir HTML a imagen:", error);
    });
}

// Función para enviar la imagen al servidor
function enviar_Imagen_Servidro(dataUrl, nombreArchivo) {
  // Mensaje de éxito en la consola del navegador
  console.log("Enviando al servidor:", dataUrl);
  // Obtener el token CSRF del meta tag en el HTML
  var csrfToken = document.querySelector("meta[name=csrf-token]").content;
  // Crear una nueva solicitud XMLHttpRequest
  var xhr = new XMLHttpRequest();
  // Configurar la solicitud POST al servidor
  xhr.open("POST", "http://127.0.0.1:5000/guardarImagen", true);
  // Establecer encabezados necesarios para la solicitud
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);
  // Configurar una función que se llamará cada vez que cambie el estado de la solicitud
  xhr.onreadystatechange = function () {
    // Verificar si la solicitud ha sido completada
    if (xhr.readyState === 4) {
      // Verificar si la respuesta del servidor es exitosa
      if (xhr.status === 200) {
        // Mensaje de éxito en la consola del navegador
        console.log("Archivo guardado correctamente en el servidor");
      } else {
        // Mensajes de error en la consola del navegador si la respuesta del servidor no fue exitosa
        console.error(
          "Error al enviar el archivo al servidor. Estado:",
          xhr.status
        );
        console.error("Respuesta del servidor:", xhr.responseText);
      }
    }
  };
  // Enviar la solicitud al servidor, incluyendo la información de la imagen y el nombre del archivo
  xhr.send(JSON.stringify({ imgUrl: dataUrl, fileName: nombreArchivo }));
}

// Alerta para preguntar si desea cerrar sesion, en caso de confirmar sale alerta de confirmacion
function preguntaCerrarSesion() {
  Swal.fire({
    icon: "question",
    title: "Cerrar Sesión",
    text: "¿Está seguro de que desea cerrar sesión?",
    showCancelButton: true,
    confirmButtonColor: "#009a06",
    cancelButtonColor: "#f90c0c",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Sesión Cerrada",
        text: "¡Hasta pronto!",
      });
    }
  });
}

// Alerta para preguntar si el administrador desea agregar un evento en el calendario
function preguntaAgregarEvento() {
  Swal.fire({
    icon: "question",
    title: "Agregar Evento",
    text: "¿Está seguro de que desea agregar un nuevo Evento?",
    showCancelButton: true,
    confirmButtonColor: "#009a06",
    cancelButtonColor: "#f90c0c",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  });
}

// Alerta para preguntar si el administrador dese agregar un nuevo establecimiento
function preguntaAgregarEstablecimiento() {
  Swal.fire({
    icon: "question",
    title: "Agregar Establecimiento",
    text: "¿Está seguro de que desea agregar un nuevo Establecimiento?",
    showCancelButton: true,
    confirmButtonColor: "#009a06",
    cancelButtonColor: "#f90c0c",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  });
}

// Alerta para preguntar si el administrador dese agregar un nuevo diseño de invitacion
function preguntaAgregarInvitacion() {
  Swal.fire({
    icon: "question",
    title: "Agregar Invitación",
    text: "¿Está seguro de que desea agregar una nueva Invitación?",
    showCancelButton: true,
    confirmButtonColor: "#009a06",
    cancelButtonColor: "#f90c0c",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  });
}

// Alerta con mensaje de confirmacion de datos actualizados en pantalla de configuracion
function datosActualizados() {
  Swal.fire({
    icon: "success",
    title: "Datos Actualizados",
    text: "Los datos se han actualizado con éxito.",
    confirmButtonText: "¡Genial!",
  });
}

// Alerta para preguntar si ya no se quiere continuar con los pasos para crear el evento
function preguntaCancelarRegistroEvento() {
  Swal.fire({
    icon: "question",
    title: "Cancelar Registro",
    text: "¿Está seguro de que desea cancelar el registro del evento?",
    showCancelButton: true,
    confirmButtonColor: "#009a06",
    cancelButtonColor: "#f90c0c",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  });
}

// Alerta para preguntar si se desea editar un registro de los invitados (Solo hazta donde confirman asistencia)
function preguntaEditarRegistroInvitado(button) {
  Swal.fire({
    icon: "question",
    title: "Editar Registro",
    text: "¿Está seguro de que desea editar el registro?",
    showCancelButton: true,
    confirmButtonColor: "#009a06",
    cancelButtonColor: "#f90c0c",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      editarRegistroInvitado(button);
    }
  });
}

function intercambiarBotonesInvitado(button) {
  if (button.classList.contains("editar")) {
    // Cambiar a modo "Guardar"
    button.classList.remove("editar");
    button.classList.add("guardar");
    button.innerHTML = "Guardar <i class='bx bxs-save'></i>";
    button.setAttribute("onclick", "guardarCambiosInvitado(this)");
  } else if (button.classList.contains("guardar")) {
    // Cambiar a modo "Editar"
    button.classList.remove("guardar");
    button.classList.add("editar");
    button.innerHTML = "Editar <i class='bx bxs-edit-alt'></i>";
    button.setAttribute("onclick", "preguntaEditarRegistroInvitado(this)");
  }
}

function editarRegistroInvitado(button) {
  // Lógica para editar registro aquí
  console.log("Editando registro...");
  // Obtiene la fila actual
  var fila = button.closest("tr");
  // Obtiene todas las celdas de la fila
  var celdas = fila.querySelectorAll("td");
  // Itera sobre las celdas y reemplaza los span con input
  celdas.forEach(function (celda, index) {
    if (index < 3) {
      var span = celda.querySelector("span");
      var input = document.createElement("input");
      input.value = span.innerText.trim();
      span.replaceWith(input);
    }
  });
  // Puedes agregar más funcionalidad según tus necesidades
  intercambiarBotonesInvitado(button);
}

function guardarCambiosInvitado(button) {
  // Lógica para guardar la edición aquí
  console.log("Guardando edición...");
  // Obtiene la fila actual
  var fila = button.closest("tr");
  // Obtiene todas las celdas de la fila
  var celdas = fila.querySelectorAll("td");
  // Itera sobre las celdas y reemplaza los input con span
  celdas.forEach(function (celda, index) {
    if (index < 3) {
      var input = celda.querySelector("input");
      var span = document.createElement("span");
      span.innerText = input.value.trim();
      input.replaceWith(span);
    }
  });
  intercambiarBotonesInvitado(button);
}

// Alerta para preguntar si se desea eliminar un registro de los invitados (Solo hazta donde confirman asistencia)
function preguntaEliminarRegistroInvitado() {
  Swal.fire({
    icon: "warning",
    title: "Eliminar Registro",
    text: "¿Está seguro de que desea eliminar el registro?",
    showCancelButton: true,
    confirmButtonColor: "#009a06",
    cancelButtonColor: "#f90c0c",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      async function obtenerDireccion() {
        var lugarEvento = document.getElementById('id_confirmacion').value;
        let direccion = '';
        const url = "http://127.0.0.1:5000/deleteConfirmacion/" + lugarEvento;
        try {
          const response = await fetch(url);
        } catch (error) {
          // Manejar errores si es necesario
          console.error('Error en la solicitud fetch:', error);
          throw error; // Puedes lanzar el error nuevamente si es necesario
        }
      }
      obtenerDireccion();
      
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Se ha eliminado el registro con éxito",
      }).then(() => location.reload(true));
    }
  });
}

// Alerta con mensaje de confirmacion de envio del link para seleccionar asientos (Uno por uno)
function enviarLinkConfirmacion(id) {
  async function enviarCorreo(id) {
    // let direccion = '';
    const url = "http://127.0.0.1:5000/enviarCorreo/" + id;
    try {
      const response = await fetch(url);
    } catch (error) {
      // Manejar errores si es necesario
      console.error('Error en la solicitud fetch:', error);
      throw error; // Puedes lanzar el error nuevamente si es necesario
    }
  }
  
  enviarCorreo(id);

  Swal.fire({
    icon: "success",
    title: "Enlace de Confirmación",
    text: "Se ha enviado el enlace de confirmación.",
    confirmButtonText: "¡Genial!",

  });
}

// Alerta con mensaje de confirmacion de envio del link para seleccionar asientos (Todos con un solo clic)
function enviarLinksConfirmacion() {
  Swal.fire({
    icon: "success",
    title: "Enlaces de Confirmación",
    text: "Se han enviado los enlaces de confirmación.",
    confirmButtonText: "¡Genial!",
  });
}

// Alerta para preguntar si se desea editar un registro de los asistentes (Incluido los asientos, solo si hay disponibles)
function preguntaEditarRegistroConfirmado(button) {
  Swal.fire({
    icon: "question",
    title: "Editar Registro",
    text: "¿Está seguro de que desea editar el registro?",
    showCancelButton: true,
    confirmButtonColor: "#009a06",
    cancelButtonColor: "#f90c0c",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      editarRegistroConfirmado(button);
    }
  });
}

function intercambiarBotonesConfirmado(button) {
  if (button.classList.contains("editar")) {
    // Cambiar a modo "Guardar"
    button.classList.remove("editar");
    button.classList.add("guardar");
    button.innerHTML = "Guardar <i class='bx bxs-save'></i>";
    button.setAttribute("onclick", "guardarCambiosConfirmado(this)");
  } else if (button.classList.contains("guardar")) {
    // Cambiar a modo "Editar"
    button.classList.remove("guardar");
    button.classList.add("editar");
    button.innerHTML = "Editar <i class='bx bxs-edit-alt'></i>";
    button.setAttribute("onclick", "preguntaEditarRegistroConfirmado(this)");
  }
}

function editarRegistroConfirmado(button) {
  // Lógica para editar registro aquí
  console.log("Editando registro...");
  // Obtiene la fila actual
  var fila = button.closest("tr");
  // Obtiene todas las celdas de la fila
  var celdas = fila.querySelectorAll("td");
  // Itera sobre las celdas y reemplaza los span con input
  celdas.forEach(function (celda, index) {
    if (index < 2) {
      var span = celda.querySelector("span");
      var input = document.createElement("input");
      input.value = span.innerText.trim();
      span.replaceWith(input);
    }
  });
  // Puedes agregar más funcionalidad según tus necesidades
  intercambiarBotonesConfirmado(button);
}

function guardarCambiosConfirmado(button) {
  // Lógica para guardar la edición aquí
  console.log("Guardando edición...");
  // Obtiene la fila actual
  var fila = button.closest("tr");
  // Obtiene todas las celdas de la fila
  var celdas = fila.querySelectorAll("td");
  // Itera sobre las celdas y reemplaza los input con span
  celdas.forEach(function (celda, index) {
    if (index < 2) {
      var input = celda.querySelector("input");
      var span = document.createElement("span");
      span.innerText = input.value.trim();
      input.replaceWith(span);
    }
  });
  intercambiarBotonesConfirmado(button);
}

// Alerta para preguntar si se desea eliminar un registro de los asistentes (Incluido los asientos, solo si hay disponibles)
function preguntaEliminarRegistroAsistente() {
  Swal.fire({
    icon: "warning",
    title: "Eliminar Registro",
    text: "¿Está seguro de que desea eliminar el registro?",
    showCancelButton: true,
    confirmButtonColor: "#009a06",
    cancelButtonColor: "#f90c0c",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Se ha eliminado el registro con éxito.",
      });
    }
  });
}

// Alerta con mensaje de confirmacion de envio de invitación individual (Uno por uno)
function enviarInvitacion() {
  Swal.fire({
    icon: "success",
    title: "Envío de Invitación",
    text: "Se ha enviado la invitación con éxito.",
    confirmButtonText: "¡Genial!",
  });
}

// Alerta con mensaje si no confirma asistencia
function noAsistira() {
  Swal.fire({
    title: "Vaya...",
    text: "No te preocupes, será en otra ocasión.",
    confirmButtonText: "OK",
  });
}

// Alerta con mensaje de confirmacion de registro de invitados, despues sale una alerta con recordatorio para no olvidar la contraseña
function registroInvitado(event) {
  event.preventDefault();
  Swal.fire({
    icon: "success",
    title: "Registro de Invitado",
    text: "Se ha realizado el registro con éxito.",
    confirmButtonText: "¡Genial!",
  }).then((result) => {
    Swal.fire({
      icon: "info",
      title: "Recordatorio",
      text: "Genial! En unos días te haremos envio del formulario para seleccionar tus asientos.",
    }).then((result)=> {
      event.target.submit();
    });
  });
}

// Alerta con mensaje de confirmacion del registro de asistentes (Solo anfitrion (Familiares cercanos como madre, padre, hermano))
function registroAsistentes() {
  Swal.fire({
    icon: "success",
    title: "Registro de Asistentes",
    text: "Se ha realizado el registro con éxito.",
    confirmButtonText: "¡Genial!",
  });
}

// Alerta con mensaje de confirmacion de asientos seleccioandos, despues sale una alerta con recordatorio informando el envio de la invitacion digital
function confirmacionAsientos() {
  Swal.fire({
    icon: "success",
    title: "Asignación de Asientos",
    text: "La reservación de los asientos se realizó con éxito.",
    confirmButtonText: "¡Genial!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "info",
        title: "Invitación",
        text: "Se te ha enviado la invitación digital al correo electrónico que proporcionaste en tu registro.",
      });
    }
  });
}

// Alerta con mensaje de solicitud de la contraseña, para poder tener acceso a la eleccion de asientos
function validarAcceso() {
  Swal.fire({
    title: "Ingrese su contraseña",
    input: "password",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Ingresar",
    showLoaderOnConfirm: true,
  }).then((result) => {
    const isValidPassword = result.value === "2407Bryan";
    // En caso de que se llegue a capturar la contraseña correcta tiene acceso al formulario para seleccionar los asientos deseados
    if (result.isConfirmed && isValidPassword) {
      Swal.fire({
        title: "Acceso permitido",
        text: "Llegó el momento de que selecciones tus asientos.",
        icon: "success",
      });
    }
    // En caso de no capturar la contraseña correcta, muestra mensaje de acceso denegado y solicita nuevamente la contraseña
    else {
      Swal.fire({
        title: "Acceso denegado",
        text: "La contraseña capturada no es válida.",
        icon: "error",
      }).then((result) => {
        if (result.isConfirmed) {
          validarAcceso();
        }
      });
    }
  });
}

// Alerta con mensaje de error, en caso de que algun proceso no se complete correctamente
function error() {
  Swal.fire({
    icon: "error",
    title: "¡Ups...",
    text: "Algo salió mal, intentalo de nuevo.",
  });
}

// Alerta para preguntar si ya no se quiere continuar con la seleccion de asientos
function preguntaCancelarSeleccionAsientos() {
  Swal.fire({
    icon: "question",
    title: "Cancelar Selección de Asientos",
    text: "¿Está seguro de que desea cancelar la selección de asientos?",
    showCancelButton: true,
    confirmButtonColor: "#009a06",
    cancelButtonColor: "#f90c0c",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  });
}

// Alerta al copiar el linkd e invitacion
function copiarTexto() {
  // Contenido del contenedor
  const textoParaCopiar = document.getElementById('link_invitacion');
  const texto = textoParaCopiar.textContent.trim();
  const inputTemporal = document.createElement('input');
  // Asignacion del contenedor
  inputTemporal.setAttribute('value', texto);
  document.body.appendChild(inputTemporal);
  // Selecciona y copia el texto del campo de entrada
  inputTemporal.select();
  document.execCommand('copy');
  document.body.removeChild(inputTemporal);
  // Alerta de link copiado
  Swal.fire({
    icon: "success",
    title: "Link copiado",
    text: "Se ha copiado el link de invitación con éxito.",
    confirmButtonText: "¡Genial!",
  });
}