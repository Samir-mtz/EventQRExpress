let pasoActual = 1;
var registrosArray = [];
// Función para actualizar la interfaz según el paso actual
function actualizarInterfaz() {
  // Ocultamos todos los formularios
  document
    .querySelectorAll(".formulario_seleccionar")
    .forEach((formularioElement) => {
      formularioElement.style.display = "none";
    });

  // Mostramos el formulario actual
  document.getElementById(`paso${pasoActual}`).style.display = "block";
}

function enviarDatosJSON(){
  Swal.fire({
    icon: "question",
    title: "Editar Registro",
    text: "¿Está seguro de que desea editar el registro?",
    showCancelButton: true,
    confirmButtonColor: "#009a06",
    cancelButtonColor: "#f90c0c",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      
      var dataToSend = { Registros: registrosArray };
      var csrfToken = document.querySelector("meta[name=csrf-token]").content;
      // Realizar la solicitud POST utilizando fetch
      fetch('/registrarAsistente', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken
          },
          body: JSON.stringify(dataToSend)
      })
      .then(response => response.json())
      .then(data => {
          console.log('Respuesta del servidor:', data);
          // Puedes hacer algo con la respuesta del servidor aquí
      })
      .catch(error => {
          console.error('Error al enviar la petición:', error);
      });
    }
  });


}
// Función para ir al siguiente paso
function siguientePaso(id) {
  if (pasoActual < 2) {
    pasoActual++;
    actualizarInterfaz();
  }

  var numeroAsistentes = parseInt(
    document.getElementById("numeroAsistentes").value
  );
  var registros = [];

  for (var k = 1; k <= numeroAsistentes; k++) {
    var asistenteActual = {
      nombre: document.querySelector(`[name="nombreEvento${k}"]`).value,
      mesa: document.querySelector(`[name="mesaAsistente${k}"]`).value,
      asiento: document.querySelector(`[name="asientoAsistente${k}"]`).value,
    };
    registros.push(asistenteActual);
  }

  // Imprimir en consola los datos almacenados
  console.log("Datos almacenados:", registros);

  // Obtener la tabla y su cuerpo
  var tabla = document.getElementById("tablaAsistentes");
  var tbody = tabla.getElementsByTagName("tbody")[0];

  // Limpiar el contenido existente en el tbody
  tbody.innerHTML = "";
  
  // Agregar filas a la tabla
  registros.forEach((asistente, indice) => {
    var registro = {
      nombre: asistente.nombre,
      id_confirmacion : id,
      asiento: asistente.mesa + asistente.asiento  // Combina "mesa" y "asiento"
    };
    registrosArray.push(registro);

    var fila = tbody.insertRow();
    fila.classList.add("valores_tabla"); // Agregar la clase

    ["nombre", "mesa", "asiento"].forEach((clave, i) => {
      var celda = fila.insertCell(i);
      celda.textContent = asistente[clave];

    });

    // Añadir el número de asistente (incrementado en 1)
    var celdaNoAsistente = fila.insertCell(0);
    celdaNoAsistente.textContent = (indice + 1).toString().padStart(4, '0');
  });
  
}
// Función para ir al paso anterior
function anteriorPaso() {
  if (pasoActual > 1) {
    pasoActual--;
    actualizarInterfaz();
  }
}

// Inicializar la interfaz
actualizarInterfaz();
