// Función para cambiar el título al hacer clic en las pestañas de Ingresar o Registrar
function cambiarTituloFormulario(tipo) {
  if (tipo === "Ingresar") {
    document.title = "EventQRXpress | Ingresar";
  } else if (tipo === "Registrar") {
    document.title = "EventQRXpress | Registrar";
  } else {
    document.title = "EventQRXpress";
  }
}

// Función para agregar eventos de clic a los enlaces "Ingresa" y "Crear una"
function agregarEventosClic() {
  document.getElementById("enlaceIngresar").addEventListener("click", function () {
    cambiarTituloFormulario("Ingresar");
  });

  document.getElementById("enlaceRegistrar").addEventListener("click", function () {
    cambiarTituloFormulario("Registrar");
  });
}

// Restaurar el título por defecto al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  cambiarTituloFormulario("Ingresar");
  agregarEventosClic();
});
