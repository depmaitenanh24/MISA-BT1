// Bật/tắt form
var addNew = document.querySelector('.table .addBtn')
var values = document.querySelectorAll('form input')
addNew.addEventListener('click', function() {
    values.forEach(input => {
        input.value = "";
    })
    addOrUpdate = 0;
    form.classList.remove('hide')
})

var closeBtns = document.querySelectorAll('.close')
closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        closeBtn.parentElement.closest('.closeable').classList.add('hide')
    })
})

// Chuyển về dd/mm/yyyy
function formatDate(input) {
    if (input === "null")
        return input;
    var datePart = input.match(/\d+/g),
        year = datePart[0], // Lấy 4 số đầu
        month = datePart[1],
        day = datePart[2];
    return day + '/' + month + '/' + year;
}

// Refresh
var refresh = document.querySelector('.tool .refresh')
refresh.addEventListener('click', function() {
    window.location.reload();
})