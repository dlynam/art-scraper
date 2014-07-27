exports.scrape = function(){
  require('node.io').scrape(function() {
    this.getHtml('http://www.artforum.com/picks/section=us', function(err, $) {
      saveItems();
    });
  });
}

function saveItems(){
  $('div.Item').each(function(item) {
    var dateText = $('h3', item).text;
    var entryDate = extractDate(dateText);
    extractNames('a', item);
    extractNames('p', item);
  });
}

function extractNames(el, item){
  $(el, item).each(function(link) {
    var names = extractNames(link.text);
    mongoSave(names);
  });
}

function extractDate(dateText){
	d = dateText.match(dateRegex())[0] + ", 2012";
  console.log(d);
	return d;
}

function mongoSave(names){
  var commonRegex = commonWordsRegex();
	for(i=0;i<names.length; i++){
    var name = names[i];
    if(capsCheck(name) == null){
      var testCommon = name.match(commonRegex);
      if(testCommon == null){
        console.log(name)
      }
    }
	}
}

function extractNames(text){
  var names = [];
	names = text.match(/[A-Z][-'a-zA-Z]+\s{1}[A-Z][-'a-zA-Z]+/g)
  if(names != null){
    return names;
  } else {
    return [];
  }
}

function capsCheck(name){
  var check = name.match(/^[A-Z]+\s{1}[A-Z]+/)
  return check;
}

function commonWordsRegex(){
  var fs = require('fs');
  commonWords = fs.readFileSync('common_words.txt').toString().split("\n");
  removeBlankNewlines(commonWords);
  var commonString = commonWords.join("|")
  var re = new RegExp(commonWords.join("|"), "i");
  return re;
}

function dateRegex(){
	var months = "january|february|march|april|may|june|july|august|september|november|december";
  var re = new RegExp("(" + months + ")\\s*\\d*", "i");
  return re;
}

//removes blank lines at end of common_words.txt
function removeBlankNewlines(commonWords){
  var i = commonWords.length-1;
  while(i > 0){
    if(commonWords[i].match(/[a-z]/i) == null){
      commonWords.splice(i,1);
      i--;
    } else {
      break;
    }
  }
