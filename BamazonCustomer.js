//Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

//Connection 
var connection = mysql.createConnection({
	host: "localhost",
	port: 3000,
	user: "root", 
	password: "Firebug@53"
	database: "Bamazon"

});

//Functions
function displayAll() {
	//displays all ids, names, and products from database
	connection.query('SELECT * FROM Products', function(error, response) {
		if(error) {console.log(error) };
		//New instance of our constructor
		var theDisplayTable = new Table({
			//declare the value catagories
			head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quanity']
			//set widths to scale
			colWidths: [10, 30, 18, 10, 14]
		});
		//for each row of the loop
		for (i = 0; i < response.length; i++) {
			//push data to table
			theDisplayTable.push(
				[response[i].ItemID, response[i].ProductName, response[i].DepartmentName, response[i].Price, response[i].StockQuanity]
			);
		}
		//log the completed table to console
		console.log(theDisplayTable.toString());
		inquireForPurchase();
	});

}; //end displayAll
function inquireForPurchase() {
	//get item ID and desired quanity from user. Pass to purchse from Database
	inquirer.prompt([

		{
			name: "ID",
			type: "input",
			message: "What is the item number of the item you would like to purchase?"
		}, {
			name: 'Quanity',
			type: 'input',
			message: "How many of these item would you like to purchase?"
		},

		]).then(function(answers) {
			//sets captured input as variable, pass variables as perameters.
			var quanityDesired = answers.Quanity;
			var IDDesired = answers.ID;
			purchaseFromDatabase(IDDesired, quantityDesired);
		}),

}; //end inquirerForPurchase

function purchaseFromDatabase(ID, quanityNeeded) {
	//check quanity of desired purchase. Minus quanity of the itemID from database if possible. Else inform user "Quanity desired not in stock"
	connection.query('SELECT * FROM Products WHERE ItemID = ' + ID, function(error, response) {
		if(error) {console.log(error) };

		//if in stock
		if (quanityNeeded <= response[0].StockQuanity) {
			//calculate cost
			var totalCost = response[0].Price * quanityNeeded;
			//inform user
			console.log("We have what you need in stock. Your order will be shipped within 1-2 business days.")
			console.log("Your total cost for " + quanityNeeded + " " + response[0].ProductName + " is" + totalCost + ". Thank you for your Business!");
			//update database, minus purchase quanity
			connection.query('UPDATE Products SET StockQuanity = StockQuanity - ' + ' WHERE ItemID = ' + ID);

		}else{
			console.log("Our apologies. We don't have enough " + response[0].ProductName + " to fulfill your order.");
		};
		displayAll();
	});

}; //end purchaseFromDatabase

displayAll();



