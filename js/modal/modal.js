function showModal(EmployeeCode) {
    var modal = document.querySelector('.alert')
    modal.querySelector('.modal-body span').innerText = EmployeeCode;
    modal.classList.remove('hide')
}