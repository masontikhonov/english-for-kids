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
  }

  createHtml() {
    const categoryHtml = document.createElement('div');
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
