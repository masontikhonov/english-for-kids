import Card from './Word.js';
import * as CONSTANTS from '../utils/constants.js';

export default class Category {
  constructor(title, wordList) {
    this.title = title;
    this.cards = {};
    const words = Object.keys(wordList);
    for (let i = 0; i < words.length; i += 1) {
      const word = words[i];
      this.cards[word] = new Card(word, wordList[word]);
    }
  }

  createHtml() {
    const categoryHtml = document.createElement('div');

    const title = document.createElement('h1');
    title.textContent = this.title;
    categoryHtml.append(title);

    const button = document.createElement('button');
    button.id = 'gameButton';
    button.className = 'waiting';
    button.textContent = CONSTANTS.GAME.GAME_BUTTON_WAITING;
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
    categoryHtml.id = this.title.replace(CONSTANTS.REGEX.WHITESPACES, '-');
    return categoryHtml;
  }
}
