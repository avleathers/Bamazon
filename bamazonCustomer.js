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
});

function start() {
    // connect to the mysql server and sql database
    connection.query("SELECT * FROM products", function (err, res) {
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
                message: "What is the ID of the product you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        // .then(function (input) {
        //     var item = (input.id) - 1;
        //     var numberUnits = parseInt(input.quantity);
        //     var totalPurchase = parseFloat(((res[item].price) * numberUnits).toFixed(2));

        //check if number of items are available
        // if (res[item].stock_quantity - numberUnits) {
        //     connection.query("UPDATE products SET ? WHERE ?", [
        //         { stock_quantity: (res[item].stock_quantity - numberUnits) },
        //         { ID: ans.id }
        //     ], function (err, result) {
        //         if (err) throw err;

        var item = input.id;
        var quantity = input.stock_quantity;

        if (data.length === 0) {
            console.log("ERROR: Invalid Item. Please select a valid item.");
            displayInventory();

        } else {
            var productData = data[0];
            // consolelog.("productData = " + JSON.stringify(productData));
            // consolelog.("productData.stock_quantity = " + productData.stock_quantity);
        }

        // If the quantity requested is in stock
        if (quantity <= product.stock_quantity) {
            console.log("Congratulations!  The item you requested is in stock!");


            // Update the product quantity string
            var updateProductQuantity = 'UPDATE products SET stock_quantity = ' + (product.stock_quantity - quantity) + ' WHERE id = " ' + item;

            // Update the inventory
            connection.query(updateProductQuantity, function (err, data) {
                if (err) throw err;

                // } = 'UPDATE products SET stock_quantity = ' + (product))
                console.log("YAY!  Your total is $" + product.price * quantity + ". Thank you for shopping with Bamazon.");

                connection.end();
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
        };
}

start();
