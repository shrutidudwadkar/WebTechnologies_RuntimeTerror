/*
function addImageComment() {

    var canvas = document.getElementById('canvas');
    var animalId = document.getElementById('animalId1');
    var dataUrl = canvas.toDataURL();
    commentdata = {
        dataUrl: dataUrl,
        animalId: animalId,
        isImageComment: true
    }
    //var target = new Image();
    //target.src = dataUrl;

    //document.getElementById('result').appendChild(target);
    console.log(commentdata)

    $.ajax({
        url:  '/insertComment' ,
        data: commentdata,
        dataType: 'JSON',
        type: 'POST',
        success: function (dataR) {
            console.log("done")
        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });

    event.preventDefault();


}
*/
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('image-comment').addEventListener('click', function () {
        var canvas = document.getElementById('canvas');
        var animalId = document.getElementById('animalId').value;
        var dataUrl = canvas.toDataURL();

        $.ajax({
            type: 'POST',
            url: '/insertComment',
            data: {animalId: animalId,
                dataUrl: dataUrl,
                isImageComment: true
            },
            success: function (data) {
                console.log(data);

            }
        });
    }, false);
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('comment').addEventListener('click', function () {
        var animalId = document.getElementById('animalId').value;
        var newComment = document.getElementById('newComment').value;
        $.ajax({
            type: 'POST',
            url: '/insertComment',
            data: {animalId: animalId,
                isImageComment: false,
                newComment: newComment

            },
            success: function (data) {
                console.log(data);

            }
        });
    }, false);
});