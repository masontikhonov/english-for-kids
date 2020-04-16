export default class Word {
  constructor(word, translation) {
    this.word = word;
    this.translation = translation;
    this.imgSrc = `./assets/images/${word}.png`;
    this.audioSrc = `./assets/audio/${word}.mp3`;
    this.trainClickCounter = 0;
    this.playSuccessCounter = 0;
    this.playFailCounter = 0;
    this.failPercentage = 0;
  }

  createHtml() {
    const cardFrontImg = new Image();
    cardFrontImg.classList.add('cardImage');
    cardFrontImg.src = `${this.imgSrc}`;
    cardFrontImg.alt = `${this.word}`;
    const cardBackImg = cardFrontImg.cloneNode();
    const cardAudio = new Audio(`${this.audioSrc}`);
    cardAudio.classList.add('audio');
    const cardFrontText = document.createElement('p');
    cardFrontText.textContent = this.word;
    const cardBackText = document.createElement('p');
    cardBackText.textContent = this.translation;
    const cardFront = document.createElement('div');
    cardFront.classList.add('front');
    cardFront.append(cardFrontImg, cardFrontText, cardAudio);
    const cardBack = document.createElement('div');
    cardBack.classList.add('back');
    cardBack.append(cardBackImg, cardBackText);
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', `card_${this.word}`);
    const inner = document.createElement('div');
    inner.classList.add('inner');
    inner.append(cardFront, cardBack);
    card.append(inner);
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
