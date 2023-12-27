// Función para actualizar los valores en tiempo real en la invitación
function actualizarInvitacion() {
  // Almaceno los valores del formulario
  var nombreEvento = document.getElementById("nombreEvento").value;
  var fecha = document.getElementById("fecha").value;
  var horaInicio = document.getElementById('horaInicio').value;
  var horaFin = document.getElementById('horaFin').value;
  var numeroAsistentes = document.getElementById('numeroAsistentes').value;
  var tipoEvento = document.getElementById('tipoEvento').value;
  let lugarEvento = document.getElementById('lugarEvento').value;
  var horario = horaInicio + '  -  ' + horaFin;

  //Consultamos direccion completa
  const url = "http://127.0.0.1:5000/direccion/" + lugarEvento;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("valor_lugarEvento").innerText = data.direccion[0];
      document.getElementById("input_lugar").value = data.direccion[0];
    });
  //Fin de la condsulta
  
  // console.log(lugarEvento);
  // Cargo los valores en la invitacion
  document.getElementById("valor_nombreEvento").innerText = nombreEvento;
  document.getElementById("valor_fecha").innerText = formatearFecha(fecha);
  document.getElementById("valor_horario").innerText = horario;
  document.getElementById("valor_numeroAsistentes").innerText = numeroAsistentes;
  document.getElementById("valor_tipoEvento").innerText = tipoEvento;

  document.getElementById("input_nombre").value = nombreEvento;
  document.getElementById("input_fecha").value = formatearFecha(fecha);
  document.getElementById("input_horario").value = horario;
  document.getElementById("input_asistentes").value = numeroAsistentes;
  document.getElementById("input_tipo").value = tipoEvento;
  document.getElementById("input_ciudad").value = lugarEvento;
  // document.getElementById("valor_lugarEvento").innerText = lugarEvento;
}

// Función para formatear la fecha en "dd/mm/aaaa"
function formatearFecha(fecha) {
  var partesFecha = fecha.split("-");
  var fechaFormateada = partesFecha[2] + "/" + partesFecha[1] + "/" + partesFecha[0];
  return fechaFormateada;
}
