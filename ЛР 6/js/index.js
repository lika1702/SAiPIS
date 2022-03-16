$('#button0').click(function () {window.location.reload();});
$('#button1').click(handlerForButton1);
$('#button2').click(handlerForButton2);
$('input[type="submit"]').click(handlerForSubmit);

function handlerForButton1() {
    for (let i = 3; i < 7; i++)
        if (i % 2 == 0)
            $('.class' + i).addClass('classNew').removeClass(`class${i}`);
            //$('.class' + i).css(classNew);
    for (let i = 1; i <= 12; i++)
        if (i % 2 == 0) {
            let size = $('#img' + i).css(['width', 'height']);
            $('#img' + i).animate({
                width: 1.3 * parseInt(size.width),
                height: 1.3 * parseInt(size.height)
            }, {
                duration: 'normal',
                easing: 'swing'
            });
        }
}
function handlerForButton2() {
    $('.blackout').removeAttr('style');
}
function handlerForSubmit() {
    event.preventDefault();
    let form = $('form')[0];
    let params = {
        width: form.width.value,
        type: form.border_type.value,
        color: form.color.value,
    }
    for (let i = 1; i < 7; i++)
        if (i % 2 == 1) {
            let images = ($(`.class${i} img`));
            for (let j = 0; j < images.length; j++) {
                let index = +images[j].id.substring(3, images[j].id.length)
                if (index % 2 == 1) $(`.class${i} #img${index}`).fadeOut(1200);
                else $(`.class${i} #img${index}`).css('border', `${params.width}px ${params.type} ${params.color}`);
            }
        }
    $('.blackout').css('display', 'none');
}