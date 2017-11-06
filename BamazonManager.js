//Dependencies
var mysql = require('mysql');
var inquier = require('inquier');
var Table = require('cli-table');

//Connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3000
	user: "root",
	password: "Firebug@53",
	database: "Bamazon"
}),

//Functions
function displayAll() {
	//shows all ids, names, and products from database
	connection.query('SELECT * FROM Products', function(error,response) {
		if(error) {console.log(error) };
		//New instance of constructor
		var theDisplayTable = new Table({
			//declare the value categories
			head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quanity'],
			//set widths to scale
			colWidths: [10, 30, 18, 10, 14]
		});
		//for each row of the loop
		for (i = 0; i < response.length; i++) {
			//push data to table
			theDisplayTable.push(
				[response[i].ItemID, response[i].ProductName, rsponse[i].DepartmentName, response[i].Price, response[i].StockQuanity]
				);
			}
			//log the completed table to console
			console.log(theDisplayTable.toString());
			inquireForUpdate(); 
		});
}; //end displayAll

function inquireForUpdates() {
	//inquire for input
	inquirer.prompt([{
		name: "action",
		type: "list",
		message: "Choose an option below to manage the store:",
		choices: ["Restock Inventory", "Add New Product", "Remove An Existing Product"]
	}]).then(function(answers) {
		//select user response, launch corresponding function
		swith (answers.action) {

			case 'Restock Inventory':
				restockRequest ();
				break;

			case 'Add New Product':
				addRequest();
				break;

			case 'Remove An Existing Product':
				removeRequest();
				break;
		}
	});
}; //end inquireForUpdates

function restockRequest() {
	//gather data from user
	inquirer.prompt([

		{
			name: "ID",
			type: "input",
			message: "What is the item number of the item you would like to restock?"
		}, {
			name: 'Quanity',
			type: 'input',
			message: "How many would you like to add?"
		},

	]).then(function(answers) {
		//set captured input as variables, pass variables as perameters.
		var quantityAdded = answers.Quanity;
		var IDOFProduct = answers.ID;
		restockDatabase(IDOfProduct, quanityAdded);
	});
}; //end restockRequest

//runs on user parameters from the request function
function restockDatabase(id, quant) {
	//update the database
	connection.query('SELECT * FROM Products Where ItemID = ' + id, function(error, response) {
		if (error) { console.log(error) };
		connection.query('UPDATE Products SET StockQuanity = StockQuanity + ' + quant + 'WHERE ItemID = ' + id);
		//re-run display to show updated results
		displayAll();
	});
}; //end restockDataBase

function addRequest() {
	inquirer.prompt([

		{
			name: "Name",
			type: "input",
			message: "What is the name of the item you would like to restock?"
		},
		{
			name: "Category",
			type: "input",
			message: "What is the category for this product?"
		},
		{
			name: 'Quanity',
			type: 'input',
			message: "How many of this item would you like to add?"
		},

    ]).then(function(answers) {
    	//gather user input, store as variables, pass as parameters
    	var name = answer.Name;
    	var category = answers.Category;
    	var price = answers.Price;
    	var quanity = answers.Quanity;
    	buildNewItem(name,category,price,quanity);
    });
}; //end add Request

function buildNewItem(name,category,price,quanity) {
	//query database, insert new item
		connection.query('INSERT INTO Products (ProductName,Price,StockQuanity) VALUES("' + name + '","' + category + '",' + price + ',' + quanity + ')');
	//display update results
		displayAll();

}; //end buildNewItem

function removeRequest(){
		inquirer.prompt([{
			name: "ID",
			type: "input",
			message: "What is the item number of the item you would like to remove?"
	}]).then (function(answer) {
		var id = answer.ID;
		removeFromDataBase(id);
	});
}; //end removeRequest

function removalFromDatabase(id){
		connection.query('DELETE FROM Products WHERE ItemID = ' + id);
		displayAll();

}; //end removalFromDatabase

displayAll();

