window.onload = initFuncs;

function initFuncs() {
// all the DOM variables
  var displayArr = [
                    document.getElementsByClassName("express"),//0
                    document.getElementsByClassName("fractop"),//1
                    document.getElementsByClassName("fracbot"),//2
                    document.getElementsByClassName("mixtop"),//3
                    document.getElementsByClassName("mixbot")//4
                    ];
  var simpleBools = document.getElementsByClassName("answerBool");
  var fracBools = document.getElementsByClassName("fracBool");
  var mixBools = document.getElementsByClassName("mixBool");
  var simpleAns = document.getElementsByClassName("showAnswer");
  var fracAnsTops = document.getElementsByClassName("fracAnswerTop");
  var fracAnsBots = document.getElementsByClassName("fracAnswerBot");
  var mixAnsInts = document.getElementsByClassName("mixAnswerInt");
  var mixAnsTops = document.getElementsByClassName("mixAnswerTop");
  var mixAnsBots = document.getElementsByClassName("mixAnswerBot");
  var allInputs = document.getElementsByTagName("input");
  var simpleIns = document.getElementsByClassName("responseBox");
  var ins = document.getElementsByClassName("fraction");
  var buts = document.getElementsByTagName("button");
  var simpleGos = [];
  var fracGos = [];
  var mixGos = [];
  var j = 5
  var fracTopIns = [];
  var fracBotIns = [];
  var mixIntIns = [];
  var mixTopIns = [];
  var mixBotIns = [];
// data processing varaibles
  var signsArr = [ "+", "-", "&divide;", "x"];
  var falseCount = 0;
  var simpleResults = [];
  var fracTopResults = [];
  var fracBotResults = [];
  var mixIntResults = [];
  var mixTopResults = [];
  var mixBotResults = [];
// organizing the buttons and inputs
  for (var i = 0; i < 5; i++) {
    fracTopIns[i] = ins[i*2];
    fracBotIns[i] = ins[(i*2)+1];
  }
  for (var i = 0; i < 3; i++) {
    mixIntIns[i] = ins[(i*3)+10];
    mixTopIns[i] = ins[(i*3)+11]
    mixBotIns[i] = ins[(i*3)+12]
  }
  for (var i = 0; i < 5; i++) {
    j++;
    simpleGos[i] = buts[i];
    fracGos[j] = buts[j];
  }
  for (var i = 10; i < 13; i++) {
    mixGos[i] = buts[i];
  }
  for (var i = 0; i < displayArr.length; i++) {
    for (var j = 0; j < displayArr[i].length; j++) {
        displayArr[i][j].innerHTML = j;
    }
  }

  for (var i = 0; i < 5; i++) {
    getRandoms(i);
    getFractions(i);
  }
  for (var j = 0; j < 3; j++) {
    getImpropers(j);
  }

  function getRandoms(boxNo) {
    var left = Math.ceil(Math.random()*12);
    var right = Math.ceil(Math.random()*12);
    var signIndex = Math.floor(Math.random()*4);
    switch(signIndex) {
      case 0:
        addThem(left, right, boxNo);
        break;
      case 1:
        subtractThem(left, right, boxNo);
        break;
      case 2:
        divideThem(left, right, boxNo);
        break;
      case 3:
        multiplyThem(left, right, boxNo);
        break;
      default:
        displayArr[0][boxNo].innerHTML = "momsbooboobathroomcookies";
    }
    displayExpression(left, right, signIndex, boxNo);
    simpleAns[boxNo].innerHTML = simpleResults[boxNo];
  }

  function displayExpression(l, r, sign, box) {
    displayArr[0][box].innerHTML = l + " " + signsArr[sign] + " " + r;
  }

  function addThem(l, r, n) {
    simpleResults[n] = l + r;
  }

  function subtractThem(l, r, n) {
    simpleResults[n] = l - r;
  }

  function multiplyThem(l, r, n) {
    simpleResults[n] = l * r;
  }

  function divideThem(l, r, n) {
    simpleResults[n] = Math.round(l/r);
  }

  function getFractions(boxNo) {
    var pass = 0;
    var factor = Math.ceil(Math.random()*10);
    var top = Math.ceil(Math.random()*10) * factor;
    var bot = Math.ceil(Math.random()*10) * factor;
    if (top == bot) { bot = bot*factor; }
    if (top > bot) {
      pass = top;
      top = bot;
      bot = pass;
    }
    displayArr[1][boxNo].innerHTML = top;
    displayArr[2][boxNo].innerHTML = bot;
    fracReducer(top, bot, boxNo, 0);
  }

  function fracReducer(top, bot, boxNo, improper) {
    var intArr = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
    for (var i = 0; i < intArr.length; i++) {
      if (top % intArr[i] == 0 && bot % intArr[i] == 0) {
        top = top/intArr[i];
        bot = bot/intArr[i];
      }
    }
    if (improper == 0) {
      fracTopResults[boxNo] = top;
      fracBotResults[boxNo] = bot;
      fracAnsTops[boxNo].innerHTML = top;
      fracAnsBots[boxNo].innerHTML = bot;
    } else {
      mixTopResults[boxNo] = top;
      mixBotResults[boxNo] = bot;
      mixAnsTops[boxNo].innerHTML = top;
      mixAnsBots[boxNo].innerHTML = bot;
    }
  }

  function getImpropers(boxNo) {
    var pass;
    var factor = Math.ceil(Math.random()*10);
    var top = Math.ceil(Math.random()*10) * factor;
    var bot = Math.ceil(Math.random()*10) * factor;
    if (top == bot) { top = top*factor; }
    if (top < bot) {
      pass = top;
      top = bot;
      bot = pass;
    }
    displayArr[3][boxNo].innerHTML = top;
    displayArr[4][boxNo].innerHTML = bot;
    mixIntResults[boxNo] = Math.floor(top/bot);
    mixAnsInts[boxNo].innerHTML = mixIntResults[boxNo];
    if (top%bot == 0) {
      mixTopResults[boxNo] = "";
      mixBotResults[boxNo] = "";
      mixAnsTops[boxNo].innerHTML = "";
      mixAnsBots[boxNo].innerHTML = "";
    } else {
      top = top%bot;
      fracReducer(top, bot, boxNo, 1);
    }
  }

}
