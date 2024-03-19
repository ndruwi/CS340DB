/*
    Citation for the following function:
    Date: 3/17/2024
    Based on code from the OSU CS340 nodejs-starter-app GitHub page.
    Changed the title and body contents to meet the project requirements.
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
-->
*/
// Get the objects we need to modify
let addPersonForm = document.getElementById('add-product-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProductName = document.getElementById("input-productName");
    let inputCategory = document.getElementById("input-category");
    let inputPrice = document.getElementById("input-price");
    let inputQuantity = document.getElementById("input-quantity");

    // Get the values from the form fields
    let productNameValue = inpuProducttName.value;
    let categoryValue = inputCategory.value;
    let priceValue = inputPrice.value;
    let quantityValue = inputQuantity.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: productNameValue,
        category: categoryValue,
        price: priceValue,
        quantity: quantityValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputProductName.value = '';
            inputCategory.value = '';
            inputPrice.value = '';
            inputQuantity.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("products-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 7 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let productNameCell = document.createElement("TD");
    let categoryCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");

    // Create and append the Edit and Delete button
    let editCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");
    

    // Fill the cells with correct data
    idCell.innerText = newRow.productID;
    productNameCell.innerText = newRow.name;
    lastNameCell.innerText = newRow.category;
    emailCell.innerText = newRow.price;
    phoneCell.innerText = newRow.quantity;

    editButton = document.createElement("button");
    editButton.textContent = "Edit";
    // Ensure the button has a consistent class if needed for styling or selection
    editButton.classList.add("edit-button");
    editButton.addEventListener('click', function() {
    // This function toggles the row to editable and updates the button to "Save"
    makeRowEditable(row, editButton);
    });
    editCell.appendChild(editButton);

    
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.customerID);
    };


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(addressCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

     // Add a row attribute so the deleteRow function can find a newly added row
     row.setAttribute('data-id', newRow.customerID);
    
    // Add the row to the table
    currentTable.appendChild(row);

}