DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price INTEGER(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('CDs', 'Music', 15, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Vitamins', 'Health', 20, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Coffee', 'Grocery', 10, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Tea', 'Grocery', 5, 80);
INSERT INTO products (product_name department_name, price, stock_quantity) values ('Dog Beds', 'Pet Supplies', 150, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Backgammon Set','Games', 200, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Candles', 'Housewares', 10, 80);
INSERT INTO products (product_name department_name, price, stock_quantity) values ('KitchenAid Mixer', 'Kitchen Appliances', 300, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Dog Food', 'Pet Supplies', 35, 15);
