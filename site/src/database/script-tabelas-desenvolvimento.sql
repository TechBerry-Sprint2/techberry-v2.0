CREATE DATABASE TechBerry;
USE TechBerry;

CREATE TABLE cliente(
    idCliente INT PRIMARY KEY auto_increment,
    nomeCliente VARCHAR(45) NOT NULL,
    CNPJ CHAR(18) NOT NULL UNIQUE,
    telefoneCliente CHAR(15) NOT NULL UNIQUE,
    emailCliente CHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL
);

CREATE TABLE estufa(
    idEstufa INT PRIMARY KEY auto_increment,
    apelidoEstufa VARCHAR(45) NOT NULL,
    enderecoEstufa VARCHAR(96) NOT NULL,
    idCliente INT NOT NULL,
    FOREIGN KEY(idCliente) REFERENCES cliente(idCliente)
) auto_increment = 5000;

CREATE TABLE sensor(
    idSensor INT PRIMARY KEY auto_increment,
    modelo VARCHAR(45) NOT NULL,
    serialNumber VARCHAR(45) NOT NULL,
    idEstufa INT NOT NULL,
    FOREIGN KEY(idEstufa) REFERENCES estufa(idEstufa)
)auto_increment = 2000;

CREATE TABLE medida(
    idMedida INT PRIMARY KEY auto_increment,
    temperaturaRegistrada FLOAT NOT NULL,
    umidadeRegistrada FLOAT CHECK(umidadeRegistrada < 101 AND umidadeRegistrada > -1) NOT NULL,
    horarioRegistro DATETIME NOT NULL,
    idSensor INT NOT NULL,
    FOREIGN KEY(idSensor) REFERENCES sensor(idSensor)
) auto_increment = 10000;

INSERT INTO cliente VALUES (null, 'Ryan Yuji', '06.376.383/0001-83', '(11) 98888-7777', 'ryan@gmail.com', '123');
insert into estufa values (null, 'Estufa 1 do Ryan', 'Rua Haddock Lobo, 595', 1);
insert into sensor values (null, 'DHT-11', 'SN-0236541', 5000);
insert into medida values (null, 10.25, 78.25, now(),  2000);
insert into medida values (null, 25.25, 50.25, now(),  2000);
insert into medida values (null, 12.25, 30.25, now(),  2000);
insert into medida values (null, 20.25, 90.25, now(),  2000);
insert into medida values (null, 25.38, 80.50, now(),  2000);
insert into medida values (null, 9.38, 10.50, now(),  2000);
insert into medida values (null, 28.38, 10.50, now(),  2000);
insert into medida values (null, 8.38, 10.50, now(),  2000);
insert into medida values (null, 50.38, 10.50, now(),  2000);
insert into medida values (null, 2.38, 10.50, now(),  2000);

select * from medida;
select * from cliente;

update cliente set emailCliente = 'ryan@gmail.com' where idCliente = 1;
