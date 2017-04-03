//the intention of this design is to completely decouple the script from the html;
//not only can pages conatain any number of specified components
//in any combination and/or order, now there is no longer any requirement that all types of
//component be present; as long as the children are properly classed and
//clustered, there is no limit to how the html document can be rearranged; it will
//not break the script

//to me this looks like it's ready to translate into angular

window.addEventListener('load', initFuncs);

function initFuncs() {
  var debug = document.getElementById("debugger");
 /*
  if (document.getElementsByClassName("flexFracInner")) {
    var f = document.getElementsByClassName("flexFracInner");
    var arr = [];
    for (var i = 0; i < f.length; i++) {
      if (f[i].childNodes) {
        for (var j = 0; j < f[i].childNodes.length; j++) {
          if (f[i].childNodes[j].tagName == "INPUT") {
            debug.innerHTML += "[" + i + "]" + "[" + j + "] ~ ";
          }
        }
      }
    }
  }
  */
// data processing varaibles
  var validateIns = [];
  var signsArr = [ "+", "-", "&divide;", "x"];
  var falseCount = 0;
  var simpleResults = [];
  var fracTopResults = [];
  var fracBotResults = [];
  var mixIntResults = [];
  var mixTopResults = [];
  var mixBotResults = [];

// DOM variables

//this folling suite checks the document for specified--hard-coded (at present)--classes
//of elements, these will be where the randomnly generated math problems display;
//if an element is present, it becomes part of an array--displayArray--which
//is used to set up the view; all present elements are recorded in displayIndex

  var alertFields = [];
  var displayArr = [];
  var displayClass = ["express", "fractop", "fracbot","mixtop", "mixbot"];
  var displayIndex = [];
  for (var i = 0; i < displayClass.length; i++) {
    if (document.getElementsByClassName(displayClass[i])) {
      displayArr.push(document.getElementsByClassName(displayClass[i]));
      displayIndex.push(displayClass[i]);
    }
  }
//the components "scopes" have to be hard-coded like this:
//check if the component is in the index, if so, start building its data structure,
//then set up controls for input and output

//note: so far there is no error-proofing for the improper clustering of otherwise
//validly classed elements; the onus is on the author of the html to follow the guidlines;
//there is a simple fix for this but I don't wont to do it right now

  if (displayIndex.indexOf("express") != -1) {
    var simpleBools = document.getElementsByClassName("answerBool");
    var simpleAns = document.getElementsByClassName("showAnswer");
    var simpleIns = document.getElementsByClassName("responseBox");
    var simpleGos = document.getElementsByClassName("simpleGo");
    var simpleAllIns = [simpleIns]
    // this takes text elements where the true/false messages would show up
    // puts them in a document-spanning array, which we'll use to report bad input
    for (var i = 0; i < simpleBools.length; i++) {
      alertFields.push(simpleBools[i]);
    }
  }

  if (displayIndex.indexOf("fractop") != -1 && displayIndex.indexOf("fracbot") != -1) {
    var fracBools = document.getElementsByClassName("fracBool");
    var fracAnsTops = document.getElementsByClassName("fracAnswerTop");
    var fracAnsBots = document.getElementsByClassName("fracAnswerBot");
    var fracGos = document.getElementsByClassName("fracGo");
    var fracEmdash = document.getElementsByClassName("fracEmdash");
    var fracTopIns = document.getElementsByClassName("fracInTop");
    var fracBotIns = document.getElementsByClassName("fracInBot");
    var fracAllIns = [fracTopIns, fracBotIns];
    // this takes text elements where the true/false messages would show up
    // puts them in a document-spanning array, which we'll use to report bad input
    for (var i = 0; i < fracBools.length; i++) {
      alertFields.push(fracBools[i]);
    }
  }

  if (displayIndex.indexOf("mixtop") != -1 && displayIndex.indexOf("mixbot") != -1) {
    var mixBools = document.getElementsByClassName("mixBool");
    var mixAnsTops = document.getElementsByClassName("mixAnswerTop");
    var mixAnsBots = document.getElementsByClassName("mixAnswerBot");
    var mixGos = document.getElementsByClassName("mixGo");
    var mixEmdash = document.getElementsByClassName("mixEmdash");
    var mixIntIns = document.getElementsByClassName("mixInInt");
    var mixTopIns = document.getElementsByClassName("mixInTop");
    var mixBotIns = document.getElementsByClassName("mixInBot");
    var mixAllIns = [mixIntIns, mixTopIns, mixBotIns];
    // this takes text elements where the true/false messages would show up
    // puts them in a document-spanning array, which we'll use to report bad input
    for (var i = 0; i < mixBools.length; i++) {
      alertFields.push(mixBools[i]);
    }
  }

// assigns functions to simple problem buttons
  for (var i = 0; i < simpleGos.length; i++) {
    simpleAssigner(simpleGos[i], i, "simp", simpleAllIns, simpleBools[i]);
  }

  function simpleAssigner(thisButton, boxNo, string, inputArr, alertField) {
    var type = string;
    thisButton.onclick = function () {
      validateIns = [];
      for (var i = 0; i < inputArr.length; i++) {
        validateIns[i] = inputArr[i][boxNo]
      }
      validateInput(boxNo, type, boxNo);
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
      validateInput(boxNo, type, intercept);
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
      validateInput(boxNo, type, intercept);
    };
  }
  for (var i = 0; i < displayArr[0].length; i++) {
    getRandoms(i,0);
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

  function getRandoms(boxNo, dispNo) {
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
        displayArr[dispNo][boxNo].innerHTML = "[]";
    }
    displayExpression(left, right, signIndex, boxNo, dispNo);

  }

  function displayExpression(l, r, sign, box, disp) {
    displayArr[disp][box].innerHTML = l + " " + signsArr[sign] + " " + r;
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
