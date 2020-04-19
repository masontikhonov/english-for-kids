import Card from './Word.js';

export default class Category {
  constructor(title, wordList) {
    this.title = title;
    this.cards = {};
    const words = Object.keys(wordList);
    for (let i = 0; i < words.length; i += 1) {
      const word = words[i];
      this.cards[word] = new Card(word, wordList[word]);
    }
    this.initGame = () => {
      const gameButton = document.querySelector('#gameButton');
      if (gameButton.className === 'waiting') {
        gameButton.className = 'active';
        gameButton.textContent = '[ repeat the word ]';
        this.startGame();
      }
    };
    this.startGame = () => {
      const wordsToPlay = words;
      let errorCounter = 0;
      let currentWord;
      const newWord = () => {
        if (wordsToPlay.length !== 0) {
          currentWord = wordsToPlay[Math.floor(Math.random() * words.length)];
          const i = wordsToPlay.indexOf(currentWord);
          wordsToPlay.splice(i, 1);
          this.cards[currentWord].audio.play();
          return;
        }
        finishGame();
      };
      const correctAudio = new Audio();
      correctAudio.src = './assets/audio/correct.mp3';
      const errorAudio = new Audio();
      errorAudio.src = './assets/audio/error.mp3';
      const ratingBar = document.querySelector('.ratingBar');
      const correct = (card) => {
        const correctSymbol = document.createElement('p');
        correctSymbol.textContent = '✔️';
        ratingBar.append(correctSymbol.cloneNode(true));
        card.classList.add('inactive');
        correctAudio.play();
        this.cards[currentWord].increasePlaySuccessCounter();
        setTimeout(() => {
          newWord();
        }, 3000);
      };
      const error = () => {
        const errorSymbol = document.createElement('p');
        errorSymbol.textContent = '❌';
        ratingBar.append(errorSymbol.cloneNode(true));
        errorCounter += 1;
        errorAudio.play();
        this.cards[currentWord].increasePlayFailCounter();
      };
      const detectClick = ({ target }) => {
        const card = target.closest('.card');
        if (card !== null && !card.classList.contains('inactive')) {
          if (card.id === currentWord) {
            correct(card);
          } else {
            error();
          }
        }
        if (target.id === 'gameButton') {
          this.cards[currentWord].audio.play();
        }
      };
      newWord();
      document.querySelector('.category').addEventListener('click', detectClick);
    };
  }

  createHtml() {
    const categoryHtml = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = this.title;
    categoryHtml.append(title);

    const button = document.createElement('button');
    button.id = 'gameButton';
    button.className = 'waiting';
    button.textContent = '[ start game! ]';
    button.addEventListener('click', this.initGame);
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button', 'wrapper');
    buttonWrapper.append(button);

    const ratingBar = document.createElement('div');
    ratingBar.className = 'ratingBar';

    categoryHtml.append(buttonWrapper, ratingBar);

    const cards = Object.keys(this.cards);
    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i];
      categoryHtml.append(this.cards[card].createHtml());
    }
    categoryHtml.className = 'category';
    categoryHtml.id = this.title;
    return categoryHtml;
  }
}
