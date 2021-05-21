function searchAnimal() {
    event.preventDefault();
    event.stopImmediatePropagation();
    data = {}
    var myForm = document.getElementById('searchForm');
    var formData = new FormData(myForm);
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    data = {
        "town": data.location,
        "petType": data.animalType,
        "tags": data.tags1

    }

    console.log(data)
    $.ajax({
        url: '/search_animal',
        data: data,
        dataType: 'json',
        //contentType: 'application/json',
        type: 'POST',
        //processData: false,
        //contentType: false,
        success: function (data) {
            // close the current registration modal
            console.log("Redirected to search page.", data)

        },
        error: function (xhr, status, error) {
            console.log("err", error)
            console.log("xhr", xhr)
            console.log("status", status)
        }
    });

    return false;
    //window.location.href = "./search"

}

function getAnimalInfo() {
    //console.log(id)
    var animalId = document.getElementById("animalId").value
    $.ajax({
        url: '/animal',
        data: {"animalId": animalId},
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            // close the current registration modal
            console.log("Redirected to search page.", data)

        },
        error: function (xhr, status, error) {
            console.log("err", error)
            console.log("xhr", xhr)
            console.log("status", status)
        }
    });

    return false;

}

// Adding first line as the id isn't created yet
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('animalImageId').addEventListener('click', function () {
        $.ajax({
            type: 'POST',
            url: '/animal',
            data: {"animalId": document.getElementById('animalId').value},
            success: function (data) {
                console.log(data);
                $("html").html(data);
            }
        });
    }, false);
});