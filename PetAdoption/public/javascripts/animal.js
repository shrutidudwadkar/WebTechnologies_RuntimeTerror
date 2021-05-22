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
    popup_modal('successModal', "Thank you for adopting.")

}