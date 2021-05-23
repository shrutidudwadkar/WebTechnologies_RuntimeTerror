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
        success: function (data) {
            console.log(data)

            close_popup_modal('loginModal')
            popup_modal('successModal', "Login successful.")
            window.location.href = "./welcome"

            /*
            document.getElementById("user").innerHTML = "Hi, " + data.name;
            document.getElementById("logout").innerHTML = "Logout";
            document.getElementById("loginId").style.display = "none";
            document.getElementById("registerId").style.display = "none";

             */



        },
        error: function (xhr, status, error) {
            popup_modal('successModal', "Invalid username or password. Please try again")
            // alert('Error: ' + error.message);
        }
    });

    event.preventDefault();
}
