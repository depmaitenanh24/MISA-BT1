var inputIcons = document.querySelectorAll(".input-icon")
var counter = document.querySelector(".counter span")
var tableBody = document.querySelector('table tbody')

window.onload = async function() {
    await callAPI()

    // Filter with input

    var filter = document.querySelector('.tool input')
    var tableRows = document.querySelectorAll('tbody tr')
    filter.addEventListener('input', function() {
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
    return row;
}

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

function formatDate(input) {
    var datePart = input.match(/\d+/g),
        year = datePart[0].substring(0), // get only two digits
        month = datePart[1],
        day = datePart[2];

    return day + '/' + month + '/' + year;
}