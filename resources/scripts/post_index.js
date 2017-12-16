
function buscarUsuarios(){
	
		var root = 'https://jsonplaceholder.typicode.com';
		var info = [];
			$.ajax({
				url: root + '/users',
				method: 'GET'
			}).then(function (data) {
				
				localStorage.setItem('Usuarios', JSON.stringify(data));
				})
			
	};


function cargarPost() {
	//Buscar los post mediante jquery ajax
	var root = 'https://jsonplaceholder.typicode.com';

	$.ajax({
		url: root + '/posts',
		method: 'GET'
	}).then(function (data) {
		//console.log(data);
		var localStorage = window.localStorage;
		var postFavoritos = {};
		var dbPostFavoritos = localStorage.getItem('postFavoritos');
		var dbUsuarios = localStorage.getItem('Usuarios');
		var usuarioId = {};
		usuarioId = JSON.parse(dbUsuarios);
		if (dbPostFavoritos != null) {
			postFavoritos = JSON.parse(dbPostFavoritos);
	
		}

		$.each(data, function (i, p) {

			var existe = p.id in postFavoritos;
			var usuarioInter = usuarioId[p.userId-1];
			var post = "<div class='thumbnail container-fluid'>"
				+ "<img class='text-center img-circle pequeña' src='resources/Img/usuario_2.png' alt='Bird'>"
				+ "<div class='col-md-12'>"
				+ "<h3 class='post_id text-center' data-postid='" + p.id + "'>"+ "<a class='post-titulo' href='file:///C:/Users/darvi/Documents/Proyecto%20Javascript/PostPro/postComentarios.html' target='_blank'>" + p.title + "</a>"+ "</h3>"
				+ "</div>"
				
				+ "<div class='row'>"
				+ "<div class='col-md-10'>"
				+ "<a class='publicador post_user' href='file:///C:/Users/darvi/Documents/Proyecto%20Javascript/PostPro/perfilUsuario.html' target='_blank' data-postid='" + p.userId + "'>"
				+ "<span class='glyphicon glyphicon-user'>"
				+ " " + usuarioInter.name
				+ "</span>"
				+" "
				+"<span class='glyphicon glyphicon-envelope'>"
				+ " " + usuarioInter.email
				+ "</span>"
				+ "</a>"
				+ "</div>"
				+ "<div class='col-md-1'></div>"
				+ "<div class='col-md-1'>"
				+ "<button class='btn bg-1 glyphicon "+(existe ? 'glyphicon-star' : 'glyphicon-star-empty')+" post_boton' data-postid='" + p.id + "'></button>"
				+ "</div>"
				+ "</div>"
				+ "<div class='row text-center'>"
				+ "<div class='col-md-12 post-body'>"
				+ "<p>" + p.body + "</p>"
				+ "</div>"
				+ "</div>"
				+ "<div class='col-md-4'></div>"
				+ "<div class='col-md-1'></div>"
				+ "<div class='col-md-3'>"
				+ "<a href='file:///C:/Users/darvi/Documents/Proyecto%20Javascript/PostPro/postComentarios.html' target='_blank'' class='btn boton-comentario btn-lg post_id' data-postid='" + p.id + "'> Ver Comentarios... </a>"
				+ "</div>"
				+ "<div class='col-md-4'></div>"
				+ "</div>"
				+ "</div>"
			$('#post').append(post);
		});

		$('.post_id').click(function(){
			var postId =  $(this).data('postid');
			localStorage.setItem('postId', JSON.stringify(postId));
		})

		$('.post_user').click(function(){
			var userId =  $(this).data('postid');
			localStorage.setItem('postUsuario', JSON.stringify(userId));
		})

		$('.post_boton').click(function () {
			var postId =  $(this).data('postid');
			var existe = editarPostFavorito(postId);
			/*
			if(existe){
				$(this).removeClass('glyphicon-star-empty');
				$(this).addClass('glyphicon-star');
			}
			else{
				$(this).removeClass('glyphicon-star');
				$(this).addClass('glyphicon-star-empty');
			}
			
			O mejor como esta abajo que hace uso del operador ternario*/

			//existe ? '' : ''

			$(this).removeClass(existe ? 'glyphicon-star-empty' : 'glyphicon-star');
			$(this).addClass(existe ? 'glyphicon-star' : 'glyphicon-star-empty');

			
		})
	});

};




function editarPostFavorito(postId) {
	var localStorage = window.localStorage;
	var postFavoritos = {};
	var dbPostFavoritos = localStorage.getItem('postFavoritos');
	if (dbPostFavoritos != null) {
		postFavoritos = JSON.parse(dbPostFavoritos);

	}
	var existe = false;
	//array asociativo	
	if (postId in postFavoritos) {
		delete postFavoritos[postId];
	}
	else {
		existe = true;
		postFavoritos[postId] = true;
	}

	localStorage.setItem('postFavoritos', JSON.stringify(postFavoritos));
	return existe;
}


$(document).ready(function () {
	cargarPost();
});