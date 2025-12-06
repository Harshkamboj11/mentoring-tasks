create database PracticeDB;

use practiceDB;

create table users(
 id int auto_increment primary key,
 name varchar(50),
 email varchar(50),
 age int
);

create table products(
	id int auto_increment primary key,
    name varchar(50),
    category varchar(50),
    price int
);

INSERT INTO users (name, email, age) values
('Harsh', 'harsh@gmail.com', 22),
('Riya', 'riya@yahoo.com', 25),
('Aman', 'aman@gmail.com', 28),
('Sneha', 'sneha@outlook.com', 23),
('Raj', 'raj@gmail.com', 30);

INSERT INTO products (name, category, price) VALUES
('Mini Electric Chopper', 'Kitchen', 599),
('Bluetooth Speaker', 'Electronics', 1299),
('Laptop Stand', 'Office', 899),
('Wireless Mouse', 'Electronics', 499),
('Water Bottle', 'Lifestyle', 299);

select * from users;

select  * from users where age > 25;

select * from products order by price DESC;

select * from products order by price asc;

select * from users where email like '%gmail%';

