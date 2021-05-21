function searchAnimal() {
    event.preventDefault();
    event.stopImmediatePropagation();

    var myForm = document.getElementById('searchForm');
    var formData = new FormData(myForm);

    console.log(formData)
    $.ajax({
        url: '/search_animal',
        data: formData,
        dataType: 'json',
        type: 'POST',
        // processData: false,
        // contentType: false,
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
