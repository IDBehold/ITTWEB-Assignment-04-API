
function deleteWorkout(id) {
    var data = { "id" : id };
    $.ajax({
        type: "DELETE",
        url: "/",
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(data)
    });

    location.reload();
}

