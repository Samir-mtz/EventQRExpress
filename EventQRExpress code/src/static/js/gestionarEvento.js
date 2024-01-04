function cambiarImagen(elemento) {
  // Muestro el contenedor
  document.getElementById("gestionar").style.display = "flex";
  // Cambia la imagen de invitacion
  let src = elemento.getAttribute("src");
  document.getElementById("contenedorInvitacion").innerHTML = `<img src="${src}" alt="">`;
}

function eliminarConfirmacion(elemento){
  
}