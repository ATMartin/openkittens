$(document).ready(function() {
  bringOnTheKittiez();
});

var allTheKittiez;
var keys = {
  'change' : '39'
}

var bringOnTheKittiez = function() {
  $.getJSON("https://openkittens.firebaseio.com/kittens.json", startKittens);
}

var freshlyBathed = function(kittiez) {
  kittiez.forEach(function(slug, idx) {
    if (slug == null) { kittiez.splice(idx, 1); }
  });
  return kittiez;
};

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
};

$(document).on('keyup', function(e) {
  if (e.keyCode == keys['change']) {
    loadKittyGif(allTheKittiez[0]);
  }
});

