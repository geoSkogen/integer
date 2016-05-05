window.onload = initFuncs;

function initFuncs() {
  var ps = document.getElementsByTagName('p');
  var ins = document.getElementsByTagName('input');
  var buts = document.getElementsByTagName('button');
  var signsArr = [ "+", "-", "/", "x"];
  var result;
  var falseCount = 0;
  buts[0].onclick = validateInput;
  ins[0].addEventListener("keypress", function () { if (event.keyCode === 13)
                                                     { validateInput(); } });
  getRandoms();

  function validateInput() {
    var numIn;
    var inIn = ins[0].value;
    if (inIn == "" || inIn == " ") {
      ps[1].innerHTML = "enter a value";
    } else if (isNaN(inIn)){
      ps[1].innerHTML = "enter a number";
    } else {
      numIn = Number(inIn);
      ps[1].innerHTML = numIn;
      compareValues(numIn);
    }
  }

  function getRandoms() {
    var left = Math.floor(Math.random()*11);
    var right = Math.floor(Math.random()*11);
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
        falseCount += 1;
      }
    }
}
