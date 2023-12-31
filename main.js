let audioClick;
let audioEnter;
let audioClear;

window.onload = function () {
  audioClick = new Audio("sounds/click.wav");
  audioEnter = new Audio("sounds/enter.wav");
  audioClear = new Audio("sounds/clear.wav");
  // audio = new Audio(
  //   "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3"
  // );
  audioClick.preload = "auto";
  audioEnter.preload = "auto";
  audioClear.preload = "auto";
  // clickSound(audioClick);
  // clickSound(audioEnter);
  // clickSound(audioClear);
};
function clickSound(audio) {
  if (audio) {
    audio.currentTime = 0.11;
    audio.play();
  }
}

let digit = document.querySelectorAll(".number");
let equationSpan = document.getElementById("equation");
// let equation = document.getElementById("equation");
let equationSolved = false;

digit.forEach((item, index) => {
  item.setAttribute("id", `number-${index + 1}`);
  item.setAttribute("digitNum", index);

  item.addEventListener("click", () => {
    let input = document.getElementById("input");
    clickSound(audioClick);

    // if (input.value === "") {
    //   input.value = 0;
    // }
    let currentValue = input.value;
    inputIndex = index + 1;
    // if (currentValue === "-") {
    //   input.value = currentValue + inputIndex;
    // } else
    if (index < 10) {
      input.value = parseFloat(currentValue + inputIndex);
      //   input.value.toString();
    } else if (index === 10) {
      if (input.value.includes(".")) {
        input.value = currentValue + 0;
      } else {
        input.value = parseFloat(currentValue + 0);
      }

      //   input.value.toString();
    } else {
      input.value = currentValue + ".";
    }
    input.value.toString();
  });
});

let clearInput = document.querySelector("#clear-input");

clearInput.addEventListener("click", () => {
  clickSound(audioClear);
  input.value = "";
  inputArray = [];
  equation.innerHTML = "";
  calculate().results = 0;
  //   clickedAddIndex = 0;
  input.placeholder = "";
});

let removeDigit = document.getElementById("remove-digit");
clickSound(audioClick);

removeDigit.addEventListener("click", () => {
  clickSound(audioClick);

  input.placeholder = "";

  if (input.value.length > 0) {
    input.value = input.value.slice(0, -1);
    console.log("input-value (removedigit)", input.value);
  }
});

let subtract = document.getElementById("subtract");
let multiply = document.getElementById("multiply");
let divide = document.getElementById("divide");
let add = document.getElementById("add");

let equals = document.getElementById("equals");

// let clickedAddIndex = 0;
let inputArray = [];
let inputResult = 0;

add.addEventListener("click", function () {
  clickSound(audioClick);

  addSubMultiDiv("+");
});
subtract.addEventListener("click", function () {
  clickSound(audioClick);

  addSubMultiDiv("-");
});
multiply.addEventListener("click", function () {
  clickSound(audioClick);

  addSubMultiDiv("x");
});
divide.addEventListener("click", function () {
  clickSound(audioClick);

  addSubMultiDiv("/");
});
equals.addEventListener("click", function () {
  clickSound(audioEnter);

  addSubMultiDiv("=");
});

//   inputArray.join(""));
// document.body.append(equation);

function calculate() {
  console.log("arraylength", inputArray.length);
  // let y = 0;
  // if (isNaN(inputArray[0])) {
  //   y = 1;
  // }
  for (let index = 0; index < inputArray.length; index++) {
    const element = inputArray[index];
    let leftValue = parseFloat(inputArray[index - 1]);
    let rightValue = parseFloat(inputArray[index + 1]);
    let result = 0;
    if (element === "x" || element === "/") {
      if (element === "x") {
        result = leftValue * rightValue;

        //   return;
      } else if (element === "/") {
        result = leftValue / rightValue;

        //   return;
      }
      console.log("beforeSplice", inputArray);
      inputArray.splice(index - 1, 3, result);
      console.log("afterSplice", inputArray);

      index--;
    }
  }
  let tempArray = [...inputArray];
  if (inputArray[0] === "") {
    tempArray.shift();
    tempArray.unshift(0);
  }

  console.log("zeroIndex", inputArray[0]);

  let results = parseFloat(tempArray[0]);
  // if (inputArray[0] === "") {
  //   results = 0;
  // }

  for (let index = 2; index < inputArray.length; index += 2) {
    let value = parseFloat(inputArray[index]);
    let operator = inputArray[index - 1];

    switch (operator) {
      case "+":
        results += value;
        break;
      case "-":
        results -= value;
        break;
      //   case "*":
      //     results *= value;
      //     break;
      //   case "/":
      //     results /= value;
      //     break;
      //   case "=":
      //     results = value;
      // break;
      default:
        break;
    }
  }
  console.log("endofCalc", inputArray);
  return results;
}

function addSubMultiDiv(operator) {
  let input = document.getElementById("input");

  if (operator === "-" && input.value === "" && inputArray.length < 2) {
    input.value = -input.value;
  }

  if (input.value.includes(".")) {
    input.value = parseFloat(input.value);
  }

  // om jag trycker på operator och arrayen har två int i rad, ta borta arrayIndex0
  //   if ()
  if (equationSolved && input.value !== "") {
    inputArray = [];
    inputArray.push(input.value, operator);
    equationSolved = false;
    // console.log(inputArray);
  } else {
    //   if (inputArray.length === 1 && !isNaN(input.value)) {
    //     inputArray = [];
    //     equationSpan.textContent = inputArray.join(" ");
    //   }
    // if (input.value.length === 0) {}
    if (input.value.length > 0) {
      inputArray.push(input.value);
    }
    if (operator === "=" || inputArray.length >= 7) {
      let result = calculate();
      if (!isNaN(result)) {
        console.log("Calculated Result:", result);
        equationSpan.textContent = parseFloat(result.toFixed(5));

        console.log(inputArray);
        inputArray = [result.toString()];
        console.log(inputArray);
        input.value = "";
        equationSolved = true;
        return;
      }
    } else {
      equationSolved = false;
      //   if ( operator !== "=") {

      if (
        isNaN(inputArray[inputArray.length - 1]) &&
        inputArray[inputArray.length - 1] !== "="
      ) {
        inputArray[inputArray.length - 1] = operator;
      } else {
        inputArray.push(operator);
      }
    }
  }

  inputArray = inputArray.map((item) => {
    if (!isNaN(item) && item.includes(".")) {
      let decimalLength = item.split(".")[1].length;
      if (decimalLength > 5) {
        item = parseFloat(item).toFixed(5);
        item = item.toString();
      }
    }
    return item;
  });

  // if (inputArray[0] === "0" || inputArray[0] === 0) {
  //   input.value = toString(-input.value);
  //   firstValue = inputArray[0];
  //   inputArray.shift();
  //   // inputArray.shift();
  // }
  // inputArray[0] = firstValue;
  // inputArray = [];
  if (inputArray.length < 3 && inputArray[0] === "0") {
    inputArray.shift();
    inputArray.unshift("");
    console.log(inputArray);
  }
  equationSpan.textContent = inputArray.join(" ");
  // equationSpan.textContent = parseFloat(inputArray.join(" ").toFixed(5));

  input.value = "";
}
// }

calculate();

//   clickedAddIndex--;
// } else if (clickedAddIndex % 2 === 0) {
//   inputArray[inputArray.length - 1] = "=";

// inputArray.push(calculate().toString(), " +");

//   clickedAddIndex++;
// }
// if (inputArray.length > 6) {
//   inputArray.splice(0, 8);
// }

// function addSubMultiDiv(operator) {
//   let lastIndex = inputArray[inputArray.length - 1];
//   calculate();
//   if (
//     operator !== lastIndex &&
//     // !Number.isInteger(lastIndex) &&
//     operator !== "="
//   ) {
//     inputArray[inputArray.length - 1] = operator;
//     equationSpan.textContent = inputArray.join(" ");
//     console.log(inputArray);
//   } else if (operator === "=") {
//     inputArray[inputArray.length - 1] = "";
//     inputArray = [calculate().toString(), operator, input.value];

//     equationSpan.textContent = inputArray.join(" ");
//     console.log(inputArray);
//   }
//   if (input.value.length > 0 && input.value !== "" && input.value) {
//     // clickedAddIndex++;
//     inputArray.push(input.value, operator);
//     inputArray = [calculate().toString(), operator];

//     equationSpan.textContent = inputArray.join(" ");

//     console.log(inputArray);

//     console.log("inputresults", inputResult);
//   }
//   if (inputArray.length > 0) {
//     input.placeholder = input.value;
//     input.value = "";
//   }
// }
