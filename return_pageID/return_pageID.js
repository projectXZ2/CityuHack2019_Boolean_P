var path = "https://raw.githubusercontent.com/projectXZ2/CityuHack2019_Boolean_P/master/Training/6/6_tagged.json";
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
    var pageIDarr = [];

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
                    var duplicate = false;
                    for(k=0; k<pageIDarr.length; k++){
                        if(pageIDarr[k] == pages[i].pageId && pageIDarr.length>0){
                            duplicate = true;
                        }
                    }
                    if(duplicate == false){
                        pageIDarr.push(pages[i].pageId);
                    }
                    console.log("array: " + pageIDarr);
                }
            }
        }
    }
    return pageIDarr;
}
