$(document).ready(function() {
  $('textarea').on('keyup', function() {
    $(this).parent().find('span').text(140 - $(this).val().length);
    let $tweetLength = $(this).val().length;
    if ($tweetLength > 140) {
      $('span').addClass('negative');
    } else {
    $('span').removeClass('negative');
    }
  });
})







  // $('#handle').hide();
  // $('.posted-tweet').mouseenter(function() {
  //   $('#handle').show();
  // }).mouseleave(function() {
  //   $('#handle').hide();
  // });