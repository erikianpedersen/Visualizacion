let tweets = [];
let cb = new Codebird;
cb.setProxy("https://cb-proxy.herokuapp.com/");
let contenedor = $('#contenedor');
cb.setConsumerKey('7oCUSDI0phtJAcA8jBIIBnx2t', 'oNG70iGOeHgjLZMfRP6HZ7ippi46fBWJmjTg4CWLmFETpQ0dhX');
cb.setToken('923372796713033728-hKClTkkSdMBDE1NfKEKqkjl4sKQZpXS', 'IWVPg2M2JIHph0BWgvgdAYRBYPiNH5MroUBkDjo6JIvi9');

$("#nav-comentarios-tab").click(function(event) {
  event.preventDefault();
  let params = {
   q: "messi",
    count: 10
  };
  tweets.length = 0;
  searchTweets(params);
});

function searchTweets(params) {

  event.preventDefault();

  cb.__call(
    "search_tweets",
    params,
    function (reply) {
        for (var i = 0; i < reply.statuses.length; i++) {
          let tweet = reply.statuses[i];
          if(tweet.extended_entities && tweet.extended_entities.media[0].type == "photo") {
            let urlImg = tweet.extended_entities.media[0].media_url_https;
            if(!tweets.includes(urlImg)){
              if(tweet.extended_entities.media.length > 0){
                let json = {
                  src : reply.statuses[i].user.profile_image_url,
                 user : reply.statuses[i].user.name,
                 text : reply.statuses[i].text,
                };
                tweets.push(json);
              }
            }
          }
        }
        for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i]);
           $('.usuario').html(tweets[i].user);
           $('.tweet').html(tweets[i].text);
         }
       },
     );
   };
