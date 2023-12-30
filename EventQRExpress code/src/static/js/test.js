function imgDown() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/guardarArchivo', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Archivo guardado correctamente en el servidor');
        } else {
          console.error('Error al enviar el archivo al servidor');
        }
      }
    };
  
    xhr.send(JSON.stringify({ imgUrl: imgUrl }));
  }
  