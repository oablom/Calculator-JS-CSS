// Skapa en simpel kalkylator. Det ska finnas två input fält som tar in varsitt nummer, och när användaren fyllt i bägge och klickar på en knapp ska dessa två värdena adderas med varandra (+).
// Skapa ytterligare en knapp för att multiplicera dessa tal med varandra
// Skapa en knapp för att subtrahera dessa tal med varandra (tal1 - tal2). Om resultatet blir mindre än 0, skriv ut ett snällt felmeddelande i webbläsaren, där det står tydligt vad användaren gjort fel och behöver rätta till för att få det att fungera.

let digit = document.querySelectorAll(".number");
let equationSpan = document.getElementById("equation");
let equation = document.getElementById("equation");
let equationSolved = false;

digit.forEach((item, index) => {
  item.setAttribute("id", `number-${index + 1}`);
  item.setAttribute("digitNum", index);

  item.addEventListener("click", () => {
    let input = document.getElementById("input");

    if (input.value === "") {
      input.value = 0;
    }
    let currentValue = input.value;
    inputIndex = index + 1;

    input.value = parseFloat(currentValue + inputIndex);
    input.value.toString();
    console.log(input.value);
    console.log(inputArray);
  });
});

let clearInput = document.querySelector("#clear-input");

clearInput.addEventListener("click", () => {
  input.value = "";
  inputArray = [];
  equation.innerHTML = "";
  calculate().results = 0;
  //   clickedAddIndex = 0;
  input.placeholder = "";
});

let removeDigit = document.getElementById("remove-digit");

removeDigit.addEventListener("click", () => {
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
  addSubMultiDiv("+");
});
subtract.addEventListener("click", function () {
  addSubMultiDiv("-");
});
multiply.addEventListener("click", function () {
  addSubMultiDiv("*");
});
divide.addEventListener("click", function () {
  addSubMultiDiv("/");
});
equals.addEventListener("click", function () {
  addSubMultiDiv("=");
});

//   inputArray.join(""));
// document.body.append(equation);

function calculate() {
  let results = parseFloat(inputArray[0]);
  let index = 0;

  while (index < inputArray.length) {
    const element = inputArray[index];
    let leftValue = parseFloat(inputArray[index - 1]);
    let rightValue = parseFloat(inputArray[index + 1]);
    let result = 0;

    if (element === "*") {
      result = leftValue * rightValue;
      inputArray.splice(index - 1, 3, result);
      index -= 2;
    } else if (element === "/") {
      result = leftValue / rightValue;
      inputArray.splice(index - 1, 3, result);
      index -= 2;
    } else {
      index++;
    }
  }

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
        //     results = value; // Kanske vill du bara sätta results till value istället?
        break;
      default:
        break;
    }
  }
  return results;
}

function addSubMultiDiv(operator) {
  let input = document.getElementById("input");

  // om jag trycker på operator och arrayen har två int i rad, ta borta arrayIndex0
  //   if ()
  if (equationSolved && input.value !== "") {
    inputArray = [];
    inputArray.push(input.value, operator);
    equationSolved = false;
    console.log(inputArray);
  } else {
    //   if (inputArray.length === 1 && !isNaN(input.value)) {
    //     inputArray = [];
    //     equationSpan.textContent = inputArray.join(" ");
    //   }
    if (input.value.length > 0) {
      inputArray.push(input.value);
    }
    if (operator === "=") {
      let result = calculate();
      console.log("Calculated Result:", result);
      equationSpan.textContent = result;

      console.log(inputArray);
      inputArray = [result.toString()]; // Spara resultatet som en sträng i inputArray för att fortsätta med andra beräkningar om så önskas.
      console.log(inputArray);
      input.value = "";
      equationSolved = true;
      return;
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
  equationSpan.textContent = inputArray.join(" ");
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
