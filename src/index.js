import allWords from './js/allWords.js';
import Category from './js/Category.js';
import * as stats from './js/stats.js';
import * as game from './js/game.js';
import { REGEX } from './utils/constants.js';

const categoryList = Object.keys(allWords);
let difficultWords;
const mainMenu = document.querySelector('#mainMenu');
const mainMenuButton = document.querySelector('#mainMenuButton');
const modeSwitcher = document.querySelector('label.modeSwitcher');
const main = document.querySelector('main');

const changeModeSwitcher = () => {
  const start = modeSwitcher.querySelector('.start');
  const startWidth = start.offsetWidth;
  const play = modeSwitcher.querySelector('.play');
  const playWidth = play.offsetWidth;
  const train = modeSwitcher.querySelector('.train');
  const trainWidth = train.offsetWidth;
  const end = modeSwitcher.querySelector('.end');
  const endWidth = end.offsetWidth;
  let modeSwitcherWidth;
  if (modeSwitcher.classList.contains('train')) {
    modeSwitcherWidth = startWidth + playWidth + endWidth;
    modeSwitcher.style.width = `${modeSwitcherWidth}px`;
    play.style.transform = `translate3d(${startWidth}px, 0, 0)`;
    train.style.transform = `translate3d(${modeSwitcherWidth}px, 0, 0)`;
  }
  if (modeSwitcher.classList.contains('play')) {
    modeSwitcherWidth = startWidth + trainWidth + endWidth;
    modeSwitcher.style.width = `${modeSwitcherWidth}px`;
    play.style.transform = `translate3d(-${modeSwitcherWidth}px, 0, 0)`;
    train.style.transform = `translate3d(${startWidth}px, 0, 0)`;
  }
};

const switchMode = () => {
  if (modeSwitcher.classList.contains('train')) {
    modeSwitcher.classList.replace('train', 'play');
    main.classList.replace('train', 'play');
    changeModeSwitcher();
    return;
  }
  modeSwitcher.classList.replace('play', 'train');
  main.classList.replace('play', 'train');
  changeModeSwitcher();
};

const createMainMenu = () => {
  const ul = document.createElement('ul');

  const firstItem = document.createElement('li');
  firstItem.classList.add('item', 'main', 'active');
  firstItem.textContent = 'main page';
  ul.append(firstItem);

  for (let i = 0; i < categoryList.length; i += 1) {
    const categoryTitle = categoryList[i];
    const item = document.createElement('li');
    item.classList.add('item', `${categoryTitle.replace(REGEX.WHITESPACES, '-')}`);
    item.textContent = categoryTitle;
    ul.append(item);
  }

  const lastItem = document.createElement('li');
  lastItem.classList.add('item', 'stats');
  lastItem.textContent = 'stats';
  ul.append(lastItem);

  return ul;
};

const createMainPageCard = (category) => {
  const words = Object.keys(allWords[category].cards);
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const cardImage = new Image();
  cardImage.classList.add('cardImage');
  cardImage.src = `./assets/images/${randomWord}.png`;
  cardImage.alt = `${category}`;
  const cardTitle = document.createElement('p');
  cardTitle.className = 'cardTitle';
  cardTitle.textContent = category;
  const card = document.createElement('div');
  card.classList.add('card', `${category.replace(REGEX.WHITESPACES, '-')}`);
  card.append(cardImage, cardTitle);
  return card;
};

const createMainPage = () => {
  const mainPageCards = document.createElement('div');
  mainPageCards.className = 'mainPage';
  for (let i = 0; i < categoryList.length; i += 1) {
    const category = categoryList[i];
    mainPageCards.append(createMainPageCard(category));
  }
  return mainPageCards;
};

const changeMainMenuState = ({ target }) => {
  if (target.className === 'waiting') {
    mainMenu.classList.replace('hidden', 'active');
    mainMenuButton.classList.replace('waiting', 'active');
    mainMenuButton.textContent = '[ close ]';
    return;
  }
  if (target.className === 'active') {
    mainMenu.classList.replace('active', 'hidden');
    mainMenuButton.classList.replace('active', 'waiting');
    mainMenuButton.textContent = '[ menu ]';
    return;
  }
  if (mainMenu.classList.contains('active') && target.closest('.menu') === null) {
    mainMenu.classList.replace('active', 'hidden');
    mainMenuButton.classList.replace('active', 'waiting');
    mainMenuButton.textContent = '[ menu ]';
  }
};

const changePage = (targetPage) => {
  switch (targetPage) {
    case 'main page':
      main.firstElementChild.remove();
      main.append(createMainPage());
      break;
    case 'stats':
      main.firstElementChild.remove();
      main.append(stats.createStatsPage());
      break;
    case 'difficult words':
      main.firstElementChild.remove();
      main.append(difficultWords.createHtml());
      break;
    default:
      main.firstElementChild.remove();
      main.append(allWords[targetPage].createHtml());
      break;
  }
};

const mainClick = (event) => {
  if (main.firstElementChild.classList.contains('mainPage')) {
    if (event.target.classList.contains('card')) {
      const target = event.target.querySelector('.cardTitle').textContent;
      changePage(target);
    }
    if (event.target.classList.contains('cardImage')) {
      const target = event.target.nextSibling.textContent;
      changePage(target);
    }
    if (event.target.classList.contains('cardTitle')) {
      const target = event.target.textContent;
      changePage(target);
    }
  }
  const gameMode = document.querySelector('#modeSwitcher').checked;
  if (event.target.closest('.category') !== null && !gameMode && event.target.className !== 'flipOn' && event.target.className !== 'flipOut') {
    const word = event.target.closest('.card').id;
    stats.increaseTrainClickCounter(word);
  }
  if (event.target.id === 'gameButton') {
    game.initGame();
  }
  if (event.target.id === 'resetButton') {
    stats.resetCounters();
    changePage('stats');
  }
  if (event.target.id === 'repeatDiffButton') {
    const sortedStatsArr = stats.sortStats('failPercentage');
    const wordsToRepeat = {};
    for (let i = 0; i <= 8; i += 1) {
      const element = sortedStatsArr[i];
      if (element.failPercentage === 0) { break; }
      const word = element.title;
      wordsToRepeat[word] = word;
    }
    difficultWords = new Category('difficult words', wordsToRepeat);
    changePage('difficult words');
  }
};

const mainMenuClick = ({ target }) => {
  if (target.tagName === 'LI') {
    const targetPage = target.textContent;
    const items = target.parentNode.querySelectorAll('li');
    for (let i = 0; i < [...items].length; i += 1) {
      const item = [...items][i];
      item.classList.remove('active');
    }
    target.classList.add('active');
    changePage(targetPage);
    mainMenu.classList.replace('active', 'hidden');
    mainMenuButton.classList.replace('active', 'waiting');
    mainMenuButton.textContent = '[ menu ]';
  }
};

const easterEgg = (event) => {
  if (event.code === 'KeyZ') {
    const audio = new Audio('./assets/audio/easterEgg.mp3');
    audio.play();
  }
};

const init = () => {
  changeModeSwitcher();
  mainMenu.append(createMainMenu());
  main.append(createMainPage());
  main.addEventListener('click', mainClick);
  document.querySelector('body').addEventListener('click', changeMainMenuState);
  mainMenu.addEventListener('click', mainMenuClick);
  modeSwitcher.addEventListener('click', switchMode);
  document.addEventListener('keyup', easterEgg);
};

init();
