window.onload = initFuncs;

function initFuncs() {
  var ps = document.getElementsByTagName('p');
  var ins = document.getElementsByTagName('input');
  var buts = document.getElementsByTagName('button');
  var spans = document.getElementsByTagName('span');
  var signsArr = [ "+", "-", "/", "x"];
  var result;
  var falseCount = 0;
  var topResult;
  var bottomResult;
  var integerResult;

  buts[0].onclick = function () { validateInput(0, 1, 1); };
  buts[1].onclick = function () { validateInput(1, 3, 6); };
  buts[2].onclick = function () { validateInput(3, 6, 12); };

  ins[0].addEventListener("keypress", function () {
      if (event.keyCode === 13) { validateInput(0, 1, 1); } });
  getRandoms();
  getFraction();

  function validateInput(start, finish, alert) {
    var invalid = 0;
    for (var i = start; i < finish; i++) {
      if (ins[i].value == "" || ins[i].value == " ") {
        ps[alert].innerHTML = "enter a value";
        invalid = 1;
        if (ins[3] != "" && ins[3] != " " && topResult == 0 &&
            bottomResult == 0) {
              invalid = 0;
            }
      } else if (isNaN(ins[i].value)) {
        ps[alert].innerHTML = "enter a number";
        invalid = 1;
      }
    }
    if (invalid != 1) {
      switch(alert) {
        case 1:
          compareValues(ins[start].value);
          break
        case 6:
          validateReducer(ins[start].value, ins[start+1].value);
          break;
        case 12:
          validateMixed(ins[start].value, ins[start+1].value, ins[start+2].value);
          break;
        default:
          ps[12].innerHTML = "momsbooboobathroomcookies";
      }
    }
  }

  function getRandoms() {
    var left = Math.ceil(Math.random()*10);
    var right = Math.ceil(Math.random()*11);
    var signIndex = Math.floor(Math.random()*4);
    switch(signIndex) {
      case 0:
        addThem(left, right, signIndex);
        break;
      case 1:
        subtractThem(left, right, signIndex);
        break;
      case 2:
        divideThem(left, right, signIndex);
        break;
      case 3:
        multiplyThem(left, right, signIndex);
        break;
      default:
        ps[0].innerHTML = "momsbooboobathroomcookies";
    }
    displayExpression(left, right, signIndex);
  }

  function addThem(l, r, n) {
    result = l + r;
  }

  function subtractThem(l, r, n) {
    result = l - r;
  }

  function multiplyThem(l, r, n) {
    result = l * r;
  }

  function divideThem(l, r, n) {
    result = Math.round(l/r);
  }

  function displayExpression(l, r, n) {
    var left = l.toString();
    var right = r.toString();
    ps[0].innerHTML = left + " " + signsArr[n] + " " + right;
  }

  function compareValues(valIn) {
    ps[1].innerHTML = "true";
    if (valIn != result) {
      ps[1].innerHTML = "false";
      spans[0].innerHTML = result;
      falseCount += 1;
      spans[0].innerHTML = result;
    }
  }
  function getFraction() {
    var factor = Math.ceil(Math.random()*10);
    var top = Math.ceil(Math.random()*10) * factor;
    var bot = Math.ceil(Math.random()*10) * factor;
    if (top == bot) { getFraction() };
    if (top <= bot) {
      fracReducer(top,bot);
      ps[2].innerHTML = top;
      ps[4].innerHTML = bot;
    } else {
      mixedNumber(top,bot);
      ps[7].innerHTML = top;
      ps[9].innerHTML = bot;
    }
  }

  function fracReducer(top, bot) {
    var intArr = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
    for (i = 0; i < intArr.length; i++) {
      if (top % intArr[i] == 0 && bot % intArr[i] == 0) {
        top = top/intArr[i];
        bot = bot/intArr[i];
      }
    }
    topResult = top;
    bottomResult = bot;
  }

  function validateReducer(numerIn, denomIn) {
    if (numerIn == topResult && denomIn == bottomResult) {
      ps[6].innerHTML = "true";
      for (var i = 1; i < 4; i++) {
        spans[i].innerHTML = "&nbsp;";
      }
    } else {
      ps[6].innerHTML = "false";
      falseCount++;
      spans[1].innerHTML = topResult;
      spans[2].innerHTML = "&mdash;";
      spans[3].innerHTML = bottomResult;
    }
  }

  function mixedNumber(top, bot) {
    integerResult = Math.floor(top/bot);
    if (top%bot == 0) {
      topResult = "";
      bottomResult = "";
    } else {
      topResult = top%bot;
      bottomResult = bot;
      fracReducer(topResult, bottomResult);
    }
  }

  function validateMixed(int, numer, denom) {
   if (int == integerResult && numer == topResult && denom == bottomResult) {
     ps[12].innerHTML = "true";
     for (var i = 4; i < 8; i++) {
       spans[i].innerHTML = "&nbsp;";
     }
   } else {
    ps[12].innerHTML = "false";
    falseCount++;
    spans[4].innerHTML = integerResult;
    spans[5].innerHTML = topResult;
    spans[6].innerHTML = "&mdash;";
    spans[7].innerHTML = bottomResult;
   }
  }
}
