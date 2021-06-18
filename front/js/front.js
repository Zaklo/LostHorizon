var $ = require('jquery');





$(document).ready(function () {

  document.querySelector(".map .close_button").onclick = event => {
    document.querySelector(".map").classList.add("animate__fadeOutDown");
  }
  
  document.querySelector(".map_button").onclick = event => {
    document.querySelector(".map").classList.remove("animate__fadeOutDown");
    document.querySelector(".map").classList.add("animate__fadeInUp");
  }

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
  