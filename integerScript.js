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
  var alertFields = [];
  var simpcount = 0;
  var fraccount = 0;
  var mixcount = 0;

  var simpleAns = document.getElementsByClassName("showAnswer");
  var fracAnsTops = document.getElementsByClassName("fracAnswerTop");
  var fracAnsBots = document.getElementsByClassName("fracAnswerBot");
  var mixAnsInts = document.getElementsByClassName("mixAnswerInt");
  var mixAnsTops = document.getElementsByClassName("mixAnswerTop");
  var mixAnsBots = document.getElementsByClassName("mixAnswerBot");
  var bigs = document.getElementsByClassName("big");
  var bigIndex;
  var fracEmdash = [];
  var mixEmdash = [];
  var k = 0;

  var allInputs = document.getElementsByTagName("input");
  var simpleIns = document.getElementsByClassName("responseBox");
  var ins = document.getElementsByClassName("fraction");
  var priorInputs = displayArr[1].length + displayArr[2].length;
  var fracTopIns = [];
  var fracBotIns = [];
  var mixIntIns = [];
  var mixTopIns = [];
  var mixBotIns = [];
  var validateIns = [];

  var buts = document.getElementsByTagName("button");
  var j = 0;
  var l = 0;
  var simpleGos = [];
  var fracGos = [];
  var mixGos = [];

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
//breaks up inputs per function
  for (var i = 0; i < displayArr[1].length; i++) {
    fracTopIns[i] = ins[i*2];
    fracBotIns[i] = ins[(i*2)+1];
  }
  for (var i = 0; i < displayArr[3].length; i++) {
    mixIntIns[i] = ins[(i*3)+priorInputs];
    mixTopIns[i] = ins[(i*3)+priorInputs+1];
    mixBotIns[i] = ins[(i*3)+priorInputs+2];
  }
// breaks up buttons per function
  for (var i = 0; i < displayArr[0].length; i++) {
    simpleGos[i] = buts[i];
  }
  for (var i = displayArr[0].length;
    i < (displayArr[0].length + displayArr[1].length); i++) {
    fracGos[j] = buts[i];
    j++;
  }
  for (var i = displayArr[0].length + displayArr[1].length;
    i < (displayArr[0].length + displayArr[1].length +
    displayArr[3].length); i++) {
    mixGos[l] = buts[i];
    l++;
  }
// grabs elements for fraction answer display
  for (var i = 0; i < bigs.length/3; i++) {
    bigIndex = i + ( (i*2) + 1 );
      if (bigIndex > (displayArr[1].length * 3) ) {
        mixEmdash[k] = bigs[bigIndex];
        k++;
      } else {
        fracEmdash[i] = bigs[bigIndex];
      }
  }
// creates a document-spanning array one text elements per math problem
// for form validation dialog boxes
  for (var i = 0; i < simpleBools.length +
   fracBools.length + mixBools.length; i++ ) {
     if (i >= (simpleBools.length + fracBools.length)) {
       alertFields[i] = mixBools[mixcount];
       mixcount++;
     } else if (i >= simpleBools.length) {
       alertFields[i] = fracBools[fraccount];
       fraccount++;
     } else {
       alertFields[i] = simpleBools[simpcount];
       simpcount++;
     }
    alertFields[i].style.fontSize = "12px";
  }
// assigns functions to simple problem buttons
  for (var i = 0; i < simpleGos.length; i++) {
    var simpButton = simpleGos[i];
    simpleAssigner(simpButton, i);
  }

  function simpleAssigner(thisButton, boxNo) {
    var type = "simp";
    thisButton.onclick = function () {
    validateIns = [];
    validateIns[0] = simpleIns[boxNo];
    validateInput(boxNo, type, boxNo)
    };
  }
// assigns functions to fraction reducer buttons
  for (var i = 0; i < fracGos.length; i++) {
    var fracButton = fracGos[i];
    fracAssigner(fracButton, i);
  }

  function fracAssigner(thisButton, boxNo) {
    var type = "frac";
    var intercept = displayArr[0].length + boxNo;
    thisButton.onclick = function () {
      validateIns = [];
      validateIns[0] = fracTopIns[boxNo];
      validateIns[1] = fracBotIns[boxNo];
      validateInput(boxNo, type, intercept)
    };
  }
// assigns functions to mixed number converter buttons
  for (var i = 0; i < mixGos.length; i++) {
    var mixButton = mixGos[i];
    mixAssigner(mixButton, i);
  }

function mixAssigner(thisButton, boxNo) {
    var type = "mix";
    var intercept = displayArr[0].length + displayArr[1].length + boxNo;
    thisButton.onclick = function () {
      validateIns = [];
      validateIns[0] = mixIntIns[boxNo];
      validateIns[1] = mixTopIns[boxNo];
      validateIns[2] = mixBotIns[boxNo];
      validateInput(boxNo, type, intercept)
    };
  }

  for (var i = 0; i < displayArr[0].length; i++) {
    getRandoms(i);
  }
  for (var k = 0; k < displayArr[1].length; k++) {
    getFractions(k);
  }
  for (var j = 0; j < displayArr[3].length; j++) {
    getImpropers(j);
  }

  function validateInput(boxNo, type, alertNo) {
     var invalid = 0;
     for (var i = 0; i < validateIns.length; i++) {
       if (validateIns[i].value == "" || validateIns[i].value == " ") {
         alertFields[alertNo].innerHTML = "enter a value";
         invalid = 1;
         if (type == "mix") {
            if (mixIntIns[boxNo].value != "" && mixIntIns[boxNo].value != " " &&
                mixTopResults[boxNo] == "" && mixBotResults[boxNo] == "") {
                  invalid = 0;
            }
         }
       } else if (isNaN(validateIns[i].value)) {
         alertFields[alertNo].innerHTML = "enter a number";
         invalid = 1;
       }
     }
     if (invalid != 1) {
       alertFields[alertNo].innerHTML = type;
       switch(type) {
         case "simp":
           compareValues(validateIns[0].value, boxNo);
           break
         case "frac":
           validateReducer(validateIns[0].value, validateIns[1].value, boxNo);
           break;
         case "mix":
           validateMixed(validateIns[0].value, validateIns[1].value,
             validateIns[2].value, boxNo);
           break;
         default:
           displayArr[0][boxNo].innerHTML = "[]";
      }
    }
  }

  function compareValues(valueIn, boxNo) {
    simpleBools[boxNo].innerHTML = "true";
    if (valueIn != simpleResults[boxNo]) {
      simpleBools[boxNo].innerHTML = "false";
      simpleAns[boxNo].innerHTML = simpleResults[boxNo];
    }
  }

  function validateReducer(num, denom, boxNo) {
    fracBools[boxNo].innerHTML = "true";
    if (num != fracTopResults[boxNo] || denom != fracBotResults[boxNo]) {
      fracBools[boxNo].innerHTML = "false";
      fracAnsTops[boxNo].innerHTML = fracTopResults[boxNo];
      fracEmdash[boxNo].innerHTML = "&mdash;";
      fracAnsBots[boxNo].innerHTML = fracBotResults[boxNo];
    }
  }

  function validateMixed(whole, num, denom, boxNo) {
    mixBools[boxNo].innerHTML = "true";
    if (whole != mixIntResults[boxNo] || num != mixTopResults[boxNo] ||
      denom != mixBotResults[boxNo]) {
        mixBools[boxNo].innerHTML = "false";
        mixAnsInts[boxNo].innerHTML = mixIntResults[boxNo];
        mixAnsTops[boxNo].innerHTML = mixTopResults[boxNo];
        mixEmdash[boxNo].innerHTML = (mixTopResults[boxNo] == "")?
                                     "" : "&mdash;";
        mixAnsBots[boxNo].innerHTML = mixBotResults[boxNo];
      }
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
        displayArr[0][boxNo].innerHTML = "[]";
    }
    displayExpression(left, right, signIndex, boxNo);

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
    } else {
      mixTopResults[boxNo] = top;
      mixBotResults[boxNo] = bot;
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
