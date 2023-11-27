function resaltarSeccionActual() {
  let top = window.scrollY;

  document.querySelectorAll("section").forEach((sec) => {
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    let opcion = document.querySelector(`.navBar a[href="#${id}"]`);

    if (top >= offset && top < offset + height) {
      sec.classList.add("seleccion");
      if (opcion) {
        opcion.closest("li").classList.add("seleccion");
      }
    } else {
      sec.classList.remove("seleccion");
      if (opcion) {
        opcion.closest("li").classList.remove("seleccion");
      }
    }
  });
}

window.addEventListener("scroll", resaltarSeccionActual);
document.addEventListener("DOMContentLoaded", resaltarSeccionActual);
