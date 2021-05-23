function onRegister() {
   let formArray= $("form").serializeArray();
   let user;
   let admin;

    console.log(user)
    if (user === "adminUser") {
        admin = true
    }
   let data={};
    for (let index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    data = {
        title: data.title,
        firstname: data.firstname,
        lastname:data.lastname,
        email:data.email,
        phone: data.phone,
        password: data.password,
        isAdmin:admin
        // isAdmin: false

    }
    console.log(data);

    $.ajax({
        url: '/register' ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            // close the current registration modal
            close_popup_modal('registerModal')
            popup_modal('successModal', "You are now successfully registered. Continue to Login now")
            popup_modal('loginModal')


        },
        error: function (xhr, status, error) {
            console.log(error)
            popup_modal('successModal', "Email address already registered")
        }
    });

    event.preventDefault();

}

function popup_modal(id, message) {
    var modal = document.getElementById(id);

    if(modal.style.display == 'block')
        modal.style.display = 'none';
    else
        modal.style.display = 'block';

    if(id = 'successModal') {
        $("#successModal .message").text(message);

    }
}

function close_popup_modal(id) {
    var modal = document.getElementById(id);
    modal.style.display = "none";

}


function redirectToRegister(id) {
    close_popup_modal('loginModal')
    popup_modal('registerModal')
}
function logoutUser() {

    $.ajax({
        url: '/logout' ,
        type: 'POST',
        success: function (dataR) {
        },
        error: function (xhr, status, error) {
            console.log(error)
        }
    });

}