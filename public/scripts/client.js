/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function(tweetObj)
{
  const $img = $('<img>').attr('src', tweetObj.user.avatars);
  const $name = $('<span>').addClass('name').text(tweetObj.user.name);
  const $handle = $('<span>').addClass('handle').text(tweetObj.user.handle);
  const $header = $('<div>').addClass('id-tweet');
  
  $header.append($img, $name, $handle);
  
  const $p = $('<p>').addClass('tweet-words').text(tweetObj.content.text);
  const $timestamp = $('<span>').addClass('timestamp').text(tweetObj.created_at);
  const $icons = $('<span>').addClass('likes');
  const $footer = $('<footer>').addClass('bottom');
  const $contentTweet = $('<div>').addClass('content-tweet');
  const $iFlagO = $('<i>').addClass('fa fa-flag-o');
  const $iFaRetweet = $('<i>').addClass('fa fa-retweet');
  const $iFaHeart = $('<i>').addClass('fa fa-heart-o');


  $icons.append($iFlagO, $iFaRetweet, $iFaHeart);
  $footer.append($timestamp, $icons);
  $contentTweet.append($p, $footer);

  const $article = $('<article>').addClass('tweet');

  $article.append($header, $contentTweet);
  return $article;
}

const renderTweets = function (data) {
  for (let datum of data) {
    const $tweet = createTweetElement(datum);
    $('.tweets-container').append($tweet);
  }
}

$('#submit-tweet').submit((event) => {
  event.preventDefault();
  let $tweetLength = $('textarea').val().length;
  console.log($tweetLength);
  if ($tweetLength === 0) {
    return alert("NO GO! Say something productive you useless n00b");
  } else if ($tweetLength > 140) {
    return alert("NOOOOOOO! Too much BS from you brah");
  }

  $.ajax( {
    url: `/tweets`,
    data: $('#submit-tweet').serialize(),
    dataType: "json",
    method: 'POST',
    success: (data) => {
      console.log("success",data);
      const $data = createTweetElement(data);
      $('.tweets-container').prepend($data);
    },
    error: (err) => {
      console.log("errr",err);
    }
  });
})

const loadtweets = function() {
  $.ajax( {
    url: '/tweets',
    method: 'GET',
    success: (function(data) {
      console.log("Success", data);
      renderTweets(data);
      $('.tweets-container').prepend(data);
    })
  });
}
loadtweets();