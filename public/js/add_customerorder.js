/*
    Citation for the following function:
    Date: 3/7/2024
    Based on code from the OSU CS340 nodejs-starter-app GitHub page.
    Changed the title and body contents to meet the project requirements.
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
-->
*/


document.addEventListener('DOMContentLoaded', function() {
    let addOrderForm = document.getElementById('add-customerorder-form');

    addOrderForm.addEventListener('submit', function(e) {
        // Prevent the form from submitting normally
        e.preventDefault();

        // Get form fields we need to get data from
        let inputCustomerID = document.getElementById('input-customerID').value;
        let inputEmployeeID = document.getElementById('input-employeeID').value;
        let inputOrderType = document.getElementById('input-orderType').value;
        let inputOrderStatus = document.getElementById('input-orderStatus').value;
        let inputOrderDate = document.getElementById('input-orderDate').value;
        let inputProductID = document.getElementById('input-productID').value;
        let inputQuantity = document.getElementById('input-quantity').value;

        // Put our data we want to send in a javascript object
        let data = {
            customerID: inputCustomerID,
            employeeID: inputEmployeeID,
            orderType: inputOrderType,
            orderStatus: inputOrderStatus,
            orderDate: inputOrderDate,
            productID: inputProductID,
            quantity: inputQuantity
        };
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/add-customerorder-ajax', true);
        xhttp.setRequestHeader('Content-type', 'application/json');

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Handle successful addition of order
                console.log('Order added successfully');
                alert('Order added successfully!');
                addRowToTable(xhttp.response);
                // Optionally clear the form or update UI
                addOrderForm.reset();
                // You might want to update some part of your page to reflect the new order
            } else if (xhttp.readyState == 4) {
                console.log('There was an error with the input.');
                alert('There was an error adding the order.');
            }
        };

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    });
});

addRowToTable = (data) => {
    // Parse the response data (assuming JSON)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]; // Assuming the last object is the new row

    // Get a reference to the orders table body
    let currentTable = document.getElementById("customerorders-table").getElementsByTagName('tbody')[0];

    // Insert a new row at the end of the table
    let row = currentTable.insertRow();

    // Create cells for the order information
    let orderIDCell = row.insertCell(0);
    let customerNameCell = row.insertCell(1);
    let employeeNameCell = row.insertCell(2);
    let orderTypeCell = row.insertCell(3);
    let orderStatusCell = row.insertCell(4);
    let orderDateCell = row.insertCell(5);
    let totalCell = row.insertCell(6);
    let productCell = row.insertCell(7);
    let quantityCell = row.insertCell(8);
    let priceatsaleCell = row.insertCell(9);

    // Fill the cells with order data
    orderIDCell.innerText = newRow.orderID;
    customerNameCell.innerText = newRow.CustomerName;
    employeeNameCell.innerText = newRow.EmployeeName;
    orderTypeCell.innerText = newRow.orderType;
    orderStatusCell.innerText = newRow.orderStatus;
    orderDateCell.innerText = newRow.orderDate;
    totalCell.innerText = newRow.total;
    productCell.innerText=newRow.productName;
    quantityCell.innerText=newRow.quantity;
    priceatsaleCell.innerText=newRow.priceatsaleName;

    let editCell = row.insertCell(-1); // Adjust cell index as needed
    let deleteCell = row.insertCell(-1); // Adjust cell index as needed
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    // Add your edit functionality
    editCell.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    // Add your delete functionality, for example:
    deleteButton.addEventListener('click', function() {
        deleteOrder(newRow.orderID);
    });
    deleteCell.appendChild(deleteButton);

    // Set a data attribute for the row if needed
    row.setAttribute('data-id', newRow.orderID);
}