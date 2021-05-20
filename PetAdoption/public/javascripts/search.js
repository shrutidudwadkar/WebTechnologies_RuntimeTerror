function searchAnimal() {
    let formArray = $("form").serializeArray();
    let data = {};
    for (let index in formArray) {
        data[formArray[index].name] = formArray[index].value;
    }


    data = {
        town: data.location,
        petType: data.animalType,
        tags:data.tags1

    }
    console.log(data);

    $.ajax({
        url: '/search',
        data: data,
        dataType: 'json',
        type: 'GET',
        success: function (dataR) {
            // close the current registration modal
            console.log("Redirected to search page.")

        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });

    event.preventDefault();
}
