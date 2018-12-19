var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // My port number
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
})

function start() {
    // connect to the mysql server and sql database
    connection.query("SELECT * FROM Products", function (err, res) {
        if (err) throw err;

        console.log("Welcome to Bamazon!");

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
        }

        console.log(" ");
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the ID of theh product you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        },

            {
                type: "input",
                name: "quantity",
                message: "How many units of the product would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }

        .then(function (ans) {
            var item = (ans.id) - 1;
            var numberUnits = parseInt(ans.quantity);
            var totalPurchase = parseFloat(((res[item].price) * numberUnits).toFixed(2));

            //check if number of items are available
            if (res[item].stock_quantity - numberUnits) {
                connection.query("UPDATE products SET ? WHERE ?", [
                    { stock_quantity: (res[item].stock_quantity - numberUnits) },
                    { ID: ans.id }
                ], function (err, result) {
                    if (err) throw err;
                    console.log("YAY!  Your total is $" + totalPurchase.toFixed(2) + ". Your items will be shipped to you within 5 business days");
                });

            } else {
                console.log("Sorry, there's not enough in stock!");
            }

            reprompt();
        }),

        //asks if they would like to purchase another item
        function reprompt() {
            inquirer.prompt([{
                type: "confirm",
                name: "reply",
                message: "Would you like to purchase another item?"
            }]).then(function (ans) {
                if (ans.reply) {
                } else {
                    console.log("Come back again soon!");
                }
            });
        });
    }

start();
