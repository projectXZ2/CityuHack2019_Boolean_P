var KeyWord = function (pNum, word, startX, startY, endX, endY) {
  this.pNum = pNum;
  this.word = word;
  this.startX = startX;
  this.startY = startY;
  this.endX = endX;
  this.endY = endY;
};
var keyWordList = [];

var wordAnalyst = function (word, occursTimes) {
    this.word = word;
    this.occursTimes = occursTimes;
};
var wordAnalystArr = [];
var wordAnalystIndex = 0;

window.onload = function(){

  var xhttp = new XMLHttpRequest();

  var txt = "test.hocr";
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        findKeyWord(this);
        outputData(keyWordList);
        analystWordOccursTimes(keyWordList);
        displayWordOccursTimes(wordAnalystArr);
    }
  };
  xhttp.open("GET",txt,true);
  xhttp.send();

}

function findKeyWord(xml){
  var xmlDoc = xml.responseXML;
  var allWord = xmlDoc.getElementsByClassName("ocrx_word");

  //get ocr_page
  var ocr_page = xmlDoc.getElementsByClassName("ocr_page")[0].id;

  for(var i =0; i<allWord.length; i++){
    //get from the title
    var title = allWord[i].title;
    var titleWord = title.split(" ");

    //save the data to keyWordList
    //node.innerHTML = allWord[i].childNodes[0].nodeValue + " " + titleWord[1]+ " " + titleWord[2]+ " " + titleWord[3]+ " " + titleWord[4].split(";")[0];
    keyWordList[i] = new KeyWord(ocr_page, allWord[i].childNodes[0].nodeValue, titleWord[1], titleWord[2], titleWord[3], titleWord[4].split(";")[0]);
  }

}

function outputData(keyWordList){
  for(var i =0; i<keyWordList.length; i++){
      var node = document.createElement("P");
      node.innerHTML = keyWordList[i].pNum + " " + keyWordList[i].word + " " + keyWordList[i].startX + " " + keyWordList[i].startY + " " + keyWordList[i].endY + " " + keyWordList[i].endX;
      document.getElementById("dataContainer").appendChild(node);
  }
}

//word analyst
var wordList = [];

function getWordList(keyWordList){
  for(var i =0; i<keyWordList.length; i++){
      wordList[i] = keyWordList[i].word;
  }
};

function analystWordOccursTimes(keyWordList){
    getWordList(keyWordList);
    for(var i =0; i<keyWordList.length; i++){
        countInArray(wordList, keyWordList[i].word);
    }
}

function countInArray(array, what) {
    if (array.includes(what)){
        wordAnalystArr[wordAnalystIndex] = new wordAnalyst(what, array.filter(item => item == what).length);
        wordAnalystIndex++;
    }
}

function displayWordOccursTimes(wordAnalystArr){
    for(var i =0; i<wordAnalystArr.length; i++){
        var node = document.createElement("P");
        node.innerHTML = "Word: " + wordAnalystArr[i].word + "         Occurs Times: " + wordAnalystArr[i].occursTimes;
        document.getElementById("analystContainer").appendChild(node);
    }
}
