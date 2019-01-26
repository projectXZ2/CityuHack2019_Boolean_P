var path = "https://api.myjson.com/bins/ij0xc";
var str = "";
getJSON(path);

function getJSON(path){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        // console.log(myObj);
        var strJSON = JSON.stringify(myObj);
        document.getElementById("json").innerHTML = strJSON;
        str = strJSON;
        jsonStr = myObj;
        // console.log(myObj);
      }
    };
    xmlhttp.open("GET", path, true);
    xmlhttp.send();
}

function search(){
    var type = document.getElementById("textInput").value;
    console.log("type: " + type);

    // var jsonStr = document.getElementById("json").innerHTML;
    var jsonStr = str;
    var jsonObj = JSON.parse(jsonStr);
    var pages = jsonObj.pages;

    for(i=0; i<pages.length; i++){
        if(pages[i].tags.length > 0){
            var page = pages[i];
            var tags = page.tags;
            for(j=0; j<tags.length; j++){
                var tag = tags[j];
                var entityType = tag.entityType;
                if(entityType == type){
                    console.log(pages[i].pageId);
                }
            }
        }
    }

}
