function cargarContenido(opcion) {
  // Asigno el contenedor donde ira la invitacion
  // var contenedorInvitacion = document.getElementById("contenedor_invitacion");
  // contenedorInvitacion.innerHTML = "";
  // Obtener la invitacion seleccionada
  obtenerContenido(opcion); 
  // Muestro la invitacion
  // contenedorInvitacion.innerHTML = contenido;
}

// Función de ejemplo para obtener el contenido basado en la opción seleccionada
function obtenerContenido(opcion) {

  async function obtenerDireccion() {
    var lugarEvento = document.getElementById('lugarEvento').value;
    let direccion = '';
    const url = "http://127.0.0.1:5000/direccion/" + lugarEvento;
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      direccion = data.direccion[0];
      return direccion;
    } catch (error) {
      // Manejar errores si es necesario
      console.error('Error en la solicitud fetch:', error);
      throw error; // Puedes lanzar el error nuevamente si es necesario
    }
  }

  obtenerDireccion().then((direccion) => {
      var nombreEvento = document.getElementById("nombreEvento").value;
      var fecha = document.getElementById("fecha").value;
      var horaInicio = document.getElementById('horaInicio').value;
      var horaFin = document.getElementById('horaFin').value;
      var lugarEvento = document.getElementById('lugarEvento').value;
      // Formatos a mostrar en la invitacion
      var horario = (horaInicio !== "" && horaFin !== "") ? horaInicio + ' - ' + horaFin : "";
      var fechaFinal = (fecha !== "") ? formatearFecha(fecha) : "";
      // Actualizo los datos en la plantilla de invitacion

      var contenedorInvitacion = document.getElementById("contenedor_invitacion");

      switch (opcion) {
        case "opcion1":
          contenedorInvitacion.innerHTML = `
            <div class="contenedor_1" id="contenedor_invitacionf">
              <div id="" class="contendor_invitacion_1" id="contenedor_invitacion">
                <p class="texto_invitacion">Invitación</p>
                <p class="titulo">`+nombreEvento+`</p>
                <p class="fecha_evento">`+fechaFinal+`</p>
                <div class="horario_evento">`+horario+`</div>
                <div class="lugar">`+"Lugar: <br>"+direccion+`</div>
                <p class="imagen_invitacion"><img src="../static/img/logo.png" alt=""></p>
              </div>
            </div>`;
            break;
        case "opcion2":
          contenedorInvitacion.innerHTML = `
            <div class="contenedor_2" id="contenedor_invitacionf">
              <div id="" class="contendor_invitacion_2">
                <p class="texto_invitacion">Invitación</p>
                <p class="fecha_evento">`+fechaFinal+`</p>
                <p class="titulo">`+nombreEvento+`</p>
                <div class="horario_evento">`+horario+`</div>
                <div class="lugar">`+"Lugar: <br>"+direccion+`</div>
                <p class="imagen_invitacion"><img src="../static/img/logo.png" alt=""></p>
              </div>
              <img src="../static/img/marquee08.webp" alt="">
            </div>`;
            break;
        case "opcion3":
          contenedorInvitacion.innerHTML = `
            <div class="contenedor_3" id="contenedor_invitacionf">
              <div id="" class="contendor_invitacion_3">
                <p class="texto_invitacion">Invitación</p>
                <p class="titulo">`+nombreEvento+`</p>
                <p class="fecha_evento">`+fechaFinal+`</p>
                <div class="horario_evento"><p>Inicio:</p>`+horaInicio+`</div>
                <div class="horario_evento"><p>Fin:</p>`+horaFin+`</div>
                <div class="lugar">`+"Lugar: <br>"+direccion+`</div>
                <p class="imagen_invitacion"><img src="../static/img/logo.png" alt=""></p>
              </div>
            </div>`;
          break;
      }
  });
  
}

// Función para formatear la fecha en "dd/mm/aaaa"
function formatearFecha(fecha) {
  var partesFecha = fecha.split("-");
  var fechaFormateada = partesFecha[2] + "/" + partesFecha[1] + "/" + partesFecha[0];
  return fechaFormateada;
}
