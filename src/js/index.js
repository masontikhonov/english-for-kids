import allWords from './allWords.js';

const categoryList = Object.keys(allWords);
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
    changeModeSwitcher();
    return;
  }
  if (modeSwitcher.classList.contains('play')) {
    modeSwitcher.classList.replace('play', 'train');
    changeModeSwitcher();
  }
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
    item.classList.add('item', `${categoryTitle.replace(/\s+/g, '-')}`);
    item.textContent = categoryTitle;
    ul.append(item);
  }

  const lastItem = document.createElement('li');
  lastItem.classList.add('item', 'stats');
  lastItem.textContent = 'stats';
  ul.append(lastItem);

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
    cardTitle.className = 'cardTitle';
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
  if (targetPage === 'main page') {
    main.firstElementChild.remove();
    main.append(createMainPage());
  } else if (targetPage === 'stats') {
    main.firstElementChild.remove();
    main.append(createStatsPage());
  } else {
    main.firstElementChild.remove();
    main.append(allWords[targetPage].createHtml());
  }
};

const mainClick = (event) => {
  const etcl = event.target.classList;
  if (main.firstElementChild.classList.contains('mainPage')) {
    if (etcl.contains('card')) {
      const target = event.target.querySelector('.cardTitle').textContent;
      changePage(target);
    }
    if (etcl.contains('cardImage')) {
      const target = event.target.nextSibling.textContent;
      changePage(target);
    }
    if (etcl.contains('cardTitle')) {
      const target = event.target.textContent;
      changePage(target);
    }
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

changeModeSwitcher();
mainMenu.append(createMainMenu());
main.append(createMainPage());

main.addEventListener('click', mainClick);
document.querySelector('body').addEventListener('click', changeMainMenuState);
mainMenu.addEventListener('click', mainMenuClick);
modeSwitcher.addEventListener('click', switchMode);
document.addEventListener('keyup', easterEgg);
