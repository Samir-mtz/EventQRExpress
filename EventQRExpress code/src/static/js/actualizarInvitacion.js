// Función para actualizar los valores en tiempo real en la invitación
function actualizarInvitacion() {
  // Almaceno los valores del formulario
  var nombreEvento = document.getElementById("nombreEvento").value;
  var fecha = document.getElementById("fecha").value;
  var horaInicio = document.getElementById('horaInicio').value;
  var horaFin = document.getElementById('horaFin').value;
  var numeroAsistentes = document.getElementById('numeroAsistentes').value;
  var tipoEvento = document.getElementById('tipoEvento').value;
  var lugarEvento = document.getElementById('lugarEvento').value;
  var horario = horaInicio + '  -  ' + horaFin;

  // Cargo los valores en la invitacion
  document.getElementById("valor_nombreEvento").innerText = nombreEvento;
  document.getElementById("valor_fecha").innerText = formatearFecha(fecha);
  document.getElementById("valor_horario").innerText = horario;
  document.getElementById("valor_numeroAsistentes").innerText = numeroAsistentes;
  document.getElementById("valor_tipoEvento").innerText = tipoEvento;
  document.getElementById("valor_lugarEvento").innerText = lugarEvento;
}

// Función para formatear la fecha en "dd/mm/aaaa"
function formatearFecha(fecha) {
  var partesFecha = fecha.split("-");
  var fechaFormateada = partesFecha[2] + "/" + partesFecha[1] + "/" + partesFecha[0];
  return fechaFormateada;
}
