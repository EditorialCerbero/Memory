function shuffle(array) {
  for(var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  
  return array;
}

const ALL_CLASSES = ["bg1", "bg1", "bg2", "bg2", "bg3", "bg3", "bg4", "bg4", "bg5", "bg5",
                     "bg6", "bg6", "bg7", "bg7", "bg8", "bg8", "bg9", "bg9", "bg0", "bg0"];

function newGame() {
  var classes = shuffle(ALL_CLASSES);
  var tiles = document.getElementsByClassName("tile");

  for (i = 0; i < tiles.length; i++) {
    tiles[i].classList.remove("hidden");
    tiles[i].className += (" " + classes[i] + " off");
  }

}

function has(element, className) {
  return element.classList.contains(className);
}

function solved(element) {
  return has(element, "solved");
}

function hidden(element) {
  return has(element, "off");
}

function previous() {
  return document.getElementsByClassName("clicked")[0];
}

function getBG(element) {
  var match = /bg\d/.exec(element.className);
  return match[0];
}

function change(id, delta) {
  var element = document.getElementById(id);
  var value = parseInt(element.textContent);
  element.textContent = value + delta;
}

function reveal(curr) {
  if (!solved(curr) && hidden(curr)) {
    curr.classList.remove("off");
    setTimeout(function () {
      var prev = previous();
      if (prev === undefined) {
        curr.classList.add("clicked");
      } else {
        var prevBG = getBG(prev);
        var currBG = getBG(curr);
        if (prevBG === currBG) {
          prev.classList.add("solved");
          curr.classList.add("solved");
          change("pairs", -1);
        } else {
          prev.classList.add("off");
          curr.classList.add("off");
        }
        curr.classList.remove("clicked");
        prev.classList.remove("clicked");
        change("moves", 1);
      }
    }, 500);
  }
}