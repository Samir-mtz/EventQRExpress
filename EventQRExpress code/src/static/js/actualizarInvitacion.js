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


//Funcion para actualizar datos de Gestionar evento
function obtenerDatosEvento(elemento) {
  // Obtener el valor del atributo 'alt'
  var alt = elemento.getAttribute('alt');
  // Dividir el valor en dos partes usando el carácter de subrayado como separador
  var partes = alt.split('_');
  // Obtener el segundo número (si existe)
  var segundoNumero = partes.length > 1 ? partes[1] : null;

  const url = "http://127.0.0.1:5000/datosEvento/" + segundoNumero;
  console.log( url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("datos_nombre").innerHTML = data.nombre;
      document.getElementById("datos_fecha").innerHTML = data.fecha;
      document.getElementById("datos_horario").innerHTML = data.horario;
      document.getElementById("datos_asistentes").innerHTML = data.asistentes;
      document.getElementById("datos_tipo").innerHTML = data.tipo;
      document.getElementById("datos_lugar").innerHTML = data.lugar;
      document.getElementById("link_invitacion").innerHTML = "http://127.0.0.1:5000/ConfirmacionEvento/"+partes[1];
    });

  // Mostrar el valor en la consola (puedes hacer lo que quieras con el valor)
}