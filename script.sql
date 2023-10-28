create DATABASE eventqrxpress;
use eventqrxpress;
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) not null,
    email VARCHAR(100) not null,
    telefono VARCHAR(20) not null,
    contraseña VARCHAR(200)not null,
    tipo VARCHAR(50)not null,
    confirmed BOOLEAN DEFAULT false,
    confirmed_on DATE
);


