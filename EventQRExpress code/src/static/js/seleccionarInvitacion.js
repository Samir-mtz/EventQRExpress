document.addEventListener('DOMContentLoaded', function() {
    var imagenes = document.querySelectorAll('.imagen-container');
  
    imagenes.forEach(function(imagen) {
      imagen.addEventListener('click', function() {
        // Desactiva la clase 'clicked' en todas las imágenes
        imagenes.forEach(function(otraImagen) {
          otraImagen.classList.remove('clicked');
        });
  
        // Activa la clase 'clicked' solo en la imagen clicada
        this.classList.add('clicked');
      });
    });
  });
  