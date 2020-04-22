import allWords from './allWords.js';
import * as stats from './stats.js';

export const finishGame = (errorCounter) => {
  const main = document.querySelector('main');
  main.firstElementChild.remove();
  const gameResult = document.createElement('div');
  gameResult.className = 'gameResult';
  const resultText = document.createElement('h1');
  const resultImage = new Image();
  const resultAudio = new Audio();
  if (errorCounter === 0) {
    resultAudio.src = './assets/audio/success.mp3';
    resultImage.src = './assets/images/party.png';
    resultText.textContent = 'Congratulations!';
  } else {
    resultAudio.src = './assets/audio/failure.mp3';
    resultImage.src = './assets/images/fire.png';
    resultText.textContent = `Unfortunately, you have ${errorCounter} errors.`;
  }
  gameResult.append(resultText, resultImage);
  main.append(gameResult);
  resultAudio.play();
  setTimeout(() => {
    location.reload();
  }, 5000);
};

const startGame = () => {
  const category = document.querySelector('.category').id;
  const words = Object.keys(allWords[category].cards);
  const wordsToPlay = words;
  let errorCounter = 0;
  let currentWord;
  const newWord = () => {
    if (wordsToPlay.length !== 0) {
      currentWord = wordsToPlay[Math.floor(Math.random() * words.length)];
      const i = wordsToPlay.indexOf(currentWord);
      wordsToPlay.splice(i, 1);
      allWords[category].cards[currentWord].audio.play();
      return;
    }
    finishGame(errorCounter);
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
    stats.increasePlaySuccessCounter(currentWord);
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
    stats.increasePlayFailCounter(currentWord);
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
      allWords[category].cards[currentWord].audio.play();
    }
  };
  newWord();
  document.querySelector('.category').addEventListener('click', detectClick);
};

export const initGame = () => {
  const gameButton = document.querySelector('#gameButton');
  if (gameButton.className === 'waiting') {
    gameButton.className = 'active';
    gameButton.textContent = '[ repeat the word ]';
    startGame();
  }
};
