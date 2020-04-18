export default class Word {
  constructor(word, translation) {
    this.word = word;
    this.translation = translation;
    this.imgSrc = `./assets/images/${word}.png`;
    this.audio = new Audio(`./assets/audio/${word}.mp3`);
    this.trainClickCounter = 0;
    this.playSuccessCounter = 0;
    this.playFailCounter = 0;
    this.failPercentage = 0;
    this.cardClick = ({ target }) => {
      const gameMode = document.querySelector('#modeSwitcher').checked;
      const card = target.closest('.card');
      if (!gameMode && target.className !== 'flipOn' && target.className !== 'flipOut') {
        this.audio.play();
        this.increaseTrainClickCounter();
      }
      if (!gameMode && target.className === 'flipOn') {
        card.classList.add('flipped');
      }
      if (!gameMode && target.className === 'flipOut') {
        card.classList.remove('flipped');
      }
    };
    this.cardMouseLeave = ({ target }) => {
      target.classList.remove('flipped');
    };
  }

  createHtml() {
    const cardFrontImg = new Image();
    cardFrontImg.classList.add('cardImage');
    cardFrontImg.src = `${this.imgSrc}`;
    cardFrontImg.alt = `${this.word}`;
    const cardBackImg = cardFrontImg.cloneNode();
    const flipOn = document.createElement('span');
    const flipOut = flipOn.cloneNode();
    flipOn.className = 'flipOn';
    flipOn.textContent = '\u21bb';
    flipOut.className = 'flipOut';
    flipOut.textContent = '\u21ba';
    const cardFrontText = document.createElement('p');
    cardFrontText.textContent = this.word;
    const cardBackText = document.createElement('p');
    cardBackText.textContent = this.translation;
    const cardFront = document.createElement('div');
    cardFront.classList.add('front');
    cardFront.append(cardFrontImg, cardFrontText, flipOn);
    const cardBack = document.createElement('div');
    cardBack.classList.add('back');
    cardBack.append(cardBackImg, cardBackText, flipOut);
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', `${this.word}`);
    const inner = document.createElement('div');
    inner.classList.add('inner');
    inner.append(cardFront, cardBack);
    card.append(inner);

    card.onclick = this.cardClick;
    card.onmouseleave = this.cardMouseLeave;
    return card;
  }

  calcFailPercentage() {
    const totalPlayClicks = this.playSuccessCounter + this.playFailCounter;
    this.failPercentage = (this.playFailCounter * 100) / totalPlayClicks;
  }

  increaseTrainClickCounter() {
    this.trainClickCounter += 1;
  }

  increasePlaySuccessCounter() {
    this.playSuccessCounter += 1;
    this.calcFailPercentage();
  }

  increasePlayFailCounter() {
    this.playFailCounter += 1;
    this.calcFailPercentage();
  }

  resetCounters() {
    this.trainClickCounter = 0;
    this.playSuccessCounter = 0;
    this.playSuccessCounter = 0;
    this.failPercentage = 0;
  }
}
