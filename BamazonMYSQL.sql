/*Create and declare inital table*/
CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE Products(
		ItemID INTEGER(10) AUTO_INCREMENT NOT NULL,
	ProductName VARCHAR(50) NOT NULL,
	DepartmentName VARCHAR(50) NOT NULL,
	Price DECIMAL(10,2) NOT NULL,
	StockQuanity INTEGER(10),
	primary key (ItemId)
);
/*synatax for creating new product*/
INSERT INTO Products(ProductName,DepartmentName,Price,StockQuanity) VALUES('Samsung 75" QLED Ultra HD TV','Electronics',3195.00,37);

/*Create new row to ensure database has data*/
INSERT INTO Products(ProductName,DepartmentName,Price,StockQuality) VALUES('Bose Wireless Headphones','Electronics',347.50,50);

/* More options*/
INSERT INTO Products(ProductName,DepartmentName,Price,StockQuanity) VALUES('Google Home Wireless Speaker','Electronics',108.99);
INSERT INTO Products(ProductName,DepartmentName,Price,StockQuanity) VALUES('Samsung 55" LED Ultra HD TV','Electronics',1158.99);
INSERT INTO Products(ProductName,DepartmentName,Price,StockQuanity) VALUES('HP Spectre x360 Convertible Laptop','Electronics',1268.99);

