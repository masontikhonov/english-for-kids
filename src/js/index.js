import allWords from './allWords.js';

const categoryList = Object.keys(allWords);

const createMainMenu = () => {
  const ul = document.createElement('ul');

  const firstItem = document.createElement('li');
  firstItem.classList.add('menuItem', 'main');
  firstItem.textContent = 'main page';

  for (let i = 0; i < categoryList.length; i += 1) {
    const categoryTitle = categoryList[i];
    const item = document.createElement('li');
    item.classList.add('item', `${categoryTitle.replace(/\s+/g, '-')}`);
    item.textContent = categoryTitle;
    ul.append(item);
  }

  const lastItem = document.createElement('li');
  lastItem.classList.add('menuItem', 'stats');
  lastItem.textContent = 'stats';

  return ul;
};

const createMainPage = () => {
  const mainPageCards = document.createElement('div');
  mainPageCards.className = 'mainPage';
  const createMainPageCard = (category) => {
    const words = Object.keys(allWords[category].cards);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const cardImage = new Image();
    cardImage.classList.add('cardImage');
    cardImage.src = `./assets/images/${randomWord}.png`;
    cardImage.alt = `${category}`;
    const cardTitle = document.createElement('p');
    cardTitle.textContent = category;
    const card = document.createElement('div');
    card.classList.add('card', `${category.replace(/\s+/g, '-')}`);
    card.append(cardImage, cardTitle);
    return card;
  };
  for (let i = 0; i < categoryList.length; i += 1) {
    const category = categoryList[i];
    mainPageCards.append(createMainPageCard(category));
  }
  return mainPageCards;
};

document.querySelector('#mainMenu').append(createMainMenu());
document.querySelector('main').append(createMainPage());
