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

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
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
        // function start() {
        inquirer.prompt([{
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
        }])

            .then(function (input) {
                console.log("Customer has selected : \n   id = " + input.id + "\n  quantity = " + input.quantity);
                var found = false;
                var newquantity;
                var product;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].id === parseInt(input.id)) {
                        found = true;
                        product = res[i];
                        newquantity = res[i].stock_quantity - input.quantity;
                    }
                }
                var item = input.id;

                if (!found) {
                    console.log("ERROR: Invalid Item. Please select a valid item.");
                    return start();

                } 


                // If the quantity requested is in stock
                if (newquantity >= 0) {
                    console.log("Congratulations!  The item you requested is in stock!");

                    // Update the product quantity string
                    var updateProductQuantity = 'UPDATE products SET stock_quantity = ' + (newquantity) + ' WHERE id = ' + input.id;

                    // Update the inventory
                    connection.query(updateProductQuantity, function (err, data) {
                        if (err) throw err;

                        // } = 'UPDATE products SET stock_quantity = ' + (product))
                        console.log("YAY!  Your total is $" + product.price * input.quantity + ". Thank you for shopping with Bamazon.");
                        reprompt();

                    });

                }

                else {
                    console.log("Sorry, there's not enough in stock!");
                     
                    reprompt();
                }
            });

        //asks if they would like to purchase another item
        function reprompt() {
            inquirer.prompt([{
                type: "confirm",
                name: "reply",
                message: "Would you like to purchase another item?"
            }]).then(function (ans) {
                if (ans.reply) {
                    start();
                } else {
                    console.log("Come back again soon!");
                    connection.end();
                }
            })
        }
    })
}
