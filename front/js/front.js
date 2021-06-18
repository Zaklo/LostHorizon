var $ = require('jquery');


$(document).ready(function () {

  

  if ($(this).scrollTop() > 0 ) {
    $('.navigation-top').addClass('page-scrolled');
  } else {
    $('.navigation-top').removeClass('page-scrolled');
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0 ) {
      $('.navigation-top').addClass('page-scrolled');
    } else {
      $('.navigation-top').removeClass('page-scrolled');
    }
  });
});
  