export function loadJSON(fileName, callback, type) {   
	var xobj = new XMLHttpRequest();
      if (type === 'json') { xobj.overrideMimeType("application/json"); }
			xobj.open('GET', fileName, true);
			xobj.onreadystatechange = function (e) {
				if (xobj.readyState == 4 && xobj.status == "200") {
					// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
					callback(xobj.responseText);
					console.log(`loaded ${fileName} - ${timeStampToTime(e.timeStamp)}`);
				}
	};
	xobj.send(null);
}

export function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function timeStampToTime(unix_timestamp) {
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	var date = new Date(unix_timestamp*1000);
	// Hours part from the timestamp
	var hours = date.getHours();
	// Minutes part from the timestamp
	var minutes = "0" + date.getMinutes();
	// Seconds part from the timestamp
	var seconds = "0" + date.getSeconds();


	return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}