$(document).ready(function() {

  ///// checks the value of the counter and changes class when less than 0
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
