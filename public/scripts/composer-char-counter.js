$(document).ready(function() {

  const fixNewTweetCounterColor = function() {
    // JH sez: I feel like your selectors here ('span' and ('textarea') feel a bit too broad, though of course it's totally working okay for now
    $(this).parent().find('span').text(140 - $(this).val().length);
    let $tweetLength = $(this).val().length;
    if ($tweetLength > 140) {
      // JH says: reselecting $('span') here is not ideal
      $('span').addClass('negative');
    } else {
      // JH says: reselecting $('span') here is not ideal
      $('span').removeClass('negative');
    }
  };

  $('textarea').on('keyup', fixNewTweetCounterColor);
  $('form').on('submit', fixNewTweetCounterColor);
});
