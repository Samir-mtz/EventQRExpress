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

function enviarDatosJSON(id, idEvento, idConfirmacion) {
  // convertir_HTML_Imagen_Invitacion(id, idEvento, idConfirmacion);
  Swal.fire({
    icon: "question",
    title: "Confirmar Registro",
    text: "¿Está seguro de que desea registrar a sus asistentes?",
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
      fetch("/registrarAsistente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del servidor:", data);
          // Puedes hacer algo con la respuesta del servidor aquí
          Swal.fire({
            icon: "success",
            title: "Registro Exitoso",
            text: "Tu registro fue exitoso, enviaremos un correo con las invitaciones.",
            confirmButtonText: "¡Genial!",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "../";
            }
          });
        })
        .catch((error) => {
          console.error("Error al enviar la petición:", error);
        });
    }
  });
}

function convertir_HTML_Imagen_Invitacion(id, idEvento, idConfirmacion) {
  // Obtener el contenedor
  var contenedor = document.getElementById("contenedor_confirmacion");

  // Guardar las dimensiones originales del contenedor
  var originalWidth = contenedor.offsetWidth;
  var originalHeight = contenedor.offsetHeight;

  // Estilos del contenedor
  contenedor.style.width = "1300px";
  contenedor.style.height = "300px";
  contenedor.style.transform = "scale(1.2)";

  // Convertir elemento HTML en PNG
  domtoimage
    .toPng(contenedor)
    .then(function (dataUrl) {
      var nombreArchivo = id + "_" + idEvento + "_" + idConfirmacion + ".png";
      // Restaurar el estilo del contenedor
      contenedor.style.width = originalWidth + "px";
      contenedor.style.height = originalHeight + "px";
      contenedor.style.transform = "scale(1)";
      contenedor.style.backgroundColor = "";
      // Agrega un botón de descarga
      var downloadButton = document.createElement("a");
      downloadButton.href = dataUrl;
      downloadButton.download = nombreArchivo;
      downloadButton.innerText = "Descargar";
      downloadButton.style.display = "block";
      enviar_Imagen_Servidro(dataUrl, nombreArchivo);
    })
    .catch(function (error) {
      console.error("Error al convertir HTML a imagen:", error);
    });
}

// Función para enviar la imagen al servidor
function enviar_Imagen_Servidro(dataUrl, nombreArchivo) {
  // Mensaje de éxito en la consola del navegador
  console.log("Enviando al servidor:", dataUrl);
  // Obtener el token CSRF del meta tag en el HTML
  var csrfToken = document.querySelector("meta[name=csrf-token]").content;
  // Crear una nueva solicitud XMLHttpRequest
  var xhr = new XMLHttpRequest();
  // Configurar la solicitud POST al servidor
  xhr.open("POST", "http://127.0.0.1:5000/guardarImagenInvitacion", true);
  // Establecer encabezados necesarios para la solicitud
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", csrfToken);
  // Configurar una función que se llamará cada vez que cambie el estado de la solicitud
  xhr.onreadystatechange = function () {
    // Verificar si la solicitud ha sido completada
    if (xhr.readyState === 4) {
      // Verificar si la respuesta del servidor es exitosa
      if (xhr.status === 200) {
        // Mensaje de éxito en la consola del navegador
        console.log("Archivo guardado correctamente en el servidor");
      } else {
        // Mensajes de error en la consola del navegador si la respuesta del servidor no fue exitosa
        console.error(
          "Error al enviar el archivo al servidor. Estado:",
          xhr.status
        );
        console.error("Respuesta del servidor:", xhr.responseText);
      }
    }
  };
  // Enviar la solicitud al servidor, incluyendo la información de la imagen y el nombre del archivo
  xhr.send(JSON.stringify({ imgUrl: dataUrl, fileName: nombreArchivo }));
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
      id_confirmacion: id,
      asiento: asistente.mesa + asistente.asiento, // Combina "mesa" y "asiento"
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
    celdaNoAsistente.textContent = (indice + 1).toString().padStart(4, "0");
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
