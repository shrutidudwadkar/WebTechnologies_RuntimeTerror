function addAnimalInfo() {
   event.preventDefault();
    event.stopImmediatePropagation();

    var myForm = document.getElementById('addAnimalForm');
    var formData = new FormData(myForm);

    console.log(formData)

    $.ajax({
        url:  '/addAnimal' ,
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

function applyForAdoption(data) {
    var animalid = data._id
    var email = document.getElementById("email")
    var isAdopted = true

    var myForm = document.getElementById('adoptionForm');
    var formData = new FormData(myForm);

    console.log(formData)

    $.ajax({
        url:  '/adopt' ,
        data: formData,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (dataR) {
            var ret = dataR;
            close_popup_modal('adoptionModal')
            popup_modal('successModal', "Thank you for adopting.")
        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });

    return false;

}



function onTextComment() {
    let formArray= $("form").serializeArray();
    let data={};
    for (let index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }

    data = {
        animalId: data.animalId,
        newComment: data.newComment,
        isImage: false
    }

    console.log(data)

    $.ajax({
        url:  '/insertComment' ,
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