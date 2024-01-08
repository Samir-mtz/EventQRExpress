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
  // console.log( url);

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
    
  const url2 = "http://127.0.0.1:5000/confirmados/" + segundoNumero;
  fetch(url2)
  .then((response) => response.json())
  .then((data) => {
    data.forEach(function(confirmacion) {
      var tabla = document.getElementById("tablaConfirmaciones");
      // Crea un nuevo elemento <tr>
      var fila = document.createElement("tr");
      fila.classList.add("valores_tabla");
      
      // Crea y agrega celdas <td> para nombre, email y asistentes
      var celdaNombre = document.createElement("td");
      celdaNombre.innerHTML = "<span>" + confirmacion.nombre + "</span>";
      fila.appendChild(celdaNombre);
      
      var celdaEmail = document.createElement("td");
      celdaEmail.innerHTML = "<span>" + confirmacion.email + "</span>";
      fila.appendChild(celdaEmail);
      
      var celdaAsistentes = document.createElement("td");
      celdaAsistentes.innerHTML = "<span>" + confirmacion.asistentes + "</span>";
      fila.appendChild(celdaAsistentes);
      
      // Crea y agrega un campo oculto <input> para el ID
      var inputId = document.createElement("input");
      inputId.type = "hidden";
      inputId.name = "id";
      inputId.id = "id_confirmacion";
      inputId.value = confirmacion.id;
      fila.appendChild(inputId);
      
      // Crea y agrega celdas <td> para botones de editar, eliminar y enviar
      var celdaEditar = document.createElement("td");
      celdaEditar.innerHTML = "<button class='editar' onclick='preguntaEditarRegistroInvitado(this)'>Editar <i class='bx bxs-edit-alt'></i></button>";
      fila.appendChild(celdaEditar);
      
      var celdaEliminar = document.createElement("td");
      celdaEliminar.innerHTML = "<button class='eliminar' onclick='preguntaEliminarRegistroInvitado()'>Eliminar <i class='bx bxs-x-circle'></i></button>";
      fila.appendChild(celdaEliminar);
      
      var celdaEnviar = document.createElement("td");
      celdaEnviar.innerHTML = "<button class='enviar' onclick='enviarLinkConfirmacion(" + confirmacion.id + ")'>Enviar <i class='bx bx-send'></i></button>";
      fila.appendChild(celdaEnviar);
      
      // Agrega la fila al final de la tabla
      tabla.appendChild(fila);

      
      const url3 = "http://127.0.0.1:5000/invitadosAsistentes/" + confirmacion.id;
      // console.log( url);
      var tabla2 = document.getElementById("tablaAsistentes");
      var thNombre = document.createElement("th");
      thNombre.colSpan = 5; // Ajusta el colspan según tus necesidades
      thNombre.innerHTML = "<span>" + confirmacion.nombre + "</span>";
      tabla2.appendChild(thNombre);

      fetch(url3)
      .then((response) => response.json())
      .then((data) => {
        data.forEach(function(confirmacion2) {
          var tabla = document.getElementById("tablaAsistentes");
          // Crea un nuevo elemento <tr>
          var fila = document.createElement("tr");
          fila.classList.add("valores_tabla");

          // Crea y agrega celdas <td> para Asistente y Asiento
          var celdaAsistente = document.createElement("td");
          celdaAsistente.innerHTML = "<span>" + confirmacion2.nombre + "</span>";  // Supongo que el nombre se debe mostrar aquí
          fila.appendChild(celdaAsistente);

          var celdaAsiento = document.createElement("td");
          celdaAsiento.innerHTML = "<span>" + confirmacion2.asiento + "</span>";
          fila.appendChild(celdaAsiento);

          // Crea y agrega celdas <td> para botones de editar y eliminar
          var celdaEditar = document.createElement("td");
          celdaEditar.innerHTML = "<button class='editar' onclick='preguntaEditarRegistroConfirmado(this)'>Editar <i class='bx bxs-edit-alt'></i></button>";
          fila.appendChild(celdaEditar);

          var celdaEliminar = document.createElement("td");
          celdaEliminar.innerHTML = "<button class='eliminar' onclick='preguntaEliminarRegistroInvitado()'>Eliminar <i class='bx bxs-x-circle'></i></button>";
          fila.appendChild(celdaEliminar);
          // Agrega la fila al final de la tabla
          tabla.appendChild(fila);
              
          });
          
        });
      
    });
    
    


  });
  // Mostrar el valor en la consola (puedes hacer lo que quieras con el valor)
}