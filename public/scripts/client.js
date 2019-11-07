/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetObj) {
  const $tweet = `
  
    <article class="tweet">
      <div class="id-tweet">
        <span id="avatar">${tweetObj.user.avatars} ${tweetObj.user.name}</span>
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

const dummyTweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function () {
  for (let user of dummyTweets) {
    const $tweet = createTweetElement(user);
    $('.tweets-container').append($tweet);
  }
}
renderTweets();

$('#submit-tweet').submit((event) => {
  event.preventDefault();
  console.log("before ajax call")
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








// Test / driver code (temporary). Eventually will get this from the server.
// const firstTweet = dummyTweets[0];

// const $tweet = createTweetElement(firstTweet);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('.tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// // $(".tweets-container").append(crap)
// const secondTweet = dummyTweets[1];
// const $tweet2 = createTweetElement(secondTweet);
// $('.tweets-container').append($tweet2);
