document.addEventListener("DOMContentLoaded", function() {
  // Obtén el número de asistentes al cargar la página
  var numeroAsistentes = parseInt(document.getElementById("numeroAsistentes").getAttribute("data-value"));
  // Llama a la función para actualizar los valores
  actualizarValoresAsistentes(numeroAsistentes);
});


var datosAlmacenados = [];
var sillasSeleccionadas = {};

function actualizarValoresAsistentes(numeroAsistentes) {
  // var numeroAsistentes = document.getElementById("numeroAsistentes").value;
  var datosAsistentes = document.getElementById("datosAsistentes");

  // Eliminar los campos HTML extras
  while (datosAsistentes.childElementCount > numeroAsistentes) {
    var asientoEliminado = datosAsistentes.lastElementChild.querySelector(`[name^="asientoAsistente"]`).value;
    var mesaEliminada = datosAsistentes.lastElementChild.querySelector(`[name^="mesaAsistente"]`).value;
    var sillaIdEliminada = asientoEliminado + mesaEliminada;
    // Elimino el ultimo asiento seleccionado
    var sillaEliminadaElement = document.getElementById(sillaIdEliminada);
    if (sillaEliminadaElement) {
      sillaEliminadaElement.classList.remove('seleccionado');
      sillaEliminadaElement.classList.add('disponible');
    }
    // Elimino el ultimo registrp
    datosAsistentes.removeChild(datosAsistentes.lastElementChild);
  }

  // Contenedor dinámico
  for (var j = datosAsistentes.childElementCount + 1; j <= numeroAsistentes; j++) {
    var nuevoAsistente = document.createElement("div");
    nuevoAsistente.innerHTML = `
      <div class="datos_asistente">
        <p class="valor">
          <i class='bx bxs-calendar-event'></i>
          <span class="nombre_valor">Nombre del asistente ${j}: </span>
          <input type="text" name="nombreEvento${j}" autocomplete="off">
        </p>
        <p class="valor">
          <i class='bx bxs-grid'></i>
          <span class="nombre_valor">Mesa: </span>
          <select name="mesaAsistente${j}" autocomplete="off" onchange="actualizarEstiloContenedorMesa(this, '${j}')">
            <option value="">Seleccionar mesa</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
            <option value="K">K</option>
            <option value="L">L</option>
            <option value="M">M</option>
          </select>
        </p>
        <p class="valor">
          <i class='bx bx-chair'></i>
          <span class="nombre_valor">Asiento: </span>
          <select name="asientoAsistente${j}" autocomplete="off" onchange="actualizarEstiloContenedorSilla(this.value, '${j}')">
            <option value="">Seleccionar asiento</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </p>
      </div>
    `;
    // Agregar al contenedor de datos
    datosAsistentes.appendChild(nuevoAsistente);
  }

  // Actualizar valores de los datos
  datosAlmacenados = [];
  for (var k = 1; k <= numeroAsistentes; k++) {
    var asistenteActual = {
      nombre: document.querySelector(`[name="nombreEvento${k}"]`).value,
      mesa: document.querySelector(`[name="mesaAsistente${k}"]`).value,
      asiento: document.querySelector(`[name="asientoAsistente${k}"]`).value
    };
    datosAlmacenados.push(asistenteActual);
  }
  // Actualizar las sillas seleccionadas
  sillasSeleccionadas = {};
  for (var l = 1; l <= numeroAsistentes; l++) {
    var asientoSeleccionado = document.querySelector(`[name="asientoAsistente${l}"]`).value;
    var mesaSeleccionada = document.querySelector(`[name="mesaAsistente${l}"]`).value;
    var sillaId = asientoSeleccionado + mesaSeleccionada;
    sillasSeleccionadas[sillaId] = l;
  }
  console.log("Sillas: " + Object.keys(sillasSeleccionadas).length);
  console.log("Datos: " + datosAlmacenados.length);
}

function actualizarEstiloContenedorMesa(selectElement, index) {
  var mesaSeleccionada = selectElement.value;
  var contenedorMesas = document.querySelectorAll('.contenedor_mesa .casilla.mesa');

  // Remover estilo de otras mesas
  contenedorMesas.forEach(function (mesa) {
    if (mesa.textContent !== mesaSeleccionada) {
      mesa.classList.remove('seleccionado');
    }
  });
}

function actualizarEstiloContenedorSilla(asientoSeleccionado, index) {
  var mesaSeleccionada = document.querySelector(`[name="mesaAsistente${index}"]`).value;
  var sillaId = asientoSeleccionado + mesaSeleccionada;

  // Obtener todos los asientos para el asistente actual
  var asientosAsistente = document.querySelectorAll(`[name="asientoAsistente${index}"]`);

  // Remover estilo de todas las sillas del asistente
  asientosAsistente.forEach(function (asiento) {
    var sillaActual = asiento.value + mesaSeleccionada;
    var sillaElement = document.getElementById(sillaActual);
    if (sillaElement) {
      sillaElement.classList.remove('seleccionado');
      sillaElement.classList.add('disponible');
    }
  });

  // Cambiar el estilo de la silla antes de eliminarla
  var sillaEliminar = document.getElementById(sillaId);
  if (sillaEliminar) {
    sillaEliminar.classList.remove('seleccionado');
    sillaEliminar.classList.add('disponible');
  }

  // Aplicar estilo solo a la silla seleccionada
  var sillaSeleccionadaElement = document.getElementById(sillaId);
  if (sillaSeleccionadaElement) {
    sillaSeleccionadaElement.classList.add('seleccionado');
    sillaSeleccionadaElement.classList.remove('disponible'); 
  }

  // Almacena la información de la silla seleccionada
  sillasSeleccionadas[sillaId] = index;
}
