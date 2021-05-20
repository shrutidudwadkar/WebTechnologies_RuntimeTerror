function loginUser() {
    event.preventDefault();
    event.stopImmediatePropagation();

    var myForm = document.getElementById('loginForm');
    var formData = new FormData(myForm);

    console.log(formData)

    $.ajax({
        url:  '/login' ,
        data: formData,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (dataR) {
            var ret = dataR;
            close_popup_modal('loginModal')
            popup_modal('successModal', "Login successful.")
            document.getElementById("loginId").innerHTML = "Hi", dataR.name;

        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });

    return false;
}
