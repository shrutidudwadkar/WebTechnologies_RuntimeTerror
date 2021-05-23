function addAnimalInfo() {
    event.preventDefault();
    event.stopImmediatePropagation();

    var myForm = document.getElementById('addAnimalForm');
    var formData = new FormData(myForm);

    console.log(formData)

    $.ajax({
        url: '/addAnimal',
        data: formData,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (dataR) {
            var ret = dataR;
            close_popup_modal('addAnimalModal')
            popup_modal('successModal', "Animal added.")
        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });

    return false;
}

function applyForAdoption() {
    event.preventDefault();
    var animalId = document.getElementById('animalId').value
    var email = document.getElementById("email").value

    info = {
        animalId: animalId,
        email: email,
        isAdopted: true
    }


    $.ajax({
        url: '/adopt',
        data: info,
        dataType: 'json',
        type: 'POST',

        success: function (dataR) {
            var ret = dataR;
            console.log(dataR)
            close_popup_modal('adoptionModal')
            popup_modal('successModal', "Thank you for showing interest in adoption. From all of us here we would like you to know that today you have taken a step in making the world a better place. Congratulations and we hope you will be very happy together and create many paw-fect memories along the way. While we complete the formalities in the meantime if you have any questions or queries don't hesitate to reach out to us. ")
            location.reload(true);
        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });

    return false;

}


function onTextComment() {
    let formArray = $("form").serializeArray();
    let data = {};
    for (let index in formArray) {
        data[formArray[index].name] = formArray[index].value;
    }

    data = {
        animalId: data.animalId,
        newComment: data.newComment,
        isImage: false
    }

    console.log(data)

    $.ajax({
        url: '/insertComment',
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            console.log(data)
            window.location.href = "./animal"

        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });

    event.preventDefault();
}