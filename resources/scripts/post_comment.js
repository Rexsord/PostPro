function cargarPerfil(postId) {
	//Buscar los post mediante jquery ajax
	var root = 'https://jsonplaceholder.typicode.com';

	$.ajax({
		url: root + '/posts/'+ postId,
		method: 'GET'
	}).then(function (data) {
        var comm = "<div class='row'>"
        + "<div class='col-md-12'>"
        + "<h2>" + data.title + "</h2>"
        + "</div>"
        + "</div>"

        + "<div class='row'>"
        + "<div class='col-md-12'>"
        + "<p>" + data.body + "</p>"
        + "</div>"
        + "</div>"


    $('#post').append(comm);
       
		});

};

function comentarios(postId){

    var root = 'https://jsonplaceholder.typicode.com';
    //alert(postId);
        $.ajax({
            url: root + '/posts/'+ postId + '/comments',
            method: 'GET'
        }).then(function (data) {

            $.each(data, function (i, p) {
                var comm = "<div class='row'>"
                + "<div class='col-md-12'>"
                + "<h4>" + p.name + "</h4>"
                + "</div>"
                + "</div>"
        
                + "<div class='row'>"
                + "<div class='col-md-12'>"
                + "<p>" + p.body + "</p>"
                + "</div>"
                + "</div>"

                + "<div class='row'>"
                + "<div class='col-md-12'>"
                + "<p>" + p.email + "</p>"
                + "</div>"
                + "</div>"

                $('#comments').append(comm);

            });

        });

};





$(document).ready(function () {

    var dbPostId = localStorage.getItem('postId');
    cargarPerfil(dbPostId);
    comentarios(dbPostId);
});