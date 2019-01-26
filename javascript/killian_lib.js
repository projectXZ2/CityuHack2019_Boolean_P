function generateTxt(content){
	var a = document.getElementById("a");
	var file = new Blob([content], {type: 'text/plain'});
	a.href = URL.createObjectURL(file);
	a.download = 'output.txt';
}