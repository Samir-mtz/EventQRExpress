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


//Funcion para actualizar salones disponibles
function selecciones() {
	let capacidad = document.getElementById("numeroAsistentes").value;
    let destino =  document.getElementById("lugarEvento");
    // console.log(capacidad);
	const url = "http://127.0.0.1:5000/capacidadSalones/" + capacidad;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			// sucursales = data.ubicaciones
			var opciones = document.querySelectorAll("#lugarEvento option");
			opciones.forEach((o) => o.remove());
			let option0 = document.createElement("option");
			option0.text = "Seleccionar";
			destino.add(option0);
			data.salones.forEach((dato) => {
				let option = document.createElement("option");
				option.text = dato;
				destino.add(option);
			});
		});
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