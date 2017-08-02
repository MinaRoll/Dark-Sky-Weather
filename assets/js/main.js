$(document).ready(function() {

	// Geolocalización
	function buscar(){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);// Accede a la posición actual del dispositivo
	  	}
	}

	// Se ejecuta cuando el usuario comparte su ubicación
	var funcionExito = function(posicion){
			var latitud = posicion.coords.latitude;// obtengo latitud
			var longitud = posicion.coords.longitude;// obtengo longitud
			//console.log(lat,long);
	}

	// Se ejecuta cuando se produce un error en la geolocalización
	var funcionError = function(error){
		alert("No podemos encontrar tu ubicación");// Si no encuentra ubicación del dispositivo envia un alert con el mensaje
	}
  	buscar();


	$.ajax({
		url: 'https://api.darksky.net/forecast/d94f42688dfd91ccea0c3550fe824818/37.8267,122.4233', //Busca datos en esta url
		type: 'GET', // Obtiene datos
		dataType: 'json',
	})
	.done(function(info) {
		var temperatura = (((info.currently.apparentTemperature-32) * 5/9).toFixed(1));
		$(".temperature").append(temperatura+"º");
		var humedad = info.currently.humidity;
		$(".humidity").append(humedad+" %");
		var viento = info.currently.windSpeed;
		$(".wind").append(viento+" m/s");
		var presion = info.currently.pressure;
		$(".pressure").append(presion+" hPa");
		var uv = info.currently.uvIndex;
		$(".uv").append(uv);
		var icono = info.currently.icon;
		$(".icon").append("<img class='img-responsive' src='dist/img/"+icono +".png'>");
			
		//Temperatura de la semana
		info.daily.info.forEach(function(week){
			var maxima = ((((week.apparentTemperatureMax-32) * 5/9).toFixed(1)));
			var minima = ((((week.apparentTemperatureMin-32) * 5/9).toFixed(1)));
			var icon = week.icon;
			console.log(icon);
			$(".dias").append("<div class='row linea-dias'><div class='col-md-6 col-xs-6 text-left'><img class='iconos-semana img-responsive ' src='dist/img/"+icon+".png'><p class='txt-datos-dias'>Monday</p></div><div class='col-md-6 col-xs-6 text-right'><p class='temperatura'>"+maxima+"º"+" - "+minima+"º"+"</p></div></div>");

		});
	}) /* no me funciona nada, lo borré y volví a escribir mil veces y nada */


// API Flickr
/*$(function () {
	$.ajax({
	    url: "https://api.flickr.com/services/rest/",
	    data: {
	        method: "flickr.photos.search",
	        api_key: "540f5a00b565e61ee7cefd18c99cfa5a",
	        tags: "weather",
	        format: "json",
	        nojsoncallback: 1
	    },

	    success: function (response) {
	    console.log(response)
	        $.each(response.photos.photo, function (index, value) {
	          var url = 'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '.jpg';
	          var img = $('<img>').attr({src: url});
	          $("body").append(img);
	        });
	    }
	});
})*/

});