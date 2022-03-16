let table = document.querySelector('.align_table table'),
    btn_style = document.getElementById('btn-style'),
    btn_style_reset = document.getElementById('btn-style-reset'),
    btn_add = document.getElementById('btn-add');

let bg_color = '#fff957',
    text_color = '#444444',
    font_size = '20';

let tableRow = document.querySelectorAll('tr td');
let input = document.getElementById('string');


tableRow.forEach((row) => {
    row.addEventListener('mouseover', () => {
        input.value = row.textContent;
        input.style = 'color: ' + text_color + '; font-size: ' + font_size + 'px';
    })
    row.addEventListener('mouseout', () => {
        input.value = null;
    })
})

/*ДОБАВЛЕНИЕ СТРОКИ В ТАБЛИЦУ*/
btn_add.addEventListener('click', () => {
    newRow = table.insertRow(0);
    newCell = newRow.insertCell(0);
    newCell.innerHTML = document.querySelector('.align_table>table tr:nth-last-child(2)').textContent;

    newCell.addEventListener('mouseover', () => {
        input.value = newCell.textContent;
        input.style = 'color: ' + text_color + '; font-size: ' + font_size + 'px';
    })
    newCell.addEventListener('mouseout', () => {
        input.value = null;
    })
})

/*ИЗМЕНЕНИЕ СТИЛЯ HOVER*/
btn_style.addEventListener('click', () => {
    bg_color = document.getElementById('bg_color').value,
    text_color = document.getElementById('text_color').value,
    font_size = document.getElementById('font_size').value;
    
    let elem = document.querySelector('.align_table');
    elem.style.setProperty('--color-flash', bg_color);
    elem.style.setProperty('--color-text', text_color);
    elem.style.setProperty('--font-size', font_size + 'px');
})

/*СБРОС СТИЛЯ HOVER*/
btn_style_reset.addEventListener('click', () => {
    bg_color = '#fff957',
    text_color = '#444444',
    font_size = '20';

    document.getElementById('bg_color').selectedIndex = 0;
    document.getElementById('text_color').selectedIndex = 0;
    document.getElementById('font_size').selectedIndex = 0;
    
    let elem = document.querySelector('.align_table');
    elem.style.setProperty('--color-flash', bg_color);
    elem.style.setProperty('--color-text', text_color);
    elem.style.setProperty('--font-size', font_size + 'px');
})