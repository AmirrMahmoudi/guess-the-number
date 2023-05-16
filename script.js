// Guess the Number

document.addEventListener("DOMContentLoaded", () => {
  const stage1 = document.getElementById("stage1");
  const stage2 = document.getElementById("stage2");
  const maximumInput = document.getElementById("maximum");
  const startButton = document.getElementById("start");
  const guessInput = document.getElementById("guess-number");
  const guessButton = document.getElementById("guess-button");
  const chancesSpan = document.getElementById("chances");

  let maximumNumber, totalChances, targetNumber;

  maximumInput.focus();

  startButton.addEventListener("click", startGame);

  function startGame(e) {
    e.preventDefault();
    const h4 = document.getElementById("h4");
    maximumNumber = Number(maximumInput.value);
    if (maximumNumber > 10) {
      targetNumber = Math.floor(Math.random() * (maximumNumber + 1));
      totalChances = Math.floor(Math.log2(maximumNumber)) + 1;
      chancesSpan.textContent = totalChances;
      stage1.classList.toggle("d-none");
      stage2.classList.toggle("d-none");
    } else if (maximumNumber < 10) {
      h4.innerHTML = `<h4 class="text-danger">عدد وارد شده باید بزرگ تر از 10 باشد</h4>`;
      maximumInput.select();
    } else {
      h4.innerHTML = `<h4 class="text-danger">فقط کارکتری عددی مجاز میباشد </h4>`;
      maximumInput.select();
    }
    guessInput.focus();
  }
  const showStatus = document.getElementById("status");

  guessButton.addEventListener("click", guess);
  function guess(event) {
    event.preventDefault();
    let yourGuess = parseInt(guessInput.value);
    let remainingChances;

    switch (true) {
      case yourGuess == targetNumber:
        stage2.innerHTML = `<h4 class="text-bg-success p-1">تبریک شما موفق شدید عدد <span class="text-bg-warning px-1">${targetNumber}</span> را به درستی حدس بزنید</h4>`;
        return;
        break;
      case yourGuess > maximumNumber:
        alert("حدس شما نمیتواند از حد بالا که تعیین کردید بزرگ تر باشد");
        guessInput.select();
        return;
        break;
      case yourGuess < 0:
        alert("عدد منفی مجاز نمی باشد");
        guessInput.select();

        return;
        break;
      case yourGuess > targetNumber:
        showStatus.innerHTML += ` <span class="text-danger p-2 rounded bg-white">${yourGuess}</span> `;
        break;

      case yourGuess < targetNumber:
        showStatus.innerHTML += ` <span class="text-primary p-2 rounded bg-white">${yourGuess}</span> `;
        break;

      case isNaN(yourGuess):
        alert(" فقط عدد صحیح وارد کنید");
        guessInput.select();
        return;
        break;
    }

    remainingChances = Number(chancesSpan.textContent);

    remainingChances--;

    if (remainingChances > 0) {
      chancesSpan.textContent = remainingChances;
    } else {
      stage2.innerHTML = `<h4 class="p-1 text-bg-danger">متاسفانه فرصت شما به پایان رسید! شما نتوانستید عدد  <span class="text-bg-warning px-1">${targetNumber}</span>  را حدس بزنید</h4>`;
    }
    guessInput.value = "";
    guessInput.focus();
  }

  const againBtn = document.getElementById("again");
  againBtn.addEventListener("click", () => {
    document.location.reload();
  });
});
