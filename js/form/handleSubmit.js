var mandaInputs = document.querySelectorAll('.input-section.mandatory');
var isPopup = [] // Kiểm tra alert đã pop-up chưa
var isSubmit = [] // kiểm tra có cho phép submit không
for (let i = 0; i < mandaInputs.length; i++) {
    isPopup[i] = true
    isSubmit[i] = false
}

document.addEventListener('click', function(e) {
    if (e.key === "Enter") {
        onSubmitClick()
    }
})

//Khi bấm submit
function onSubmitClick() {
    mandaInputs.forEach((section, index) => {
        var input = section.querySelector('input')
        var err = section.querySelector('.errMsg')
            // Không có input
        if (!input.value) {
            if (isPopup[index] === true) {
                isPopup[index] = false
                input.classList.add('error')
                err.classList.remove('hide')
                setTimeout(() => {
                    isPopup[index] = true
                    err.classList.add('hide')
                }, 3000)
            }

            isSubmit[index] = false
        }
        // Không có lỗi
        else {
            input.classList.remove('error')
            isSubmit[index] = true
        }
    })
    for (let i = 0; i < isSubmit.length; i++) {
        if (isSubmit[i] === false) {
            console.log('false')
            return false
        }
    }
    console.log("success")
    return true
}