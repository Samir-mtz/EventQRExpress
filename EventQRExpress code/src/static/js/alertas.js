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
// Alerta con mensaje de confirmacion al cambiar contraseña
function passwordActualizado() {
  Swal.fire({
    icon: "success",
    title: "Contraseña Actualizada",
    text: "La contraseña se actualizó con éxito.",
    confirmButtonText: "¡Genial!",
  });
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
function preguntaEditarRegistroInvitado() {
  Swal.fire({
    icon: "question",
    title: "Editar Registro",
    text: "¿Está seguro de que desea editar el registro?",
    showCancelButton: true,
    confirmButtonColor: "#009a06",
    cancelButtonColor: "#f90c0c",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  });
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
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Se ha eliminado el registro con éxito",
      });
    }
  });
}

// Alerta con mensaje de confirmacion de envio del link para seleccionar asientos (Uno por uno)
function enviarLinkConfirmacion() {
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
function preguntaEditarRegistroAsistente() {
  Swal.fire({
    icon: "question",
    title: "Editar Registro",
    text: "¿Está seguro de que desea editar el registro?",
    showCancelButton: true,
    confirmButtonColor: "#009a06",
    cancelButtonColor: "#f90c0c",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  });
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
function registroInvitado() {
  Swal.fire({
    icon: "success",
    title: "Registro de Invitados",
    text: "Se ha realizado el registro con éxito.",
    confirmButtonText: "¡Genial!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "info",
        title: "Recordatorio",
        text: "Genial! En unos días te haremos envio del formulario para seleccionar tus asientos, no olvides tu contraseña.",
      });
    }
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
