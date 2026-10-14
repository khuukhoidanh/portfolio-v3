$(document).ready(function(){
  console.log("Welcome to my portfolio ~~~");
  console.log("This website just for education purpose only so is there any bugs or problems while using this website pls forget it ~ Thanks for joining my website ~");
});

$('.nav_toggle').on('click', function () {
  $('.nav_right').toggleClass('open');
});
$('.nav_right a').on('click', function () {
  $('.nav_right').removeClass('open');
});

$('#send_btn').click(function (e) { 
  e.preventDefault();
  
  $(this).text("Sended !");
});

$('nav a[href^="#"]').click(function(e) {
    e.preventDefault();

    let id = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(id).offset().top
    }, 0);
});