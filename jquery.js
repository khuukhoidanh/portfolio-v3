$('.nav_toggle').on('click', function () {
  $('.nav_right').toggleClass('open');
});
$('.nav_right a').on('click', function () {
  $('.nav_right').removeClass('open');
});