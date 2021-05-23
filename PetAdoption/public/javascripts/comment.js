
function addImageComment() {
    event.preventDefault();
    var canvas = document.getElementById('canvas');
    var animalId = document.getElementById('animalId');
    var dataUrl = canvas.toDataURL();
    commentdata = {
        dataUrl: dataUrl,
        animalId: animalId,
        isImageComment: true
    }


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

}

function addTextComment() {
    event.preventDefault();
    var newComment = document.getElementById('newComment');
    var animalId = document.getElementById('animalId');
    commentdata = {
        newComment: newComment,
        animalId: animalId,
        isImageComment: false
    }

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

}


/*
document.addEventListener("DOMContentLoaded", function () {
    event.preventDefault();
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
    }, true);
});


document.addEventListener("DOMContentLoaded", function () {
    event.preventDefault();
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
    }, true);
});



 */