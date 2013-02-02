exports.scrape = function(){
  require('node.io').scrape(function() {
      this.getHtml('http://www.artforum.com/picks/section=us', function(err, $) {
          var names = [];
				  $('div.Item').each(function(item) {
						var dateText = $('h3', item).text;
						//console.log(dateText);	
					  extractDate(dateText);
						$('p').each(function(p) {
							//console.log(p.text);
						});
          });
          this.emit(names);
      });
  });
}

function extractDate(dateText){
	var months = "january|february|march|april|may|june|july|august|september|november|december";
  var re = new RegExp("(" + months + ")\\s*\\d*", "i"); 
	d = dateText.match(re);
  console.log(d[0]);
}
