let letters = "abcdefghijklmnopQrstuvwxyz";
let lettersArray = Array.from(letters.toUpperCase());
let lettersCont = document.querySelector(".letters-grid");
for (let i = 0; i < lettersArray.length; i++) {
  let span = document.createElement("span");
  let letter = document.createTextNode(lettersArray[i]);
  span.append(letter);
  span.className = "letter";
  lettersCont.append(span);
}
/**/
let gameFunction = () => {
  let hintsTime =
    localStorage.getItem("hints") !== null
      ? parseInt(localStorage.getItem("hints"))
      : 0;
  let field = document.querySelector(".game-footer");
  let catCont = document.querySelector(".cat-text");
  let wrong = -1;
  let counter = 7;
  let winCounter = 0;
  let score =
    localStorage.getItem("score") !== null
      ? parseInt(localStorage.getItem("score"))
      : 0;
  document.querySelector(".level-text").innerHTML = score;
  document.querySelector(".hints-time span").innerHTML = hintsTime;

  let draw = [
    document.querySelector(".stand"),
    document.querySelector(".hang"),
    document.querySelector(".rope"),
    document.querySelector(".man .head"),
    document.querySelector(".man .body"),
    document.querySelector(".man .hands"),
    document.querySelector(".man .legs")
  ];
  fetch("data.json")
    .then(res => {
      return res.json();
    })
    .then(r => {
      let catNum = Object.keys(r).length;
      let mainNum = Math.floor(Math.random() * catNum);
      let cat = Object.keys(r)[mainNum];
      let catval = Object.values(r)[mainNum];
      let choosed = catval[Math.floor(Math.random() * catval.length)];
      let arr = [cat, choosed];
      return arr;
    })
    .then(arr => {
      catCont.append(arr[0]);
      let choosedLetters = Array.from(arr[1][0].toLowerCase());
      for (let i = 0; i < choosedLetters.length; i++) {
        let span = document.createElement("span");
        if (choosedLetters[i] === " ") {
          span.className = "space";
        }
        field.append(span);
      }
      document.addEventListener("click", e => {
        let state = false;
        if (e.target.className === "letter") {
          e.target.classList.add("clicked");
          choosedLetters.forEach((ele, ind) => {
            if (e.target.innerText.toLowerCase() === ele) {
              let spanCont = document.querySelectorAll(".game-footer span");
              spanCont.forEach((span, spanind) => {
                if (spanind === ind) {
                  span.innerHTML = ele.toUpperCase();
                  state = true;
                  winCounter++;
                }
              });
            }
          });
          if (state === true) {
            console.log(winCounter);
            console.log(field.children.length);
            console.log(arr[1][0]);
            if (winCounter === field.children.length) {
              let popup = document.querySelector(".popup");
              popup.classList.add("ava");
              document.querySelector(".status").innerHTML =
                "winner :( The Man survived";
              document.querySelector(
                ".word-is"
              ).innerHTML = `word is "${arr[1][0]}"`;
              document.querySelector(
                ".fail-times"
              ).innerHTML = `you fail ${wrong + 1} times`;
              document.querySelector(".hints").style.opacity = "0.2";
              document.querySelector(".game-body").style.opacity = "0.2";
              document.querySelector(".game-footer").style.opacity = "0.2";
              document.querySelector(".popup .stand").classList.remove("ava");
              document.querySelector(".popup .hang").classList.remove("ava");
              document.querySelector(".popup .rope").classList.remove("ava");
              document.querySelector(".popup .man").classList.add("win-man");
              document
                .querySelector(".popup .hands")
                .classList.add("win-hands");
              document.querySelector(".popup .hands").classList.add("ava");
              document.querySelector(".popup .head").classList.add("ava");
              document.querySelector(".popup .body").classList.add("ava");
              document.querySelector(".popup .legs").classList.add("ava");
              document
                .querySelector(".popup .the-draw")
                .classList.add("win-draw");
              let level = document.querySelector(".user-level");
              if (wrong + 1 === 0) {
                level.innerHTML = "you level is : super senior Gamer";
              } else if (wrong + 1 < 3) {
                level.innerHTML = "you level is : senior gamer";
              } else if (wrong + 1 < 5) {
                level.innerHTML = "you level is : mid-jonior";
              } else {
                level.innerHTML = "you level is : a small jonior";
              }
              let button = document.querySelector(".popup button");
              button.innerHTML = "continue";
              button.addEventListener("click", () => {
                hintsTime += 1;
                score++;
                localStorage.setItem("score", score);
                localStorage.setItem("hints", hintsTime);
                location.reload();
              });
            }
          } else {
            wrong++;
            counter--;
            if (counter < 0) {
              counter = 7;
            }

            document.querySelector(".counter").innerHTML = counter;
            if (counter === 0) {
              let popup = document.querySelector(".popup");
              popup.classList.add("ava");
              document.querySelector(".status").innerHTML =
                "LOSER :( The Man Hanged";
              document.querySelector(
                ".word-is"
              ).innerHTML = `word is "${arr[1][0]}"`;
              document.querySelector(
                ".fail-times"
              ).innerHTML = `you fail ${wrong + 1} times`;
              document.querySelector(".hints").style.opacity = "0.2";
              document.querySelector(".game-body").style.opacity = "0.2";
              document.querySelector(".game-footer").style.opacity = "0.2";
              document.querySelector(".popup .stand").classList.add("ava");
              document.querySelector(".popup .hang").classList.add("ava");
              document.querySelector(".popup .rope").classList.add("ava");
              document.querySelector(".popup .man").classList.remove("win-man");
              document
                .querySelector(".popup .hands")
                .classList.remove("win-hands");
              document.querySelector(".popup .hands").classList.add("ava");
              document.querySelector(".popup .head").classList.add("ava");
              document.querySelector(".popup .body").classList.add("ava");
              document.querySelector(".popup .legs").classList.add("ava");
              document
                .querySelector(".popup .the-draw")
                .classList.remove("win-draw");
              let level = document.querySelector(".user-level");
              level.innerHTML =
                "you level is : a baby begginer, go back to school";
              let button = document.querySelector(".popup button");

              button.addEventListener("click", () => {
                location.reload();
              });
            } else {
              draw[wrong].classList.add("ava");
            }
          }
        }
      });
      /*hints clicked*/
      let clicknum = 0;
      let hintbutton = document.querySelector(".hints-footer button");
      hintbutton.addEventListener("click", () => {
        if (hintsTime > 0) {
          clicknum++;
          if (clicknum > 2) {
            hintbutton.classList.add("end");
          }
          if (clicknum === 1) {
            hintsTime--;
            document.querySelector(".hints-time span").innerHTML = hintsTime;
            localStorage.setItem("hints", hintsTime);

            let textHint = document.querySelector(".hints-body h1");
            textHint.innerHTML = arr[1][1];
          } else if (clicknum === 2) {
            hintsTime--;
            document.querySelector(".hints-time span").innerHTML = hintsTime;
            localStorage.setItem("hints", hintsTime);

            let imageHint = document.querySelector(".img-cont img");
            imageHint.src = arr[1][2];
            console.log(arr[1][2]);
          }
        }
      });
      /*info button */
      let infoPopup = document.querySelector(".header-popup");
      document.querySelector("header button").addEventListener("click", () => {
        infoPopup.classList.add("ava");
        document.querySelector(".game-footer").style.opacity = "0.2";
        document.querySelector(".hints").style.opacity = "0.2";
        document.querySelector(".game-body").style.opacity = "0.2";
        document.querySelector("header button").classList.add("clicked");
        /* */
        document
          .querySelector(".header-popup button")
          .addEventListener("click", () => {
            document.querySelector("header button").classList.remove("clicked");
            infoPopup.classList.remove("ava");
            document.querySelector(".game-footer").style.opacity = "1";
            document.querySelector(".hints").style.opacity = "1";
            document.querySelector(".game-body").style.opacity = "1";
          });
      });

      /*the end of te function */
    });
};
window.onload = gameFunction;
