let tweets = [];
let codebird = new Codebird;
codebird.setProxy("https://cb-proxy.herokuapp.com/");
codebird.setConsumerKey('7oCUSDI0phtJAcA8jBIIBnx2t', 'oNG70iGOeHgjLZMfRP6HZ7ippi46fBWJmjTg4CWLmFETpQ0dhX');
codebird.setToken('923372796713033728-hKClTkkSdMBDE1NfKEKqkjl4sKQZpXS', 'IWVPg2M2JIHph0BWgvgdAYRBYPiNH5MroUBkDjo6JIvi9');

window.onload = function(event){
  event.preventDefault();
  let parametros = {
   q: "#spaceship",
   count: 15
 };
  searchTweets(parametros);
};

function searchTweets(parametros) {

  event.preventDefault();

  codebird.__call(
    "search_tweets",
    parametros,
    function (reply) {
        for (var i = 0; i < reply.statuses.length; i++) {
          let tweet = reply.statuses[i];
          // console.log(tweet);
                let json = {
                  src : reply.statuses[i].user.profile_image_url,
                 user : reply.statuses[i].user.name,
                 text : reply.statuses[i].text,
                 likes : reply.statuses[i].favorite_count,
                 rt : reply.statuses[i].retweet_count,
                };
                tweets.push(json);
        }
        for (var i = 0; i < tweets.length; i++) {
          let div = '';
          if(i % 2 === 0){
            div = '<li class="list-group-item light reviews">' +
                    '<div>' +
                        '<div class="row">' +
                            "<img src='"+ tweets[i].src +"' alt='' height=50 width=50>" +
                          '<div class="player-name usuario">' +
                            '<h1 class="title">' +tweets[i].user+ '</h1>' +
                          '</div>' +
                        '</div>' +
                        '<div class="row">' +
                          '<div class="player-name tweet">' +
                            '<h1 class="title">' +tweets[i].text+ '</h1>' +
                          '</div>' +
                        '</div>' +
                      '<div class="row">' +
                        '<h1 class="title rt"> RT: ' +tweets[i].rt+ '</h1>' +
                        '<a class="title heart">&#x2665;</a>' +
                        '<h1 class="title fav"> ' +tweets[i].likes+ '</h1>' +
                      '</div>' +
                    '</div>' +
                  '</li>';
          }
          else{
            div = '<li class="list-group-item reviews">' +
                    '<div>' +
                        '<div class="row">' +
                            "<img src='"+ tweets[i].src +"' alt='' height=50 width=50>" +
                          '<div class="player-name usuario">' +
                            '<h1 class="title">' +tweets[i].user+ '</h1>' +
                          '</div>' +
                        '</div>' +
                        '<div class="row">' +
                          '<div class="player-name tweet">' +
                            '<h1 class="title">' +tweets[i].text+ '</h1>' +
                          '</div>' +
                        '</div>' +
                      '<div class="row">' +
                        '<h1 class="title rt"> RT: ' +tweets[i].rt+ '</h1>' +
                        '<a class="title heart">&#x2665;</a>' +
                        '<h1 class="title fav"> ' +tweets[i].likes+ '</h1>' +
                      '</div>' +
                    '</div>' +
                  '</li>';
          }
          document.getElementById("div-tweets").innerHTML += div;
         }
       },
     );
   };
