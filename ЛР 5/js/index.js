let table = document.querySelector('table');

let db = openDatabase("DataBase", "0.1", "A list of to do items.", 200000);
if (!db) {
    alert("Failed to connect to database.");
}

class Department {
    department
    adress
    employee
    surname
    name
    patronymmic
    phone
    email
    constructor(department, adress, employee, surname, name, patronymic, phone, email = undefined) {
        this.department = department;
        this.adress = adress;
        this.employee = employee;
        this.surname = surname;
        this.name = name;
        this.patronymic = patronymic;
        this.phone = phone;
        if (email !== undefined) {
            this.email = email;
        }
    }
    createNewProperty(email) {
        this.email = email;
    }
}

let DepartmentSet = new Set();

function createTable() {
    db.transaction(function (arg) {
        arg.executeSql('SELECT * FROM MANAGERS', [], function (t, result) {

            for (let i = 0; i < result.rows.length; i++) {
                newRow = table.insertRow();
                newCell = newRow.insertCell(0);
                newCell.innerHTML = result.rows.item(i).DEPARTMENT;

                newCell = newRow.insertCell(1);
                newCell.innerHTML = result.rows.item(i).ADRESS;

                newCell = newRow.insertCell(2);
                newCell.innerHTML = result.rows.item(i).QUANTITY;

                newCell = newRow.insertCell(3);
                newCell.innerHTML = result.rows.item(i).SURNAME + ' ' + result.rows.item(i).NAME + ' ' + result.rows.item(i).PATRONYMIC;

                newCell = newRow.insertCell(4);
                newCell.innerHTML = result.rows.item(i).EMAIL ? result.rows.item(i).PHONE + ' ' + result.rows.item(i).EMAIL : result.rows.item(i).PHONE;
                
                let newDepartment = new Department(result.rows.item(i).DEPARTMENT, result.rows.item(i).ADRESS, result.rows.item(i).QUANTITY, result.rows.item(i).SURNAME, result.rows.item(i).NAME, result.rows.item(i).PATRONYMIC, result.rows.item(i).PHONE, result.rows.item(i).EMAIL);
                DepartmentSet.add(newDepartment);
            }
        });
    })
}

createTable();

/*ОТОБРАЖЕНИЕ ОКНА УДАЛЕНИЯ*/
document.getElementById('delete').addEventListener('click', () => {
    document.querySelector('.modal_for_delete').classList.add('active');
    db.transaction(function (arg) {
        arg.executeSql('SELECT DEPARTMENT, ADRESS, SURNAME, NAME, PATRONYMIC FROM MANAGERS ORDER BY DEPARTMENT', [], function (t, result) {

            for (let i = 0; i < result.rows.length; i++) {
                let newInput = document.createElement('input');
                let newLabel = document.createElement('label');
                newInput.type = 'checkbox';
                newInput.name = 'delete';
                newInput.id = 'delete' + i;
                newLabel.setAttribute('for', 'delete' + i);
                newLabel.setAttribute('department', result.rows.item(i).DEPARTMENT);
                newLabel.setAttribute('adress', result.rows.item(i).ADRESS);
                newLabel.setAttribute('surname', result.rows.item(i).SURNAME);
                newLabel.innerHTML = `${result.rows.item(i).DEPARTMENT} (по адресу ${result.rows.item(i).ADRESS}) менеджер - ${result.rows.item(i).SURNAME} ${result.rows.item(i).NAME} ${result.rows.item(i).PATRONYMIC}`;
                newRow = document.querySelector('.modal_window table').insertRow();
                newCell = newRow.insertCell(0);
                newCell.appendChild(newInput);
                newCell.appendChild(newLabel);
            }
        });
    })

})
document.getElementById('delete_by_id').addEventListener('click', () => {
    document.querySelector('body .modal_for_delete:nth-child(7)').classList.add('active');
    db.transaction(function (arg) {
        arg.executeSql('SELECT rowid, DEPARTMENT, ADRESS, SURNAME FROM MANAGERS ORDER BY rowid', [], function (t, result) {
            let existSelect = document.querySelector('.modal_window select');
            for (let i = 0; i < result.rows.length; i++) {
                let newOption = document.createElement('option');
                newOption.value = result.rows.item(i).rowid;
                newOption.setAttribute('department', result.rows.item(i).DEPARTMENT);
                newOption.setAttribute('adress', result.rows.item(i).ADRESS);
                newOption.setAttribute('surname', result.rows.item(i).SURNAME);
                newOption.innerHTML = `${result.rows.item(i).rowid} - ${result.rows.item(i).DEPARTMENT}`;
                existSelect.appendChild(newOption);
            }
        });
    })
})

/*УДАЛЕНИЕ*/
document.getElementById('submit-delete').addEventListener('click', () => {
    db.transaction(function (arg) {
        let label = document.querySelectorAll('[name=delete]:checked+label');
        for (let i = 0; i < label.length; i++) {
            arg.executeSql('DELETE FROM MANAGERS WHERE DEPARTMENT = ? AND ADRESS = ? AND SURNAME = ?', [label[i].getAttribute('department'), label[i].getAttribute('adress'), label[i].getAttribute('surname')], function (t, result) {
                DepartmentSet.forEach((elem) => {
                    if(elem.department == label[i].getAttribute('department') && elem.adress == label[i].getAttribute('adress') && elem.surname == label[i].getAttribute('surname')) DepartmentSet.delete(elem);
                })
               window.location.reload();
            });
        }
    })
})
document.getElementById('submit-delete_by_id').addEventListener('click', () => {
    db.transaction(function (arg) {
        let mySelect = document.querySelector('.modal_window select');
        arg.executeSql('DELETE FROM MANAGERS WHERE rowid = ? ', [mySelect.value], function (t, result) {
            DepartmentSet.forEach((elem) => {
                console.log(elem.department);
                if(elem.department == mySelect.getAttribute('department') && elem.adress == mySelect.getAttribute('adress') && elem.surname == mySelect.getAttribute('surname')) DepartmentSet.delete(elem);
            })
            window.location.reload();
        });
    })
})

document.querySelectorAll('[value="Отмена"]').forEach((elem) => {
    elem.addEventListener('click', () => {
        document.querySelector('.modal_for_delete').classList.remove('active');

        window.location.reload();
    })
})

function findMAXQuantity(collection) {
    let max = 0;
    DepartmentSet.forEach((elem) => {
        if(+elem.employee > max) { max = elem.employee; }
    });
    return max;
}
function findMINQuantity(collection) {
    let min = 100000;
    collection.forEach((elem) => {
        if(+elem.employee < min) min = elem.employee;
    });
    return min;
}
function findByEmployee(collection, empl) {
    let mas = [];
    collection.forEach((elem) => {
        if(+elem.employee == empl) mas.push(elem);
    });
    return mas;
}

document.querySelector('#max').addEventListener('click', (event) => {
    event.preventDefault();
    let max = findMAXQuantity(DepartmentSet);
    let departments = findByEmployee(DepartmentSet, max);
    document.querySelector('body .modal_for_delete:nth-child(8)').classList.add('active');
    document.querySelector('body .modal_for_delete:nth-child(8) h2').innerHTML = "Отдел(ы) с максимальным числом сотрудников :";
    document.querySelector('body .modal_for_delete:nth-child(8) .modal_window .span').innerHTML = max;
    let newDiv = document.createElement('div');
    newDiv.style = 'font: 18px Arial, sans-serif; color: #444; margin-top: 50px; height: 40%; text-align: left; padding: 0 50px;'
    document.querySelector('body .modal_for_delete:nth-child(8) .modal_window').appendChild(newDiv);
    for(let i = 0; i < departments.length; i++) {
        newDiv.innerHTML += '<p>' + departments[i].department + ' - ' + departments[i].surname + ' ' + departments[i].name + ' ' + departments[i].patronymic + '</p';
    }
    
    
})
document.querySelector('#min').addEventListener('click', (event) => {
    event.preventDefault();
    let min = findMINQuantity(DepartmentSet);
    let departments = findByEmployee(DepartmentSet, min);
    document.querySelector('body .modal_for_delete:nth-child(8)').classList.add('active');
    document.querySelector('body .modal_for_delete:nth-child(8) h2').innerHTML = "Отдел(ы) с минимальным числом сотрудников :";
    document.querySelector('body .modal_for_delete:nth-child(8) .modal_window .span').innerHTML = min;
    let newDiv = document.createElement('div');
    newDiv.style = 'font: 18px Arial, sans-serif; color: #444; margin-top: 50px; height: 40%; text-align: left; padding: 0 50px;'
    document.querySelector('body .modal_for_delete:nth-child(8) .modal_window').appendChild(newDiv);
    for(let i = 0; i < departments.length; i++) {
        newDiv.innerHTML += '<p>' + departments[i].department + ' - ' + departments[i].surname + ' ' + departments[i].name + ' ' + departments[i].patronymic + '</p';
    }
})

document.querySelector('.close').addEventListener('click', () => {
    window.location.reload()
})