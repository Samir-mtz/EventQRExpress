function resaltarSeccionActual() {
  let top = window.scrollY;

  document.querySelectorAll("section").forEach((sec) => {
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    let opcion = document.querySelector(`.navbar a[href="#${id}"]`);

    if (top >= offset && top < offset + height) {
      sec.classList.add("seleccion");
      if (opcion) {
        opcion.closest("li").classList.add("seleccion");
      }

      // Actualizo los titulos de la pagina
      if (id === "inicio") document.title = "EventQRXpress | Inicio";
      else if (id === "conocenos") document.title = "EventQRXpress | Conócenos";
      else if (id === "conocenos") document.title = "EventQRXpress | Conócenos";
      else if (id === "servicios") document.title = "EventQRXpress | Servicios";
      else if (id === "referencias") document.title = "EventQRXpress | Referencias";
      else document.title = "EventQRXpress";

    } else {
      sec.classList.remove("seleccion");
      if (opcion) {
        opcion.closest("li").classList.remove("seleccion");
      }
    }
  });

  // Agregar evento clic a cada enlace del menú para ocultar la barra de navegación
  document.querySelectorAll(".navbar .links a").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelector(".navbar .links").classList.remove("show-menu");
    });
  });
}

window.addEventListener("scroll", resaltarSeccionActual);
document.addEventListener("DOMContentLoaded", resaltarSeccionActual);
