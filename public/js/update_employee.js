/*
    Citation for the following function:
    Date: 3/18/2024
    Guided by this guide fom weblesson.info
    Changed a lot of things and had assistant from chatGPT to troubleshoot problems
    Source URL: https://www.webslesson.info/2022/04/insert-update-delete-data-from-mysql-in-node-js-using-express-js.html
-->
*/


// Event listener for Edit button
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('employees-table').addEventListener('click', function(e) {
        if (e.target && e.target.matches('.edit-button')) {
            let row = e.target.closest('tr');
            makeRowEditable(row);
        }
    });
});

function makeRowEditable(row) {
    if (row.getAttribute('data-editable') === 'true') return;
    row.setAttribute('data-editable', 'true');

    let cellsToEdit = row.querySelectorAll('td:not(:first-child):not(:nth-last-child(-n+2))');
    cellsToEdit.forEach(function(cell) {
        let currentValue = cell.innerText;
        cell.innerHTML = `<input type="text" value="${currentValue}">`;
    });

    let editButton = row.querySelector('.edit-button');
    editButton.innerText = 'Save';
    // Temporarily store the original event listener
    editButton._originalEventListener = editButton.onclick;
    editButton.onclick = function() {
        saveUpdatedEmployee(row);
    };
}

function saveUpdatedEmployee(row) {
    let inputs = row.querySelectorAll('input');
    let updatedData = {
        id: row.getAttribute('data-id'),
        firstName: inputs[0].value,
        lastName: inputs[1].value,
        email: inputs[2].value,
        phone: inputs[3].value,
        role: inputs[4].value,
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open('PATCH', '/update-employee-ajax/' + encodeURIComponent(updatedData.id), true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onload = function() {
        if (xhttp.status === 200) {
            let response = JSON.parse(xhttp.responseText);
            updateRowDisplay(row, response.customer);
            row.removeAttribute('data-editable');
            let editButton = row.querySelector('.edit-button');
            editButton.innerText = 'Edit';
            editButton.onclick = function() {
                makeRowEditable(row);
            };
        } else {
            console.error('Error updating employee:', xhttp.responseText);
            alert('Error updating employee: ' + xhttp.responseText);
        }
    };

    xhttp.send(JSON.stringify(updatedData));
}

function updateRowDisplay(row, employee) {
    // Ensure the original number of cells is maintained after updating
    let cells = row.querySelectorAll('td:not(:first-child):not(:nth-last-child(-n+2))');
    
    // Update the text of each cell
    cells[0].innerText = employee.firstName;
    cells[1].innerText = employee.lastName;
    cells[2].innerText = employee.email;
    cells[3].innerText = employee.phone;
    cells[4].innerText = employee.role;

    // Reset the button to 'Edit'
    let editButton = row.querySelector('.edit-button');
    editButton.innerText = 'Edit';
    editButton.onclick = editButton._originalEventListener;

    // Remove the 'data-editable' attribute to signify the row is no longer being edited
    row.removeAttribute('data-editable');
}