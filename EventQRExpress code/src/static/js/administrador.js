document.addEventListener("DOMContentLoaded", function () {
  // Datos para las gráficas
  var meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abrril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  var datosBarras = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];
  var datosPastel = [15, 5, 50];

  // Configuración de la gráfica de barras
  var ctxBarras = document.getElementById("graficaBarras").getContext("2d");
  var graficaBarras = new Chart(ctxBarras, {
    type: "bar",
    data: {
      labels: meses,
      datasets: [
        {
          label: "Ventas por mes",
          data: datosBarras,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
  });

  // Configuración de la gráfica de pastel
  var ctxPastel = document.getElementById("graficaPastel").getContext("2d");
  var graficaPastel = new Chart(ctxPastel, {
    type: "pie",
    data: {
      labels: ["Bodas", "XV Años", "Graduación"],
      datasets: [
        {
          data: datosPastel,
          backgroundColor: ["red", "green", "blue"],
        },
      ],
    },
  });

  // Contador de eventos
  var contadorEventos = 10;
  var contadorSpan = document.getElementById("contadorEventos");

  // Función para incrementar el contador
  function incrementarContador() {
    contadorSpan.textContent = contadorEventos;
  }

  // Asigna la función incrementarContador al hacer clic en el botón
  document
    .querySelector("button")
    .addEventListener("click", incrementarContador);
});
