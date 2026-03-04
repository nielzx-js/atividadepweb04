CREATE DATABASE IF NOT EXISTS sistema_questoes;
USE sistema_questoes;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS disciplinas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  carga_horaria INT
);

CREATE TABLE IF NOT EXISTS questoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  enunciado TEXT,
  alt_a VARCHAR(255),
  alt_b VARCHAR(255),
  alt_c VARCHAR(255),
  alt_d VARCHAR(255),
  correta CHAR(1),
  disciplina_id INT,
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
);
