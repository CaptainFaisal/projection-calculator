const addRow = () => {
    const table = document.getElementById("myTable");
    const newRow = table.insertRow(table.rows.length);
    const cells = [];
    const cols = table.rows[0].cells.length;
    for (var i = 0; i < cols; i++) {
        cells[i] = newRow.insertCell(i);
        cells[i].innerHTML = i < cols - 3 ? "<input type='text' class='form-control' value='0'  onClick='this.setSelectionRange(0, this.value.length)'>" : "";
    }
}

const removeRow = () => {
    const table = document.getElementById("myTable");
    if (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1);
    }
}
const makeNotNaN = (elements) => elements.map(element => isNaN(element) ? 0 : element);

const calculate = () => {
    const table  = document.getElementById("myTable");
    const rows = table.rows;
    Array.from(rows).slice(1).forEach(row => {
        const cells = row.cells;
        const cols = cells.length;
        const digits = 3;
        const [Px, Py, Pz, Qx, Qy, Qz, zp] = makeNotNaN(Array.from(cells).slice(0, cols - 3).map(cell => parseFloat(cell.children[0].value)));
        const x_prime = (Px*Qz-Pz*Qx+zp*Qx)/(-Pz+Qz+zp);
        const y_prime = (Py*Qz-Pz*Qy+zp*Qy)/(-Pz+Qz+zp);
        const z_prime = zp*(-Pz+zp+Qz)/(-Pz+Qz+zp);
        cells[cols - 3].innerHTML = x_prime.toFixed(digits);
        cells[cols - 2].innerHTML = y_prime.toFixed(digits);
        cells[cols - 1].innerHTML = z_prime.toFixed(digits);
    });
}