document.addEventListener("DOMContentLoaded", function () {
    let menuLateral = document.querySelector(".menuLateral");
    let closeBtn = document.querySelector("#btn");
    let links = document.querySelectorAll(".navBar li");
  
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        // Elimina la clase 'seleccion' de todos los elementos
        links.forEach(function (el) {
          el.classList.remove("seleccion");
        });
  
        // Agrega la clase 'seleccion' al elemento clicado, excluyendo el enlace de configuración
        if (!link.classList.contains("configuracion")) {
          link.classList.add("seleccion");
        }
  
        // Cierra el menú lateral y actualiza el botón del menú
        toggleMenu();
      });
    });
  
    // Modifica el evento de clic para el enlace de configuración
    document
      .querySelector(".configuracion")
      .addEventListener("click", function (event) {
        event.preventDefault(); // Evita la navegación predeterminada
  
        // Elimina la clase 'seleccion' de todos los elementos
        links.forEach(function (el) {
          el.classList.remove("seleccion");
        });
  
        // Cierra el menú lateral y actualiza el botón del menú
        toggleMenu();
      });
  
    closeBtn.addEventListener("click", function () {
      // Alterna la clase 'open' en la barra lateral y actualiza el botón del menú
      menuLateral.classList.toggle("open");
      menuBtnChange();
    });
  
    function toggleMenu() {
      menuLateral.classList.remove("open");
      menuBtnChange();
    }
  
    function menuBtnChange() {
      if (menuLateral.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    }
    
    // Añade el evento de desplazamiento para resaltar automáticamente la sección activa
    window.addEventListener("scroll", function () {
      let scrollPosition = window.scrollY;
      let sectionId = null;
  
      // Itera sobre las secciones y encuentra la que está en la parte superior de la pantalla
      document.querySelectorAll(".contenido").forEach(function (section) {
        if (
          scrollPosition >= section.offsetTop &&
          scrollPosition + 20 < section.offsetTop + section.clientHeight
        ) {
          sectionId = section.id;
        }
      });
  
      // Si se encontró una sección, resalta el enlace correspondiente
      if (sectionId) {
        links.forEach(function (el) {
          el.classList.remove("seleccion");
          if (el.querySelector("a").getAttribute("href") === "#" + sectionId) {
            el.classList.add("seleccion");
          }
        });
      }
    });
  });

  