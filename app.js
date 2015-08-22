var allTheKittiez;
var keys = {
  right : 39,
  left : 37
}
var rescues = [
  ["Cats Exclusive (Margate, FL)", "http://www.catsexclusive.org/"],
  ["Wescott Animal Rescue (Columbia, SC)", "http://www.wescottacres.com/rescue.htm"],
  ["Pawmetto Lifeline (Columbia, SC)", "http://pawmettolifeline.org/"]
];

var bringOnTheKittiez = function() {
  $.getJSON("https://openkittens.firebaseio.com/kittens.json", startKittens);
}

var freshlyBathed = function(kittiez) {
  kittiez.forEach(function(slug, idx) {
    if (slug == null) { kittiez.splice(idx, 1); }
  });
  return kittiez;
}

var shakeTheBasket = function(kittiez) {
  sortedKittiez = kittiez.sort(function() { return [1, 0, -1][ Math.random() * 3 | 0] });
  return sortedKittiez;
}

var startKittens = function(kittiez) {
  cleanKitties = freshlyBathed(kittiez);
  allTheKittiez = shakeTheBasket(cleanKitties);
  console.log(allTheKittiez);
  loadKittyGif(allTheKittiez[0]);
}

var wherezMyKitteh = function(slug) {
  return "https://i.imgur.com/" + slug + ".mp4";
}

var kittehGif = function(slug) {
  return "https://i.imgur.com/" + slug + ".gif";
}

var kittehTweetUrl = function(slug) {
  return "http://twitter.com/home?status=I%20found%20this%20cute%20kitten%20with%20openkittens.com!%20" + kittehGif(slug);
}

var loadKittyGif = function(slug) {
  if (!slug) { 
    $('.video').hide();
    $('.backer').show();
    return;
  }
  sourceUrl = wherezMyKitteh(slug);
  setDirectLink(kittehGif(slug));
  setTwitterLink(kittehTweetUrl(slug));
  $('video > source').attr('src', sourceUrl);
  $('video').load();
  allTheKittiez.splice(0, 1);
}

var linkToARescue = function() {
  var rescue = rescues[Math.floor(Math.random()*(rescues.length))];
  $('#rescue').attr('href', rescue[1]).text(rescue[0]); 
}

var setDirectLink = function(url) {
  $('#direct').attr('href', url);
}

var setTwitterLink = function(url) {
  $('#tweet').attr('href', url);
}

$(document).ready(function() {
  bringOnTheKittiez();
  linkToARescue();
});

$(document).on('keyup', function(e) {
  if (e.which == keys.right) {
    loadKittyGif(allTheKittiez[0]);
    linkToARescue();
  }
});
