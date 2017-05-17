function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
}

function onDeviceReady() {
	navigator.notification.beep(2);
	Info();
}

function parseLeagues(){
    var urlAPI = 'http://wizard.uek.krakow.pl/~s179683/Web/order2/www/data.php';
    var date = $('#fdate').val();
    var league = $('#fto').val();
	var link = 'https://apifootball.com/api/?action=get_events&from='+date+'&to='+date+'&league_id='+league;
        $.ajax({
	url: urlAPI,
        type: 'POST',
        data: {
            'link': link,
        },
		//zamiana odpowiedzi json na string
        success: function (result) {
			var returnedData = JSON.parse(result);
			var formatedData = JSON.parse(returnedData);
			var html = '';
			if(formatedData.error == 404){
			html='brak wydarzen w danym dniu';
			$('#result').html(html);
			}
			else{
			$.each(formatedData, function(key, value){
            html += '<div class='+value.match_id+'>';
            html += '<label>'+value.match_hometeam_name+'-'+value.match_awayteam_name+'</label>';
            html += '</div>';
        });
			}
			$('#result').html(html);
        }
    });
}