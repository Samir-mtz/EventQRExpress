function cambiarImagenEstablecimiento(src) {
  // Muestro el contenedor
  document.getElementById("gestionar_establecimientos").style.display = "flex";
  // Cambia la imagen de invitacion
  document.getElementById("contenedorEstablecimeiento").innerHTML = `<img src="${src}" alt="">`;
}

function cambiarImagenInvitacion(src) {
  // Muestro el contenedor
  document.getElementById("gestionar_invitacion").style.display = "flex";
  // Cambia la imagen de invitacion
  document.getElementById("contenedorInvitacion").innerHTML = `<img src="${src}" alt="">`;
}