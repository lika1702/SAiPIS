let modalWindow = document.querySelector('.blackout'),
    close = document.querySelector('.close'),
    refResult = document.querySelector(".menu>li:last-child"),
    form = document.getElementById('form');

let inputName = document.querySelector("[name='name']"),
    inputSurname = document.querySelector("[name='surname']"),
    inputPhone = document.querySelector("[name='phone']");
    inputCheck = document.querySelector("[name='source']");

inputName.oninvalid = function (event) {
    event.target.setCustomValidity('Фамилия и Имя пользователя должны содержать строчные и прописные буквы русского и латинского алфавита');
}
inputSurname.oninvalid = function (event) {
    event.target.setCustomValidity('Фамилия и Имя пользователя должны содержать строчные и прописные буквы русского и латинского алфавита');
}
inputPhone.oninvalid = function (event) {
    event.target.setCustomValidity('Номер телефона должен иметь формат 8(___)___-__-__');
}
inputCheck.oninvalid = function (event) {
    event.target.setCustomValidity('Необходимо выбрать хотя бы один пункт');
}

function getChecked() {
    let selected = document.querySelectorAll('[name=source]:checked');
    let mas = [];
    for (let i = 0; i < selected.length; i++) mas.push(selected[i].value);
    return mas;
}

function requiredCheckbox() { 
    let el = document.querySelectorAll('[name=source]'); 
    let isOneChecked = false;
    for( i = 0; i < el.length; i++) {
        if(el[i].checked === true) 
            isOneChecked = true; 
    }
    if(isOneChecked === true)
        for ( i = 0; i < el.length; i++) { el[i].required = false; } 
    else for ( i = 0; i < el.length; i++) { el[i].required = true; }
}

form.addEventListener('submit', () => {
    let key = localStorage.length;
    const data = {
        name: form.name.value,
        surname: form.surname.value,
        phone: form.phone.value,
        email: form.email.value,
        tour: form.tour.value,
        quantity: form.num_people.value,
        source: getChecked(),
        mark: form.mark.checked = true ? form.mark.value : 0,
        color: form.color.value,
        country: form.country.value
    }
    localStorage.setItem(key, JSON.stringify(data));
})

refResult.addEventListener('click', (event) => {
    event.preventDefault();
    let table = document.all.table_result;
    let datalist = document.getElementById('clients-list');

    modalWindow.classList.remove("hidden");

    if (localStorage.length == 0) {
        let el = document.querySelector('.scroll');
        el.style = 'width: 100%; height: calc(50% - 50px); overflow-y: scroll; margin-top: 50px; font: 20px Arial, sans-serif; color: #444;';
        el.innerText = 'Еще никто не проходил опрос. Станьте первым!';
        return;
    }

    for (let i = 0; i < localStorage.length; i++) {
        try {
            obj = JSON.parse(localStorage.getItem(i));
            newRow = table.insertRow();
            newCell = newRow.insertCell(0);
            newCell.innerText = `${obj.surname} ${obj.name}`;
            newCell = newRow.insertCell(1);
            newCell.innerText = obj.phone;
            newCell = newRow.insertCell(2);
            newCell.innerText = obj.email;
            newCell = newRow.insertCell(3);
            newCell.innerText = obj.tour;
            newCell = newRow.insertCell(4);
            newCell.innerText = obj.quantity;
            newCell = newRow.insertCell(5);
            newCell.innerText = obj.mark ? `${obj.mark} ★` : 'нет оценки';
            newCell = newRow.insertCell(6);
            newCell.innerText = obj.source;
            datalist.appendChild(document.createElement('option')).value = `${obj.surname} ${obj.name}`;
        } catch (e) {
            console.log('Error');
            alert('Что-то пошло не так!');
        }
    }
})

close.addEventListener('click', () => {
    window.location.reload()
})


/*СТИЛИЗАЦИЯ РЕЗУЛЬТИРУЮЩЕЙ ТАБЛИЦЫ*/
let styleForm = document.querySelector('.table-style');

styleForm.addEventListener('change', (event) => {
    event.preventDefault();

    let data = {
        color: styleForm.color.value,
        border: styleForm.border.value,
        size: styleForm.size.value
    }

    let th = document.querySelectorAll('#table_result th');
    let td = document.querySelectorAll('#table_result td');
    let tr_last = document.querySelectorAll('#table_result tr:last-child td');
    for (let i = 0; i < td.length; i++) {
        td[i].style =
            `border-left: ${data.border}px solid ${data.color}; border-right: ${data.border}px solid ${data.color}; font-size: ${data.size}px;`;
    }
    for (let i = 0; i < th.length; i++) {
        th[i].style = `background: ${data.color}`;
        tr_last[i].style = `border: ${data.border}px solid ${data.color}; border-top: 0; font-size: ${data.size}px;`;
    }
})

styleForm.addEventListener('reset', () => {
    let th = document.querySelectorAll('#table_result th');
    let td = document.querySelectorAll('#table_result td');
    let tr_last = document.querySelectorAll('#table_result tr:last-child td');
    for (let i = 0; i < td.length; i++) {
        td[i].removeAttribute('style');
    }
    for (let i = 0; i < th.length; i++) {
        th[i].removeAttribute('style');
        tr_last[i].removeAttribute('style');
    }
})
