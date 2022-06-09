var inputIcons = document.querySelectorAll("form .input-icon")
var mandaInputs = document.querySelectorAll('.input-section.mandatory');

inputIcons.forEach(inputIcon => {
    //khi bấm nút thả xuống
    var dropdownBtn = inputIcon.querySelector('.dropdown')
    var dropdown = inputIcon.querySelector('ul')
    dropdownBtn.addEventListener('click', function() {
            dropdown.classList.toggle('non-exist')
        })
        //khi chọn 1 option
    var input = inputIcon.querySelector('input')
    var options = inputIcon.querySelectorAll('ul li')
    options.forEach(option => {
            var check = option.querySelector('div')
            option.addEventListener('click', function() {
                options.forEach(item => {
                    var untick = item.querySelector('div')
                    untick.classList.add('disappear')
                    item.classList.remove('chose')
                })
                check.classList.remove('disappear')
                option.classList.add('chose')
                input.value = option.innerText
                dropdown.classList.add('non-exist')
            })
        })
        //set width dựa trên số lượng li
    dropdown.style.height = `${(options.length)*40}px`
})

// onblur
mandaInputs.forEach(item => {
    var input = item.querySelector('input')
    input.onblur = function() {
        if (!input.value) {
            input.classList.add('error')
        } else {
            input.classList.remove('error')
        }
    }
})