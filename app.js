/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 9614;

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

app.get('/index', function(req, res, next)
{
    res.status(200).render('index');
    });


app.get('/customers', function(req, res)
{
    let query1 = `SELECT * FROM Customers;`
    db.pool.query(query1, function(error, rows, fields){
        res.render('customers', {data: rows});
    })
});

app.post('/add-customer-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let email = parseInt(data['input-email']);
    if (isNaN(email))
    {
        email = 'NULL'
    }

    let phone = parseInt(data['input-phone']);
    if (isNaN(phone))
    {
        phone = 'NULL'
    }

    let address = parseInt(data['input-address']);
    if (isNaN(address))
    {
        address = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (firstName, lastName, email, phone, address) VALUES ('${data['input-fname']}', '${data['input-lname']}', ${email}, ${phone}, ${address})`;
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
            res.redirect('/customers');
        }
    })
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

app.get('/employees', function(req, res)
{
    let query1 = `SELECT * FROM Employees;`
    db.pool.query(query1, function(error, rows, fields){
        res.render('employees', {data: rows});
    })
});
app.post('/add-employee-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let email = parseInt(data['input-email']);
    if (isNaN(email))
    {
        email = 'NULL'
    }

    let phone = parseInt(data['input-phone']);
    if (isNaN(phone))
    {
        phone = 'NULL'
    }

    let address = parseInt(data['input-address']);
    if (isNaN(address))
    {
        address = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (firstName, lastName, email, phone, role) VALUES ('${data['input-fname']}', '${data['input-lname']}', ${email}, ${phone}, '${data['input-role']}' )`;
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
            res.redirect('/employees');
        }
    })
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
/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
