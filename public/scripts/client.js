/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const moment = require('moment');
$('.new-tweet').hide();
$('#nav-button').click(function() {
  $('.new-tweet').slideToggle();
});

$('#submit-tweet textarea').focus(function() {
  $('#error').hide();
  $('.new-tweet h2').show();
  $('textarea').val('');
});

const createTweetElement = function(tweetObj) {
  const $img = $('<img>').attr('src', tweetObj.user.avatars);
  const $name = $('<span>').addClass('name').text(tweetObj.user.name);
  const $handle = $('<span>').addClass('handle').text(tweetObj.user.handle);
  const $p = $('<p>').addClass('tweet-words').text(tweetObj.content.text);
  const $timestamp = $('<span>').addClass('timestamp').text(moment(tweetObj.created_at).startOf('minute').fromNow());

  const $icons = $('<span>').addClass('likes');
  const $iFlagO = $('<i>').addClass('fa fa-flag-o');
  const $iFaRetweet = $('<i>').addClass('fa fa-retweet');
  const $iFaHeart = $('<i>').addClass('fa fa-heart-o');
  
  const $header = $('<div>').addClass('id-tweet');
  const $footer = $('<footer>').addClass('bottom');
  const $contentTweet = $('<div>').addClass('content-tweet');
  
  $header.append($img, $name, $handle);
  $contentTweet.append($p, $footer);
  $footer.append($timestamp, $icons);
  $icons.append($iFlagO, $iFaRetweet, $iFaHeart);

  const $article = $('<article>').addClass('tweet');
  $article.append($header, $contentTweet);
  return $article;
};

const renderTweets = function(data) {
  $('.tweets-container').empty();
  data.sort((a, b) => {
    if (a.created_at > b.created_at) return -1;
    if (a.created_at < b.created_at) return 1;
    return 0;
  });
  for (let datum of data) {
    const $tweet = createTweetElement(datum);
    $('.tweets-container').append($tweet);
  }
};

$('#submit-tweet').submit((event) => {
  event.preventDefault();
  let $tweetLength = $('textarea').val().length;
  console.log($tweetLength);
  if ($tweetLength === 0) {
    return $('#error').text("Computer says NO!").slideDown();
  } else if ($tweetLength > 140) {
    $('#error').text("Computer says NO!").slideDown();
    $('textarea').val('');
    return;
  }
  $.ajax({
    url: `/tweets`,
    method: 'POST',
    data: $('#submit-tweet').serialize(),
    dataType: "json",
    success: (data) => {
      console.log("success",data);
      $('textarea').val('');
      $('.counter').text('140');
      loadtweets();
    },
    error: (err) => {
      console.log("errr",err);
    }
  });
});

const loadtweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: (function(data) {
      console.log("Success", data);
      renderTweets(data);
    })
  });
};
loadtweets();