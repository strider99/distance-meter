var startPos;
var watchId;
Number.prototype.toRad = function () { return this * Math.PI / 180; }
document.getElementById("stopBtn").style.display = "none";

function startTracking(){
	if(navigator.geolocation){
		document.getElementById("startBtn").style.display = "none";
		document.getElementById("stopBtn").style.display = "inline";
		
		//getting position through geolocation
		
		navigator.geolocation.getCurrentPosition(showPosition, showError);
		watchId = navigator.geolocation.watchPosition(showPositionUpdate, showError);
	}
	else {
		alert("Geolocation is not supported in your browser");
	}
}

function showPosition(position){
	startPos = position;
	document.getElementById("startLat").innerHTML = "Lat - " + startPos.coords.latitude;
	document.getElementById("startLon").innerHTML = "Lon - " + startPos.coords.longitude;
	
}
	

function showPositionUpdate (position){
	
	document.getElementById("currentLat").innerHTML = "Lat - " + position.coords.latitude;
	document.getElementById("currentLon").innerHTML = "Lon - " + position.coords.longitude;
	
	document.getElementById("distance").innerHTML = calculateDistance(startPos.coords.latitude, startPos.coords.longitude, position.coords.latitude, position.coords.longitude);

}

function showError(error) {
	
	switch(error.code){
		case error.PERMISSION_DENIED :
			alert("User denied the request for geolocation");
			break;
			
		case error.POSITION_UNAVAILAIBLE:
			alert("Location unavailable");
			break;
		case error.TIMEOUT:
			alert("The request timeout");
			break;
		case error.UNKNOWN_ERROR:
			alert("Unknown error.Thats all we know :(")
			
	}
	
}

function calculateDistance(lat1, lon1, lat2, lon2) {
 var R = 6371; // km 
    //has a problem with the .toRad() method below.
    var dLat = (lat2-lat1).toRad();  
    var dLon = (lon2-lon1).toRad();  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 

	
	return d;
}

function stopTracking() {
	navigator.geolocation.clearWatch(watchId);
	document.getElementById("stopBtn").style.display = "none";
	document.getElementById("startBtn").style.display = "inline";
}