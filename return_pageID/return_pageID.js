alert("Hello");

var json = $.getJSON("6_tagged.json");
var data = eval("(" +json.responseText + ")");
document.write(data["a"]);