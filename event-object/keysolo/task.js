class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener('keydown', e => {
      let eCode = e.key.charCodeAt();
      if ((!['Control', 'Alt', 'Shift'].includes(e.key)) &&
          (eCode > 96 && eCode < 123 || eCode > 64 && eCode < 91 ||
          eCode > 1039 && eCode < 1104 || eCode > 47 && eCode < 58 ||
          eCode === 32 || eCode === 1105 || eCode === 1025)) {
        if (e.key.toLowerCase() === this.currentSymbol.textContent.toLowerCase()) {
          this.success();
        } else {
          this.fail();
        }
      }
    });
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    clearInterval(this.setIntervalId);
    const word = this.getWord();
    this.renderWord(word);  

    let secondsCounter = word.length - 1;
    this.setIntervalId = setInterval(() => {
      if (secondsCounter > 0) {
        secondsCounter -= 1;
      } else {
        this.fail();
      }
    }, 1000);
  }

  getWord() {
    const words = [
        'я bob',
        'я awesome',
        'я netology',
        'я hello',
        'я kitty',
        'я rock',
        'я youtube',
        'я люблю popcorn',
        'Моё cinema',
        'я love',
        'я javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

