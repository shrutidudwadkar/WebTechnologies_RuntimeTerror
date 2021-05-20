function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            // no need to JSON parse the result, as we are using
            // dataType:json, so JQuery knows it and unpacks the
            // object for us before returning it
            let ret = dataR;
            // in order to have the object printed by alert
            // we need to JSON stringify the object
            document.getElementById('results').innerHTML= JSON.stringify(ret);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

function onSubmit1(url) {

    event.preventDefault();
    event.stopImmediatePropagation();
    var myForm = document.getElementById('registrationForm');
    var formData = new FormData(myForm);
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
    console.log(formData);
    sendAjaxQuery(url, formData);
    return false;
    /*
    let formArray= $("form").serializeArray();
    let data={};
    for (let index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    // const data = JSON.stringify($(this).serializeArray());
    sendAjaxQuery(url, data);
    event.preventDefault();

     */
}