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

// feedback
let rating = 0;

// Select rating
$('.stars button').click(function() {
    rating = Number($(this).attr('data-star'));

    $('.stars button').each(function() {
        let star = Number($(this).attr('data-star'));

        $(this).text(star <= rating ? '★' : '☆');
        $(this).toggleClass('active', star <= rating);
        $(this).attr('aria-pressed', star === rating);
    });

    $('#ratingText').text(rating + ' / 5');
});

// Send feedback
$('#sendFeedback').click(async function() {

    if (rating === 0) {
        $('#feedbackStatus').text('Please rate and write a comment.');
        return;
    }

    let button = $(this);
    let comment = $('#comment').val().trim() || '`Không có comment`';

    button.prop('disabled', true);
    button.text('Sending...');

    try {
        await fetch('https://script.google.com/macros/s/AKfycbyFhTkn6YGyTqZ3lXEY7jPcEdLmpVHsd9HPXVPY6B_pUWG7U5dSEjDZ7HWb4K07_M3zMw/exec', {
            method: 'POST',
            mode: 'no-cors',
            body: new URLSearchParams({
                rating: rating,
                comment: comment
            })
        });
    } catch (error) {
        $('#feedbackStatus').text('Unable to send feedback.');
    } finally {
        button.prop('disabled', true);
        button.html('Feedback Sended Successful');
        // $('#feedbackStatus').text('Feedback Sended Successful ~');
    }
});