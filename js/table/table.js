var inputIcons = document.querySelectorAll(".input-icon")
var counter = document.querySelector(".counter span")
var funtionCol = document.querySelectorAll('.funtion-content')
    //something to change

counter.innerText = document.querySelector(".table-section table").rows.length - 1
inputIcons.forEach(inputIcon => {
    //khi bấm nút thả xuống
    var dropdownBtn = inputIcon.querySelector('.dropdown')
    var dropdown = inputIcon.querySelector('ul')
    dropdownBtn.addEventListener('click', function() {
            dropdown.classList.toggle('non-exist')
            this.classList.toggle('rotate')
        })
        //khi chọn 1 option
    var input = inputIcon.querySelector('input')
    var options = inputIcon.querySelectorAll('ul li')
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
    dropdown.style.height = `${(options.length)*40}px`
})

// dropdown trong cột funtion

funtionCol.forEach(item => {
    var dropdownBtn = item.querySelector('.dropdown')
    var dropdown = item.querySelector('ul')
    dropdownBtn.addEventListener('click', function() {
        dropdown.classList.toggle('non-exist')
        dropdown.classList.toggle('hide')
        this.classList.toggle('rotate')
    })
    var options = item.querySelectorAll('ul li')
    options.forEach(option => {
        option.addEventListener('click', function() {
            dropdown.classList.add('non-exist')
            dropdown.classList.add('hide')
            dropdownBtn.classList.remove("rotate")
        })
    })
})

// xóa cột

var deteleBtns = document.querySelectorAll('.funtion-content ul li.delete')
deteleBtns.forEach(deteleBtn => {
    deteleBtn.addEventListener('click', function() {
        deteleBtn.parentElement.closest('tr').remove()
        counter.innerText = document.querySelector(".table-section table").rows.length - 1
    })
})