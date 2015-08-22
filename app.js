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
  kittiez = kittiez.sort(function() { return [1, 0, -1][ Math.random() * 3 | 0] });
  return kittiez;
}

var startKittens = function(kittiez) {
  allTheKittiez = freshlyBathed(kittiez);
  console.log(allTheKittiez);
  loadKittyGif(allTheKittiez[0]);
}

var wherezMyKitteh = function(slug) {
  return "https://i.imgur.com/" + slug + ".mp4";
}

var loadKittyGif = function(slug) {
  if (!slug) { $('.video').hide(); return; }
  sourceUrl = wherezMyKitteh(slug);
  $('video > source').attr('src', sourceUrl);
  $('video').load();
  allTheKittiez.splice(0, 1);
}

var linkToARescue = function() {
  var rescue = rescues[Math.floor(Math.random()*(rescues.length))];
  $('#rescue').attr('href', rescue[1]).text(rescue[0]); 
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
