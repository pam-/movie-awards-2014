define(["jquery", "underscore"], function(jQuery, _) {

  var staticInfo = JSON.parse($('.staticinfo').html());
  var isMobile = staticInfo.platform === 'mobile';

  return _.extend(staticInfo, { isMobile: isMobile});
});