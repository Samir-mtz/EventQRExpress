create DATABASE eventqrxpress;
use eventqrxpress;
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(100) not null,
    email VARCHAR(100) not null,
    telefono VARCHAR(20) not null,
    contraseña VARCHAR(200)not null,
    tipo VARCHAR(50) not null,
    confirmed BOOLEAN DEFAULT false,
    confirmed_on DATE
);
CREATE TABLE evento (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(100) not null,
    fecha BOOLEAN DEFAULT false,
    hora_inicio time not null,
    hora_fin time not null,
    asistentes INT not null,
    tipo VARCHAR(50) not null,
    lugar VARCHAR(100) not null,
    id_usuario INT NOT NULL,
    id_salon INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_salon) REFERENCES salon(id)
);

CREATE TABLE salon (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    calle VARCHAR(100) not null,
    colonia VARCHAR(100) not null,
    ciudad VARCHAR(100) not null,
    capacidad INT not null,
);

CREATE TABLE confirmaciones
(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    confirmed BOOLEAN DEFAULT false NOT NULL,
    asistentes INT NOT NULL,
    id_evento INT NOT NULL,
    FOREIGN KEY (id_evento) REFERENCES evento(id)
);

CREATE TABLE usuarios_confirmados
(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    id_confirmacion INT NOT NULL,
    asiento INT NOT NULL,
    FOREIGN KEY (id_confirmacion) REFERENCES confirmaciones(id)
);


