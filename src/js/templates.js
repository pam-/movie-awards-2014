define(function(){

this["JST"] = this["JST"] || {};

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
'</p>\n    \n    <a href="' +
((__t = ( usatodayreview )) == null ? '' : __t) +
'" class="read-more-link" target="_blank">Read USA TODAY\'s review</a>\n    <div id="social">\n\n      ';
 
      var encodedURL = encodeURIComponent(window.location.href);
      var redirectUrl = "http://www.gannett-cdn.com/experiments/usatoday/_common/_dialogs/fb-share-done.html";
      var encodedURL2 = encodeURI(window.location.href + "/%23" + rowNumber);
      var encodedStr = encodeURIComponent("Top Ebola virus questions answered: " + movietitle);
      var encodedTitle = encodeURIComponent("Top Ebola virus questions answered");
      var encodedQuestion = encodeURIComponent(movietitle);
      var fbRedirectUrl = encodeURIComponent("http://www.gannett-cdn.com/usatoday/_common/_dialogs/fb-share-done.html");

      var tweetUrl = "https://twitter.com/intent/tweet?url=" + encodedURL + "&text=" + encodedStr + "&via=USATODAY"; 
      var fbUrl = "javascript: var sTop=window.screen.height/2-(218);var sLeft=window.screen.width/2-(313);window.open('https://www.facebook.com/dialog/feed?display=popup&app_id=215046668549694&link=" + encodedURL2 + "&picture=" + basepath + "fb-post.jpg&name=" + encodedTitle + "&description=" + encodedQuestion + "&redirect_uri=http://www.gannett-cdn.com/usatoday/_common/_dialogs/fb-share-done.html','sharer','toolbar=0,status=0,width=580,height=400,top='+sTop+',left='+sLeft);Analytics.click('Facebook share');void(0);";

      var fb2 = "javascript: var sTop=window.screen.height/2-(218);var sLeft=window.screen.width/2-(313);window.open('https://www.facebook.com/dialog/feed?display=popup&app_id=215046668549694&link=" + encodedURL2 + "&picture=" + basepath + "fb-post.jpg&name=" + encodedTitle +"&description=" + "Movie guide" + "&redirect_uri="+ redirectUrl + "','sharer','toolbar=0,status=0,width=580,height=400,top='+sTop+',left='+sLeft);Analytics.click('Facebook share');void(0);";

      var emailURL = "mailto:?body=" + encodedQuestion +  "%0d%0d" + encodedURL +"&subject=" + encodedTitle;
      ;
__p += '\n    \n      <a class="twitter-share" href="' +
((__t = ( tweetUrl )) == null ? '' : __t) +
'" class=\'social-link\' id=\'twitter-share\'> <img src=\'http://www.gannett-cdn.com/experiments/usatoday/2014/10/ebola-questions/img/twitter.svg\' alt="twitter" class="social-icon"></a>\n      <a class="facebook-share" href="';
 print("https://www.facebook.com/dialog/feed?display=popup&app_id=215046668549694&link=" + encodedURL2 + "&picture=" + basepath + "fb-post.jpg&name=" + encodedTitle +"&description=" + encodedQuestion + "&redirect_uri=" + fbRedirectUrl);
__p += '"><img src=\'http://www.gannett-cdn.com/experiments/usatoday/2014/10/ebola-questions/img/fb.svg\' alt="twitter" class="social-icon"></a>\n      <a href="' +
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
__p += '   <div class="category-bar">\n  \n   </div>\n   <div class="title-overlay"><h2>' +
((__t = ( movietitle )) == null ? '' : __t) +
'</h2></div>\n  <img class="cover-img" src="';
 print(basepath + photoname) ;
__p += '" alt="' +
((__t = ( movietitle)) == null ? '' : __t) +
'">\n';

}
return __p
};

  return this["JST"];

});