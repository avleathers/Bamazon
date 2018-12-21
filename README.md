# Bamazon
Amazon-like storefront homework

The link to the video showing how Bamazon works for a customer is here:

https://www.screencast.com/t/dQhUG4Xt8QWT

The app does the following:

1. Asked what item the customer would like to purchase, and checks that a valid item number is entered and if the item is available.
2. Then asks the quantity of the item the customer would like to purchase, and checks to see if the quantity is available.  If it is not, the customer sees a message that the quantity of the item is not avaiable.
3. If the item is available and the quantity requested is available, the app then reduces the quantity of other available items by the number purchased and updates the database with the new quantity of the item just purchased.
4. Asks the customer after each purchase if they would like to make additional purchases.
5. If yes, steps 1-4 above are repeated; if no, a message with the total dollar spent on the purchase is displayed with a thank you message.  