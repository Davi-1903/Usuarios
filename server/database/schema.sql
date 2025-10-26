create database db_users;
use db_users;

create table users(
    id int primary key auto_increment,
    name varchar(100) not null,
    email varchar(100) not null unique,
    password varchar(150) not null
);