var counter = document.querySelector(".counter span")
var tableBody = document.querySelector('table tbody')
var form = document.querySelector('.form')
var addOrUpdate = 0;

window.onload = async function() {
    await callAPI()

    // Filter with input
    var filter = document.querySelector('.tool input')
    filter.addEventListener('input', function() {
        var tableRows = document.querySelectorAll('tbody tr')
        tableRows.forEach(row => {
            if (row.querySelector('td.name').innerHTML.toLowerCase().search(filter.value.trim().toLowerCase()) === -1) {
                row.classList.add('hide')
            } else {
                row.classList.remove('hide')
            }
        })
    })
}

//  CallAPI
async function callAPI() {
    await fetch('https://amis.manhnv.net/api/v1/Employees').then(res => res.json()).then(data => {
        for (let i = 0; i < data.length; i++) {
            var row = addRow(data[i])
            tableBody.appendChild(row)
                // Đếm số hàng
            counter.innerText = document.querySelector(".table-section table").rows.length
        };
    })
}

//Truyền vào data trả về 1 row
function addRow(data) {
    var dateOfBirth = data.DateOfBirth
    if (dateOfBirth) {
        dateOfBirth = formatDate(dateOfBirth.slice(0, 10))
    }
    var row = document.createElement('tr')
    row.innerHTML = `<td style="text-align: center"><label class="checkbox-container">
                        <input type="checkbox" name="checkbox">
                        <span class="checkmark"></span>
                        </label></td>
                        <td>${data.EmployeeCode}</td>
                        <td class = "name">${data.EmployeeName}</td>
                        <td style="text-align: center;">${dateOfBirth}</td>
                        <td>${data.IdentityNumber}</td>
                        <td>${data.EmployeePosition}</td>
                        <td>${data.DepartmentName}</td>
                        <td>${data.BankAccountNumber}</td>
                        <td>${data.BankName}</td>
                        <td>${data.BankProvinceName}</td>
                        <td class="funtion" style="text-align: center;">
                            <div class="funtion-content">
                                <p>Sửa</p>
                                <div class="dropdown"></div>
                                <ul class="non-exist hide">
                                    <li class="delete">
                                        Xóa</li>
                                    <li class ="duplicate">
                                        Nhân bản</li>
                                </ul>
                            </div>
                        </td>`

    // Thêm dropdown cho cột chức năng
    var funtionCol = row.querySelector('.funtion-content')
    var dropdownBtn = funtionCol.querySelector('.dropdown')
    var dropdown = funtionCol.querySelector('ul')
    dropdownBtn.addEventListener('click', function() {
        dropdown.classList.toggle('non-exist')
        dropdown.classList.toggle('hide')
        this.classList.toggle('rotate')
    })
    var options = funtionCol.querySelectorAll('ul li')
    options.forEach(option => {
        option.addEventListener('click', function() {
            dropdown.classList.add('non-exist')
            dropdown.classList.add('hide')
            dropdownBtn.classList.remove("rotate")
        })
    })

    // Xóa hàng
    var deteleBtn = row.querySelector('.funtion-content ul li.delete')
    deteleBtn.addEventListener('click', function() {
            deteleBtn.parentElement.closest('tr').remove()
            counter.innerText -= 1
        })
        //Nhân bản
    var duplicateBtn = row.querySelector('.funtion-content ul li.duplicate')
    duplicateBtn.addEventListener('click', function() {
            var rowDup = addRow(data)
            row = row.parentNode.insertBefore(rowDup, row)
            counter.innerText = parseInt(counter.innerText) + 1
        })
        // Sửa thông tin
    var updateBtn = row.querySelector('.funtion-content p')
    updateBtn.addEventListener('click', function() {
        var inputs = document.querySelectorAll('form input')
        inputs.forEach(input => {
            var name = input.getAttribute('name')
            if (data[name] === "null")
                input.value = ""
            else
                input.value = data[name]
        })
        form.classList.remove('hide')
        addOrUpdate = row;
    })
    return row;
}

//Kiểm tra submit

var mandaInputs = document.querySelectorAll('.input-section.mandatory');
var isPopup = [] // Kiểm tra alert đã pop-up chưa
var isSubmit = [] // kiểm tra có cho phép submit không
for (let i = 0; i < mandaInputs.length; i++) {
    isPopup[i] = true
    isSubmit[i] = false
}

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
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
        // Có lỗi thì dừng đoạn code
    for (let i = 0; i < isSubmit.length; i++) {
        if (isSubmit[i] === false) {
            return false
        }
    }
    // Thêm vào bảng
    var values = document.querySelectorAll('form input')
    var data = getData(values)
    var row = addRow(data)
    if (addOrUpdate === 0) {
        var isUnique = true
        var tableRows1 = document.querySelectorAll('tbody tr')
        tableRows1.forEach(tableRow => {
            if (tableRow.children[1].innerText === data['EmployeeCode']) {
                showModal(data['EmployeeCode'])
                isUnique = false;
            }
        })
        if (isUnique === false) {
            return false;
        }
        tableBody.insertBefore(row, tableBody.firstChild)
        counter.innerText = parseInt(counter.innerText) + 1
        form.classList.add('hide')
    } else {
        tableBody.insertBefore(row, addOrUpdate)
        addOrUpdate.remove()
        form.classList.add('hide')
    }

    return false;
}

// Lấy data từ các input

function getData(inputs) {
    var data = {};
    inputs.forEach(input => {
        if (!input.value) {
            data = {...data, [input.getAttribute('name')]: "null" }
        } else {
            data = {...data, [input.getAttribute('name')]: input.value }
        }
    })
    return data;
}