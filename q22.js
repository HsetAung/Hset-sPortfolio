let buttons = document.querySelectorAll(".buttons");
let input = document.querySelectorAll("input");
let backspace = document.getElementById("backspace");
let shift = document.getElementById("shift");
let space = document.getElementById("space");
let result = document.getElementById("trueOrNot");
let missed_Count = document.querySelector(".missed_Count");
let correct_Count = document.getElementById("correct_Count");
let wpm = document.querySelector(".wpm");
let startTime;
let lastClickedButton;

let correct = 0;
correct_Count.innerHTML = correct;

let missed = 0;
missed_Count.innerHTML = missed;

let wpm_count = 0;
wpm.innerHTML = wpm_count;

let keyArray = [];  //it is used for back  and space key
let keyWords = "qwertyuiopa1234567890sdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

input[0].value = randomKey(5);

function randomKey(keyWords_length) {
  let random = "";
  for (let index = 0; index < keyWords_length; index++) {
    random += keyWords.charAt(Math.floor(Math.random() * keyWords.length));
  }
  return random;
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!startTime) {
      startTime = new Date().getTime(); // Start the time after clicked the 1st btn
    }

    input[1].value += btn.innerText;
    keyArray = input[1].value.split("");

    console.log("char", input[1].value);

    if (input[1].value.length == 5 && input[1].value == input[0].value) {
      correct_Count.innerHTML = ++correct;

      if (correct > 0) {
        // Calculate elapsed time
        let endTime = new Date().getTime();
        let elapsed_time = (endTime - startTime) / 1000; // Convert to second

        // Calculate words per minute
        wpm_count = (input[1].value.length / elapsed_time) * 60;
        wpm.innerHTML = wpm_count.toFixed(2);

        //console.log(input[1].value.length)
      }

      if (input[1].value.length < 5) {
        input[1].style.display = "block";
      } else {
        input[1].value = null;
        input[0].value = randomKey(5);
        result.innerHTML = "Correct!";
        result.style.color = "teal";
      }
    } else if (input[1].value.length == 5 && input[1].value != input[0].value) {
      result.innerHTML = "Wrong!";
      result.style.color = "red";
      missed_Count.innerHTML = ++missed;

      if (input[1].value.length < 5) {
        input[1].style.display = "block";
      } else {
        input[1].value = null;
      }
    }


    btn.style.backgroundColor = "green"; // When 1st take a click btn, bgColor goes to green
    input[1].style.color = "green"; //input[1].value of color

    if (lastClickedButton !== btn) { //when press same key, still green
      
      btn.style.backgroundColor = "green";
    
      // Has been clicked one will go from green to gray
      if (lastClickedButton) {
        lastClickedButton.style.backgroundColor = "gray";
      }

      lastClickedButton = btn;
    }
  });

  // console.log(btn.innerText)
});

//space
space.addEventListener("click", () => {
  keyArray.push(" ");
  input[1].value = keyArray.join("");
});

//shift key

shift.addEventListener("click", () => {
  buttons.forEach((btn) => {
    btn.classList.toggle("upper");
  });
});

//backspace key
backspace.addEventListener("click", () => {
  keyArray.pop();
  input[1].value = keyArray.join("");
});
