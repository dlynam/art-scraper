exports.scrape = function(){ 
  require('node.io').scrape(function() {
      this.getHtml('http://www.artforum.com/picks/section=us', function(err, $) {
          var entries = [];
				  $('div.Item').each(function(item) {
						//var entry = {};
						var dateText = $('h3', item).text;
					  var entryDate = extractDate(dateText);
						console.log(entryDate);
						$('a', item).each(function(link) {
							extractNames(link.text);
						})
						$('p', item).each(function(p) {
							extractNames(p.text);
						});
          });
      });
  });
}
		
function extractDate(dateText){
	var months = "january|february|march|april|may|june|july|august|september|november|december";
  var re = new RegExp("(" + months + ")\\s*\\d*", "i"); 
	d = dateText.match(re)[0] + ", 2012";
	return d;
}

function extractNames(text){
  var names = [];
	names = text.match(/[A-Z][-'a-zA-Z]+\s{1}[A-Z][-'a-zA-Z]+/g)
  if(names != null){
		console.log(names[0]);
  }
}

  //  /[A-Z]+\s{1}[A-Z]+/  all caps check

  // return names;
	//console.log(names[0]);
	//for(i=0;i<names.length; i++){
  //  console.log(names[i]);
	//}




