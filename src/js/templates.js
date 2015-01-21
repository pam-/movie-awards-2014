define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app-view.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h2 class="iapp-page-header"> 2014 Oscar nominated (and not-so-nominated) Movie Guide </h2>\n\n<p class="iapp-page-chatter">Oscar season is officially here, and if you’re like some of us wannabe movie buffs, you may have let a few of 2014’s most notable movies slip through the cracks. USA TODAY\'s 2014 Movie Guide to the rescue. Your new favorite flick may be out there and you didn’t even know it.</p>\n<div class="sort-wrapper">\n\t<div class="iapp-filters-wrap"></div> \n\t<div id="card-wrap"></div>\n</div>\n\n<p class="iapp-credits"><strong>Credits:</strong> Ryan Carey-Mahoney, Mitchell Thorson, Lori Grisham, USA TODAY</p>\n\n<div class="modal-overlay"></div>';

}
return __p
};

this["JST"]["card-back.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '  <div class="card card-detail">\n\n    <div class="close-card"></div>\n\n  <div class="iapp-vid-wrap">\n    <iframe width="100%" height="100%" src="' +
((__t = ( trailerlink )) == null ? '' : __t) +
'" frameborder="0" allowfullscreen></iframe>\n  </div>\n\n    <h2 class="card-back-header">' +
((__t = ( movietitle )) == null ? '' : __t) +
' </h2>\n    <p class="iapp-summary">' +
((__t = ( summary )) == null ? '' : __t) +
' \n    ';
 if (release) { ;
__p += ' \n      <span> Release date : ' +
((__t = ( release )) == null ? '' : __t) +
' </span>\n    ';
 }; ;
__p += ' \n    </p>\n\n    ';
 if (intheaters) { ;
__p += '\n    <p class="iapp-get-ticket"> <a href="http://www.fandango.com/search/?q=' +
((__t = ( movietitle.replace(/[\s]/g, '%20') )) == null ? '' : __t) +
'" class="read-more-link" target="_blank"> Get a ticket! </a></p>\n    ';
 }; ;
__p += '  \n    ';
 if (usatodayreview.length > 0) { ;
__p += '\n    \n    <a href="' +
((__t = ( usatodayreview )) == null ? '' : __t) +
'" class="read-more-link" target="_blank">Read USA TODAY\'s review</a>\n\n    ';
 } ;
__p += '\n    <div id="social">\n\n      ';
 
      var encodedURL = encodeURIComponent(window.location.href);
      var redirectUrl = "http://www.gannett-cdn.com/experiments/usatoday/_common/_dialogs/fb-share-done.html";
      var encodedURL2 = encodeURI(window.location.href + "/%23" + rowNumber);
      var encodedStr = encodeURIComponent("You should probably watch… " + movietitle + ", filtered just for you by our editors #2014movieguide");
      var encodedTitle = encodeURIComponent("2014 Oscar-nominated (and not-so-nominated) Movie Guide");
      var encodedQuestion = encodeURIComponent(movietitle);
      var fbRedirectUrl = encodeURIComponent("http://www.gannett-cdn.com/usatoday/_common/_dialogs/fb-share-done.html");

      var tweetUrl = "https://twitter.com/intent/tweet?url=" + encodedURL + "&text=" + encodedStr; 
      var fbUrl = "javascript: var sTop=window.screen.height/2-(218);var sLeft=window.screen.width/2-(313);window.open('https://www.facebook.com/dialog/feed?display=popup&app_id=215046668549694&link=" + encodedURL2 + "&picture=" + basepath + "fb-post.jpg&name=" + encodedTitle + "&description=" + encodedQuestion + "&redirect_uri=http://www.gannett-cdn.com/usatoday/_common/_dialogs/fb-share-done.html','sharer','toolbar=0,status=0,width=580,height=400,top='+sTop+',left='+sLeft);Analytics.click('Facebook share');void(0);";

      var fb2 = "javascript: var sTop=window.screen.height/2-(218);var sLeft=window.screen.width/2-(313);window.open('https://www.facebook.com/dialog/feed?display=popup&app_id=215046668549694&link=" + encodedURL2 + "&picture=" + basepath + "fb-post.jpg&name=" + encodedTitle +"&description=" + "Movie guide" + "&redirect_uri="+ window.location.href + "','sharer','toolbar=0,status=0,width=580,height=400,top='+sTop+',left='+sLeft);Analytics.click('Facebook share');void(0);";


      var emailURL = "mailto:?body=" + encodedQuestion +  "%0d%0d" + encodedURL +"&subject=" + encodedTitle;
      ;
__p += '\n    \n      <a class="twitter-share" href="' +
((__t = ( tweetUrl )) == null ? '' : __t) +
'" class=\'social-link\' id=\'twitter-share\'> <img src=\'http://www.gannett-cdn.com/experiments/usatoday/2014/10/ebola-questions/img/twitter.svg\' alt="twitter" class="social-icon"></a>\n      ';
// if (false) { ;
__p += '\n      <a class="facebook-share" href="';
 print("https://www.facebook.com/dialog/feed?display=popup&app_id=215046668549694&link=" + encodedURL2 + "&picture=" + basepath + "fb-post.jpg&name=" + encodedTitle +"&description=" + encodedQuestion + "&redirect_uri=" + fbRedirectUrl);
__p += '"><img src=\'http://www.gannett-cdn.com/experiments/usatoday/2014/10/ebola-questions/img/fb.svg\' alt="facebook" class="social-icon"></a>\n\n      ';
// };
__p += '\n      <a href="' +
((__t = ( emailURL )) == null ? '' : __t) +
'" target="sharer" class="social-link" id="email-share"><img src="http://www.gannett-cdn.com/experiments/usatoday/2014/10/ebola-questions/img/email.svg" alt="email" class="social-icon">\n        </a>\n    </div>\n  </div>';

}
return __p
};

this["JST"]["card-front.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '   <div class="category-bar">\n  \n   </div>\n   <div class="title-overlay">\n   \t<h2>' +
((__t = ( movietitle )) == null ? '' : __t) +
'\n   \t</h2> \n   </div>\n  <img class="cover-img" src="';
 print(basepath + photoname) ;
__p += '" alt="' +
((__t = ( movietitle)) == null ? '' : __t) +
'">\n';

}
return __p
};

this["JST"]["demo-credits.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="iapp-info-text">\n\t<div class="close-card"></div>\n\n\t<h2 class="iapp-page-header"> 2014 Oscar nominated (and not-so-nominated) Movie Guide </h2>\n\t<p class="iapp-page-chatter">Oscar season is officially here, and if you’re like some of us wannabe movie buffs, you may have let a few of 2014’s most notable movies slip through the cracks. USA TODAY\'s 2014 Movie Guide to the rescue. Your new favorite flick may be out there and you didn’t even know it.</p>\n\t<div class="iapp-demo">\n\t<p class="demo"><b>Filter</b> movies by selecting <b>one</b> <span class="js-span"> or <b>multiple</b> categories <span></p>\n\t\n\t<div class="iapp-filters-wrap"></div> \n\t<div class="iapp-filter-button get-started"> Get Started! </div>\n\t\t\n\n\t</div>\n\n\t<p class="time-stamp"></p>\n\n</div>\n<div class="overlay"></div>';

}
return __p
};

this["JST"]["tags.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 _.each(tags, function(tag) {
  var tagClass;
    tag == ":(" ? tagClass="sad" : tagClass = tag.toLowerCase().replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g,"").replace(/\s+/g, "-");
    
  ;
__p += '\n\n<div class="iapp-filter-button" data-filter="' +
((__t = ( tagClass )) == null ? '' : __t) +
'">' +
((__t = ( tag )) == null ? '' : __t) +
'</div>\n\n\n';
 }); ;
__p += '\n\n<div class="iapp-filter-button-clear">Clear Filters</div>';

}
return __p
};

  return this["JST"];

});