
function deleteUser() {
    var del = $('.delete').val();
    $.ajax({
        url: 'https://localhost:5001/api/phonebooks/' + del,
        type: 'DELETE',
        success: function (result) {
            location.reload();
        }
    });
}

