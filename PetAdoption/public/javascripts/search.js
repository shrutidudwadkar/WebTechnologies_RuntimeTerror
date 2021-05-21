//
// function searchAnimal() {
//     event.preventDefault();
//     event.stopImmediatePropagation();
//     data = {}
//     var myForm = document.getElementById('searchForm');
//     var formData = new FormData(myForm);
//     for (let [key, value] of formData.entries()) {
//         data[key] = value;
//     }
//     data = {
//         "town": data.location,
//         "petType": data.animalType,
//         "tags": data.tags1
//
//     }
//
//     console.log(data)
//     $.ajax({
//         url: '/search_animal',
//         data: data,
//         dataType: 'json',
//         //contentType: 'application/json',
//         type: 'POST',
//         //processData: false,
//         //contentType: false,
//         success: function (data) {
//             // close the current registration modal
//             console.log("Redirected to search page.", data)
//
//         },
//         error: function (xhr, status, error) {
//             console.log("err", error)
//             console.log("xhr", xhr)
//             console.log("status", status)
//         }
//     });
//
//     return false;
//     //window.location.href = "./search"
//
//
// }
//
