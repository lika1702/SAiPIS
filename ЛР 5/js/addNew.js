db = openDatabase("DataBase", "0.1", "A list of to do items.", 200000, function () {
    console.log("База данных открыта");
}, function () {
    console.log("Новая база данных");
});
if (!db) {
    alert("Failed to connect to database.");
}
db.transaction(function (arg) {
    arg.executeSql('CREATE TABLE IF NOT EXISTS MANAGERS(DEPARTMENT, ADRESS, QUANTITY, SURNAME, NAME, PATRONYMIC, PHONE UNIQUE)');
})


let form = document.querySelector('.add_manager');
let newManager = {};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    newManager = {
        department: form.department.value,
        adress: form.adress.value,
        q_employees: form.q_employees.value,
        surname: form.surname.value,
        name: form.name.value,
        patronymic: form.patronymic.value,
        phone: form.phone.value,
        email: form.email.value ? form.email.value : null,
    }
    event.target.reset();
    db.transaction(function (arg) {
        if (newManager.email) {
            arg.executeSql('INSERT INTO MANAGERS(DEPARTMENT, ADRESS, QUANTITY, SURNAME, NAME, PATRONYMIC, PHONE, EMAIL) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [newManager.department, newManager.adress, newManager.q_employees, newManager.surname, newManager.name, newManager.patronymic, newManager.phone, newManager.email]);
        } else {
            arg.executeSql('INSERT INTO MANAGERS(DEPARTMENT, ADRESS, QUANTITY, SURNAME, NAME, PATRONYMIC, PHONE) VALUES (?, ?, ?, ?, ?, ?, ?)', [newManager.department, newManager.adress, newManager.q_employees, newManager.surname, newManager.name, newManager.patronymic, newManager.phone]);
        }
    });
})

document.querySelector('.add_manager div').addEventListener('click', () => {
    //document.querySelector('label[for="email"]').removeAttribute('style');
    //document.querySelector('.add_manager div').style = 'display: none;';
    
    let newProperty = prompt('Имя для нового свойства');
    let newLabel = document.createElement('label');
    let newInput = document.createElement('input');
    
    newLabel.innerHTML = newProperty;
    newLabel.appendChild(newInput);
    
    document.querySelector('#for_new_property label:nth-last-child(2)').after(newLabel);
    
    let str = `ALTER TABLE MANAGERS ADD ${newProperty}`;
    db.transaction (function(arg) {
        arg.executeSql(str);
    })
})

