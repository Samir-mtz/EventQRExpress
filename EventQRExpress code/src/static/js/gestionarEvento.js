function cambiarImagen(src) {
  // Muestro el contenedor
  document.getElementById("gestionar").style.display = "flex";
  // Cambia la imagen de invitacion
  document.getElementById("contenedorInvitacion").innerHTML = `<img src="${src}" alt="">`;
}
