function validarCorreo() {
  Swal.fire({
    icon: "info",
    title: "Validación de Correo Electrónico",
    html: "Para continuar, se requiere la validación de tu correo electrónico.<br/><br/> Por favor, revisa tus correos recibidos, spam y sigue las instrucciones enviadas.",
  });
}

function passwordActualizado() {
  Swal.fire({
    icon: "success",
    title: "Contraseña Actualizada",
    text: "La contraseña se actualizó con éxito.",
    confirmButtonText: "¡Genial!",
  });
}

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

function datosActualizados() {
  Swal.fire({
    icon: "success",
    title: "Datos Actualizados",
    text: "Los datos se han actualizado con éxito.",
    confirmButtonText: "¡Genial!",
  });
}

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

function enviarLinkConfirmacion() {
  Swal.fire({
    icon: "success",
    title: "Enlace de Confirmación",
    text: "Se ha enviado el enlace de confirmación.",
    confirmButtonText: "¡Genial!",
  });
}

function enviarLinksConfirmacion() {
  Swal.fire({
    icon: "success",
    title: "Enlaces de Confirmación",
    text: "Se han enviado los enlaces de confirmación.",
    confirmButtonText: "¡Genial!",
  });
}

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

function enviarInvitacion() {
  Swal.fire({
    icon: "success",
    title: "Envío de Invitación",
    text: "Se ha enviado la invitación con éxito.",
    confirmButtonText: "¡Genial!",
  });
}

function noAsistira() {
  Swal.fire({
    title: "Vaya...",
    text: "No te preocupes, será en otra ocasión.",
    confirmButtonText: "OK",
  });
}

function registroInvitado() {
  Swal.fire({
    icon: "success",
    title: "Registro de Invitados",
    text: "Se ha realizado el registro con éxito.",
    confirmButtonText: "¡Genial!",
  });
}

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


function error() {
  Swal.fire({
    icon: "error",
    title: "¡Ups...",
    text: "Algo salió mal, intentalo de nuevo.",
  });
}


function validarAcceso() {
  Swal.fire({
    title: "Ingrese su contraseña",
    input: "password",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "Ingresar",
    showLoaderOnConfirm: true,
  }).then((result) => {
    const isValidPassword = result.value === "2407Bryan";

    if (result.isConfirmed && isValidPassword) {
      Swal.fire({
        title: "Acceso permitido",
        text: "Llegó el momento de que selecciones tus asientos.",
        icon: "success"
      });
    } else {
      Swal.fire({
        title: "Acceso denegado",
        text: "La contraseña capturada no es válida.",
        icon: "error"
      }).then((result) => {
        if (result.isConfirmed) {
          validarAcceso();
        }
      });
    }
  });
}
