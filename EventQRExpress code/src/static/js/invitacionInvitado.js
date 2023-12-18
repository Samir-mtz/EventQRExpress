document.addEventListener("DOMContentLoaded", function() {
  var opcion = "opcion2";
  // Selecciona el contenedor
  var contenedor = document.getElementById("contenedor_invitacion");
  // Define el contenido HTML que deseas cargar
  var contenidoHTML = obtenerContenido(opcion);
  // Carga el contenido en el contenedor
  contenedor.innerHTML = contenidoHTML;
});

// Función de ejemplo para obtener el contenido basado en la opción seleccionada
function obtenerContenido(opcion) {
  // Actualizo los datos en la plantilla de invitacion
  switch (opcion) {
    case "opcion1":
      return `
        <div id="" class="contendor_invitacion_1">
          <p class="texto_invitacion">Invitación</p>
          <p class="titulo">`+`NOMBRE EVENTO`+`</p>
          <p class="fecha_evento">`+`FECHA EVENTO`+`</p>
          <div class="horario_evento">`+`HORARIO EVENTO`+`</div>
          <div class="lugar">`+"Lugar: <br>"+`LUGAR EVENTO`+`</div>
          <p class="imagen_invitacion"><img src="../static/img/logo.png" alt=""></p>
        </div>`;
    case "opcion2":
      return `
        <div class="contenedor_2">
          <div id="" class="contendor_invitacion_2">
            <p class="texto_invitacion">Invitación</p>
            <p class="fecha_evento">`+`FECHA EVENTO`+`</p>
            <p class="titulo">`+`NOMBRE EVENTO`+`</p>
            <div class="horario_evento">`+`HORARIO EVENTO`+`</div>
            <div class="lugar">`+"Lugar: <br>"+`LUGAR EVENTO`+`</div>
            <p class="imagen_invitacion"><img src="../static/img/logo.png" alt=""></p>
          </div>
          <img src="../static/img/marquee08.webp" alt="">
        </div>`;
    case "opcion3":
      return `
        <div class="contenedor_3">
          <div id="" class="contendor_invitacion_3">
            <p class="texto_invitacion">Invitación</p>
            <p class="titulo">`+`NOMBRE EVENTO`+`</p>
            <p class="fecha_evento">`+`FECHA EVENTO`+`</p>
            <div class="horario_evento"><p>Inicio:</p>`+`HORA`+`</div>
            <div class="horario_evento"><p>Fin:</p>`+`HORA`+`</div>
            <div class="lugar">`+"Lugar: <br>"+`NOMBRE EVENTO`+`</div>
            <p class="imagen_invitacion"><img src="../static/img/logo.png" alt=""></p>
          </div>
        </div>`;
    default:
      return "";
  }
}