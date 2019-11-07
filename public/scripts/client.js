/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function(tweetObj) {
  const $tweet = `
  
    <article class="tweet">
      <div class="id-tweet">
        <img src='${tweetObj.user.avatars}'> 
        <span class="avatar">${tweetObj.user.name}</span>
        <span class="handle">${tweetObj.user.handle}</span>
      </div>
      <div id="content-tweet">
          <p class="tweet-words">${tweetObj.content.text}</p>
          <footer class="bottom">
            <span class="timestamp">${tweetObj.created_at}</span>
            <span class="likes"><i class="fa fa-flag-o"></i><i class="fa fa-retweet"></i><i class="fa fa-heart-o"></i></span>
          </footer>
      </div>
    </article>
  `;
  return $tweet;
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
