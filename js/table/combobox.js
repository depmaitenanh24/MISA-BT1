//Event của các combobox
var rowOnPages = document.querySelector(".table-pages .input-icon")
    //khi bấm nút thả xuống
var dropdownBtn = rowOnPages.querySelector('.dropdown')
var dropdown = rowOnPages.querySelector('ul')
dropdownBtn.addEventListener('click', function() {
        dropdown.classList.toggle('non-exist')
        this.classList.toggle('rotate')
    })
    //khi chọn 1 option
var input = rowOnPages.querySelector('input')
var options = rowOnPages.querySelectorAll('ul li')
options.forEach(option => {
        option.addEventListener('click', function() {
            options.forEach(item => {
                item.classList.remove('chose')
            })
            option.classList.add('chose')
            input.value = option.innerText
            dropdown.classList.add('non-exist')
            dropdownBtn.classList.remove("rotate")
        })
    })
    //set width dựa trên số lượng li
dropdown.style.height = `${(options.length)*20}px`


// Refresh
var refresh = document.querySelector('.tool .refresh')
refresh.addEventListener('click', function() {
    window.location.reload();
})