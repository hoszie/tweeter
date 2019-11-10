$(document).ready(function() {

  const fixNewTweetCounterColor = function() {
    $(this).parent().find('span').text(140 - $(this).val().length);
    let $tweetLength = $(this).val().length;
    if ($tweetLength > 140) {
      $('span').addClass('negative');
    } else {
      $('span').removeClass('negative');
    }
  };

  $('textarea').on('keyup', fixNewTweetCounterColor);
  $('form').on('submit', fixNewTweetCounterColor);
});
