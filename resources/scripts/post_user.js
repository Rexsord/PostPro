function cargarPerfil(userId) {
	//Buscar los post mediante jquery ajax
	var root = 'https://jsonplaceholder.typicode.com';

	$.ajax({
		url: root + '/users/'+ userId,
		method: 'GET'
	}).then(function (data) {
        var perfil = "<div class='row'>"
        + "<div class='col-md-12'>"
        + "<h2>" + data.name + "</h2>"
        + "</div>"
        + "</div>"

        + "<div class='row'>"
        + "<div class='col-md-12'>"
        + "<p>" + "Correo:" + data.email + "   Tel:"+ data.phone + "</p>"
        + "</div>"
        + "</div>"

        +"<div class='row'>"
        + "<div class='col-md-12'>"
        + "<h3>Direccion</h3>"
        + "</div>"
        + "</div>"

        + "<div class='row'>"
        + "<div class='col-md-12'>"
        + "<p>" + data.address.street+ ","+ data.address.suite + "," + data.address.street + "</p>"
        + "</div>"
        + "</div>"

        +"<div class='row'>"
        + "<div class='col-md-12'>"
        + "<h3>Trabajo</h3>"
        + "</div>"
        + "</div>"

        + "<div class='row'>"
        + "<div class='col-md-12'>"
        + "<p>" + data.company.name+ ", '" + data.company.catchPhrase + "' </p>"
        + "</div>"
        + "</div>"

        + "<div class='row'>"
        + "<div class='col-md-12'>"
        + "<p>" + data.website+ "</p>"
        + "</div>"
        + "</div>"

    $('#perfil').append(perfil);
       
		});

};

function estadisticas(userId){

    var comentarios = 0;
    var posts = 0;

    var root = 'https://jsonplaceholder.typicode.com';
    
        $.ajax({
            url: root + '/posts?userId='+ userId,
            method: 'GET'
        }).then(function (data) {

            $.each(data, function (i, p) {
                posts++;

            });
            var statPost = "<div class='row'>"
            + "<div class='col-md-12'>"
            + "<h4>" + "Cantidad de Posts:" + posts + "</h4>"
            + "</div>"
            + "</div>"

            $('#stat').append(statPost);
        });
/*
        var root = 'https://jsonplaceholder.typicode.com';
        
            $.ajax({
                url: root + '/comments?userId='+ userId,
                method: 'GET'
            }).then(function (data) {
    
                $.each(data, function (i, p) {
                    comentarios++;
    
                });
                var statComment = "<div class='row'>"
                + "<div class='col-md-12'>"
                + "<h4>" + "Cantidad de Comentarios:" + comentarios + "</h4>"
                + "</div>"
                + "</div>"
    
                $('#stat').append(statComment);
            });*/

};





$(document).ready(function () {

    var dbPostUsuario = localStorage.getItem('postUsuario');
    cargarPerfil(dbPostUsuario);
    estadisticas(dbPostUsuario);
});