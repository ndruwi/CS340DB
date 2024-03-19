/*
    Citation for the following function:
    Date: 3/18/2024
    Based on code from the OSU CS340 nodejs-starter-app GitHub page.
    Changed the title and body contents to meet the project requirements.
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
-->
*/

function deleteEmployee(employeeID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: employeeID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(employeeID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(employeeID){

    let table = document.getElementById("employees-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-id") == employeeID) {
            table.deleteRow(i);
            break;
       }
    }
}