function loginUser() {
    let formArray= $("form").serializeArray();
    let data={};
    for (let index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }

    data = {
        email: data.email1,
        password: data.password1,
    }


    console.log(data)

    $.ajax({
        url:  '/login' ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var ret = dataR;
            close_popup_modal('loginModal')
            popup_modal('successModal', "Login successful.")
            document.getElementById("loginId").innerHTML = "Hi", dataR.firstname;

        },
        error: function (xhr, status, error) {
            popup_modal('successModal', "Invalid username or password. Please try again")
            // alert('Error: ' + error.message);
        }
    });

    event.preventDefault();
}
