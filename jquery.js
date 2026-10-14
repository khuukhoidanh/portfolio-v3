$(document).ready(function(){
  console.log(window.location.href);

  

  if (window.location.href !== "https://khuukhoidanh.is-a.dev/") {
    return;
  }


  let agent = navigator.userAgent;

  let device = /Mobi|Android|iPhone/i.test(agent)
      ? "Mobile" : "Desktop";

  let browser = "Other";
  if (agent.includes("Edg/")) browser = "Edge";
  else if (agent.includes("Chrome/")) browser = "Chrome";
  else if (agent.includes("Firefox/")) browser = "Firefox";
  else if (agent.includes("Safari/")) browser = "Safari";

  let os = "Other";
  if (agent.includes("Windows")) os = "Windows";
  else if (agent.includes("Android")) os = "Android";
  else if (/iPhone|iPad/i.test(agent)) os = "iOS / iPadOS";
  else if (agent.includes("Mac")) os = "macOS";
  else if (agent.includes("Linux")) os = "Linux";

  fetch('https://script.google.com/macros/s/AKfycbyRFi7Qlrgv6b47ZdW3DuI_w3t82WbfbezVRwFRu-BsD4N5n3C5N7uv5wUb6tgq6h4F3g/exec', {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams({
          type: 'visitor',
          device: device,
          browser: browser,
          os: os,
          page: window.location.pathname
      })
  }).catch(function(error) {
      console.error('Visitor log error:', error);
  });
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