/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 9664;

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({
    extname: ".hbs",
    helpers: {
        toJSON: function(object) {
            return JSON.stringify(object);
        }
    }
}));
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

app.get('/index', function(req, res, next)
{
    res.status(200).render('index');
    });

app.get('/supplyorders', function(req, res, next)
{
        res.status(200).render('supplyorders');
        });

app.get('/customers', function(req, res)
{
    let query1 = `SELECT * FROM Customers;`
    db.pool.query(query1, function(error, rows, fields){
        res.render('customers', {data: rows});
    })
});

app.post('/add-customer-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // capture null values
    let phone = parseInt(data.phone);
    if (isNaN(phone))
    {
        phone = 'NULL';
    }
    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (firstName, lastName, email, phone, address) VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', ${phone}, '${data.address}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            });
        }
    });
});

app.delete('/delete-customer-ajax', function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.id);
    let delete_customer = `DELETE FROM Customers WHERE customerID = ?`;
  
  
          // Run the 1st query
            db.pool.query(delete_customer, [customerID], function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
        }
  })
});

app.patch('/update-customer-ajax/:id', function(req, res, next){
    let data = req.body;
    let customerID = parseInt(data.id);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let email = data.email;
    let phone = data.phone;
    let address = data.address;

    let updateQuery = `UPDATE Customers SET firstName = ?, lastName = ?, email = ?, phone = ?, address = ? WHERE customerID = ?`;

    db.pool.query(updateQuery, [firstName, lastName, email, phone, address, customerID], function(error, results, fields){
        if (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            // Respond with a JSON object
            res.status(200).json({ message: "Customer updated successfully", customer: { id: customerID, firstName, lastName, email, phone, address } });
        }
    });
});


app.get('/employees', function(req, res)
{
    let query1 = `SELECT * FROM Employees;`
    db.pool.query(query1, function(error, rows, fields){
        res.render('employees', {data: rows});
    })
});

app.post('/add-employee-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (firstName, lastName, email, phone, role) VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', ${data.phone}, '${data.role}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            });
        }
    });
});

app.patch('/update-employee-ajax/:id', function(req, res, next){
    let data = req.body;
    let employeeID = parseInt(data.id);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let email = data.email;
    let phone = data.phone;
    let role = data.role;

    let updateQuery = `UPDATE Employees SET firstName = ?, lastName = ?, email = ?, phone = ?, role = ? WHERE employeeID = ?`;

    db.pool.query(updateQuery, [firstName, lastName, email, phone, role, employeeID], function(error, results, fields){
        if (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            // Respond with a JSON object
            res.status(200).json({ message: "Employee updated successfully", customer: { id: employeeID, firstName, lastName, email, phone, role } });
        }
    });
});

app.get('/suppliers', function(req, res)
{
    let query1 = `SELECT * FROM Suppliers;`
    db.pool.query(query1, function(error, rows, fields){
        res.render('suppliers', {data: rows});
    })
});

app.post('/add-supplier-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Suppliers (supplierName, location) VALUES ('${data['input-supplierName']}','${data['input-location']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/suppliers');
        }
    })
});

app.get('/products', function(req, res)
{
    let query1 = `SELECT * FROM Products;`
    db.pool.query(query1, function(error, rows, fields){
        res.render('products', {data: rows});
    })
});

app.post('/add-product-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Products (category, name, price, quantity) VALUES ('${data['input-category']}', '${data['input-productName']}', '${data['input-price']}', '${data['input-quantity']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/products');
        }
    })
});

app.delete('/delete-supplier-ajax', function(req,res,next){
    let data = req.body;
    let supplierID = parseInt(data.id);
    let delete_supplier = `DELETE FROM Suppliers WHERE supplierID = ?`;
  
  
          // Run the 1st query
            db.pool.query(delete_supplier, [supplierID], function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
                
        }
        
  })
});

app.delete('/delete-product-ajax', function(req,res,next){
    let data = req.body;
    let productID = parseInt(data.id);
    let delete_product = `DELETE FROM Products WHERE productID = ?`;
  
  
          // Run the 1st query
            db.pool.query(delete_supplier, [supplierID], function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
                
        }
        
  })
});

app.delete('/delete-employee-ajax', function(req,res,next){
    let data = req.body;
    let employeeID = parseInt(data.id);
    let delete_employee = `DELETE FROM Employees WHERE employeeID = ?`;
  
  
          // Run the 1st query
            db.pool.query(delete_employee, [employeeID], function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
                
        }
        
  })
});

app.get('/customerorders', function(req, res) {
    let queryOrders = `SELECT 
        Orders.orderID,
        CONCAT(Customers.firstName, ' ', Customers.lastName) AS CustomerName,
        CONCAT(Employees.firstName, ' ', Employees.lastName) AS EmployeeName,
        Orders.orderType,
        Orders.orderStatus,
        Orders.orderDate,
        Orders.total,
        OrderProducts.productID,
        OrderProducts.quantity,
        OrderProducts.priceAtSale
    FROM 
        Orders
    INNER JOIN 
        Customers ON Orders.customerID = Customers.customerID
    LEFT JOIN 
        Employees ON Orders.employeeID = Employees.employeeID
    JOIN 
        OrderProducts ON Orders.orderID = OrderProducts.orderID;`;

    let queryCustomers = 'SELECT customerID, CONCAT(firstName, " ", lastName) AS name FROM Customers';
    let queryEmployees = 'SELECT employeeID, CONCAT(firstName, " ", lastName) AS name FROM Employees';
    let queryProducts = 'SELECT productID, name FROM Products';

    // Fetch Orders
    db.pool.query(queryOrders, function(errorOrders, orders) {
        if (errorOrders) {
            console.error('Error fetching orders:', errorOrders);
            return res.status(500).send('Error loading customer orders');
        }

        // Fetch Customers
        db.pool.query(queryCustomers, function(errorCustomers, customers) {
            if (errorCustomers) {
                console.error('Error fetching customers:', errorCustomers);
                return res.status(500).send('Error loading customers');
            }

            // Fetch Employees
            db.pool.query(queryEmployees, function(errorEmployees, employees) {
                if (errorEmployees) {
                    console.error('Error fetching employees:', errorEmployees);
                    return res.status(500).send('Error loading employees');
                }

                // Fetch Products
                db.pool.query(queryProducts, function(errorProducts, products) {
                    if (errorProducts) {
                        console.error('Error fetching products:', errorProducts);
                        return res.status(500).send('Error loading products');
                    }

                    // Render the page with all fetched data
                    res.render('customerorders', {
                        ordersData: orders,
                        customers: customers,
                        employees: employees,
                        products: products
                    });
                });
            });
        });
    });
});

app.post('/add-customerorder-ajax', function(req, res) {
    let data = req.body;

    // First, fetch the price of the product to calculate the total for the order
    let queryFetchPrice = 'SELECT price FROM Products WHERE productID = ?';
    db.pool.query(queryFetchPrice, [data.productID], function(error, result) {
        if (error) {
            console.log(error);
            return res.sendStatus(400); // Bad request
        }

        // Assuming the price is fetched successfully and result[0].price contains the price
        let priceAtSale = result[0].price;
        let total = priceAtSale * data.quantity;

        let queryInsertOrder = `INSERT INTO Orders (customerID, employeeID, orderType, orderStatus, orderDate, total) VALUES (?, ?, ?, ?, ?, ?)`;
        db.pool.query(queryInsertOrder, [data.customerID, data.employeeID, data.orderType, data.orderStatus, data.orderDate, total], function(error, orderResult) {
            if (error) {
                console.log(error);
                return res.sendStatus(400); // Bad request
            }

            let orderID = orderResult.insertId; // Assuming this gets the ID of the newly inserted order
            let queryInsertOrderProduct = `INSERT INTO OrderProducts (orderID, productID, quantity, priceAtSale) VALUES (?, ?, ?, ?)`;
            db.pool.query(queryInsertOrderProduct, [orderID, data.productID, data.quantity, priceAtSale], function(error, finalResult) {
                if (error) {
                    console.log(error);
                    return res.sendStatus(400); // Bad request
                }

                // Finally, respond successfully. You might want to fetch and send back the new order details
                res.sendStatus(200); // OK
            });
        });
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

app.get('/orders', function(req, res)
{
    let query1 = `SELECT * FROM Orders;`
    db.pool.query(query1, function(error, rows, fields){
        res.render('orders', {data: rows});
    })
});

app.post('/add-order-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Orders (orderType, orderStatus, orderDate, total) VALUES ('${data['input-orderType']}', '${data['input-orderStatus']}', '${data['input-orderdate']}', '${data['input-status']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/orders');
        }
    })
});

app.delete('/delete-order-ajax', function(req,res,next){
    let data = req.body;
    let orderID = parseInt(data.id);
    let delete_order = `DELETE FROM Orders WHERE orderID = ?`;
  
  
          // Run the 1st query
            db.pool.query(delete_order, [orderID], function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
                
        }
        
  })
});

app.get('/add-order', async (req, res) => {
    try {
        // Assuming db.query is promisified
        const customers = await db.query('SELECT customerID, CONCAT(firstName, " ", lastName) AS name FROM Customers');
        const employees = await db.query('SELECT employeeID, CONCAT(firstName, " ", lastName) AS name FROM Employees');
        const products = await db.query('SELECT productID, name FROM Products');
        
        // Render the form with the fetched data
        res.render('add-order', { customers, employees, products });
    } catch (error) {
        console.error('Failed to fetch data for order form:', error);
        res.status(500).send('Error loading order form');
    }
});

app.get('/purchaseorderproducts', function(req, res)
{
    let query1 = `SELECT * FROM PurchaseOrderProducts;`
    db.pool.query(query1, function(error, rows, fields){
        res.render('purchaseorderproducts', {data: rows});
    })
});

app.get('/purchaseorders', function(req, res)
{
    let query1 = `SELECT * FROM PurchaseOrders;`
    db.pool.query(query1, function(error, rows, fields){
        res.render('purchaseorders', {data: rows});
    })
});

app.get('/orderproducts', function(req, res)
{
    let query1 = `SELECT * FROM OrderProducts;`
    db.pool.query(query1, function(error, rows, fields){
        res.render('orderproducts', {data: rows});
    })
});
