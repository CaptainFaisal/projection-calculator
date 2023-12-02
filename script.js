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

const data = [];
const calculate = () => {
    data.length = 0;
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
        data.push({Px, Py, Pz, Qx, Qy, Qz, zp, x_prime, y_prime, z_prime})
    });
}
const generateTable = () => {
    const thead = document.querySelector(".head");
    thead.classList.remove("hide");
    document.querySelectorAll("table")[1].classList.remove("hide");
    const table = document.getElementById("result");
    table.innerHTML = "";
    data.forEach((row, index) => {
        const cols = Object.keys(row).length;
        const tr = document.createElement("tr");
        for(let i = 0; i < cols; i++) {
            const td = document.createElement("td");
            td.innerHTML = Object.values(row)[i].toFixed(3);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    });
}

const removeTable = () => {
    const table = document.querySelectorAll("table")[1];
    table.classList.add("hide");
}