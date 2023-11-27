// Inicializamos el paso actual
let pasoActual = 1;

// Función para actualizar la interfaz según el paso actual
function actualizarInterfaz() {
    // Ocultamos todos los pasos
    document.querySelectorAll('.paso').forEach((pasoElement) => {
        pasoElement.style.display = 'none';
    });

    // Mostramos el paso actual
    document.getElementById(`paso${pasoActual}`).style.display = 'block';

    // Actualizamos el número del paso y los enlaces de navegación
    document.getElementById('numeroPaso').innerHTML = `<a id="anterior" onclick="anteriorPaso()"><i class='bx bx-left-arrow-alt'></i></a> Paso ${pasoActual}/3 <a id="siguiente" onclick="siguientePaso()"><i class='bx bx-right-arrow-alt'></i></a>`;

    // Actualizamos la disponibilidad de los botones de navegación
    document.getElementById('anterior').disabled = pasoActual === 1;
    document.getElementById('siguiente').disabled = pasoActual === 3;
}

// Función para ir al siguiente paso
function siguientePaso() {
    if (pasoActual < 3) {
        pasoActual++;
        actualizarInterfaz();
    }
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