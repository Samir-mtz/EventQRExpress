create DATABASE eventqrxpress;

use eventqrxpress;

CREATE TABLE
    usuarios (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        nombre VARCHAR(100) not null,
        email VARCHAR(100) not null,
        telefono VARCHAR(20) not null,
        password VARCHAR(200) not null,
        tipo VARCHAR(50) not null,
        confirmed BOOLEAN DEFAULT false,
        confirmed_on DATE
    );

CREATE TABLE
    salon (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        calle VARCHAR(100) not null,
        colonia VARCHAR(100) not null,
        ciudad VARCHAR(100) not null,
        capacidad INT not null
    );

CREATE TABLE
    evento (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        nombre VARCHAR(100) not null,
        fecha VARCHAR(100) not null,
        horario VARCHAR(100) not null,
        asistentes INT not null,
        tipo VARCHAR(50) not null,
        lugar VARCHAR(100) not null,
        id_usuario INT NOT NULL,
        id_salon INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
        FOREIGN KEY (id_salon) REFERENCES salon(id)
    );

CREATE TABLE
    confirmaciones (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(200) not null,
        confirmed BOOLEAN DEFAULT false NOT NULL,
        asistentes INT NOT NULL,
        id_evento INT NOT NULL,
        invitacion VARCHAR(100) NOT NULL,
        FOREIGN KEY (id_evento) REFERENCES evento(id) ON DELETE CASCADE
    );

CREATE TABLE
    usuarios_confirmados (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        id_confirmacion INT NOT NULL,
        asiento VARCHAR(20) NOT NULL,
        FOREIGN KEY (id_confirmacion) REFERENCES confirmaciones(id) ON DELETE CASCADE
    );


    INSERT INTO salon(id,calle,colonia,ciudad,capacidad) VALUES(1,'Manuel Carpio 251','Sta María la Ribera','Cuauhtémoc',120);
    INSERT INTO salon(id,calle,colonia,ciudad,capacidad) VALUES(2,'Persia 123','Romero Rubio','Venustiano Carranza',80);
    INSERT INTO salon(id,calle,colonia,ciudad,capacidad) VALUES(3,'Armada de Mexico 1422','Coapa','Coyoacán',200);
    INSERT INTO salon(id,calle,colonia,ciudad,capacidad) VALUES(4,'Av. Ejército Nacional Mexicano 613','Polanco','Miguel Hidalgo',100);
