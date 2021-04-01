
DROP DATABASE IF EXISTS Examenes;

CREATE DATABASE Examenes;
USE Examenes;

CREATE TABLE examenes( 
	examen BigInt NOT NULL,
	nombre VarChar( 50 ),
	num_preguntas Int NULL,
	PRIMARY KEY ( examen ) 
);


CREATE TABLE preguntas( 
	pregunta BigInt NOT NULL,
	examen BigInt NOT NULL,
	texto VarChar( 100 ),
	PRIMARY KEY ( pregunta, examen ),
	FOREIGN KEY ( examen ) REFERENCES examenes( examen ) 
);

CREATE TABLE respuestas( 
	respuesta BigInt NOT NULL,
	pregunta BigInt NOT NULL,
	examen BigInt  NOT NULL,
	texto VarChar( 100 ),
	correcta TINYINT NOT NULL,
	PRIMARY KEY ( respuesta, pregunta, examen ),
	FOREIGN KEY ( pregunta, examen ) REFERENCES preguntas( pregunta, examen ) 
);