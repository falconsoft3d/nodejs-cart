CREATE DATABASE nodejscart;

use nodejscart;


CREATE TABLE users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    image VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    active BOOLEAN
);

CREATE TABLE usersapp (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    iduser INT(6),
    idapp INT(6)
);

CREATE TABLE products (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    video VARCHAR(50),
    text TEXT,
    price FLOAT,
    active BOOLEAN,
    download INTEGER,
    category VARCHAR(250)
);

CREATE TABLE categories (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE comments (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT(6),
    text TEXT
);


-- Mostrar tablas
SHOW TABLES;