import allWords from './allWords.js';
import { STATS as CONSTANTS } from '../utils/constants.js';

const categoryList = Object.keys(allWords);
const div = document.createElement('div');
const h1 = document.createElement('h1');
const h2 = document.createElement('h2');
const button = document.createElement('button');

const saveStats = (stats) => {
  localStorage.setItem('stats', JSON.stringify(stats));
};

const loadStats = () => {
  let stats = {};
  if (localStorage.getItem('stats') === null) {
    for (let i = 0; i < categoryList.length; i += 1) {
      const category = categoryList[i];
      const words = Object.keys(allWords[category].cards);
      for (let s = 0; s < words.length; s += 1) {
        const word = words[s];
        stats[word] = {};
        stats[word].title = word;
        stats[word].trainClickCounter = 0;
        stats[word].playSuccessCounter = 0;
        stats[word].playFailCounter = 0;
        stats[word].failPercentage = 0;
      }
    }
    saveStats(stats);
  } else {
    stats = JSON.parse(localStorage.getItem('stats'));
  }
  return stats;
};

export const stats = loadStats();

export const increaseTrainClickCounter = (word) => {
  stats[word].trainClickCounter += 1;
  saveStats(stats);
};

const calcFailPercentage = (word) => {
  const totalPlayClicks = stats[word].playSuccessCounter + stats[word].playFailCounter;
  stats[word].failPercentage = Math.round((stats[word].playFailCounter * 100) / totalPlayClicks);
};

export const increasePlaySuccessCounter = (word) => {
  stats[word].playSuccessCounter += 1;
  calcFailPercentage(word);
  saveStats(stats);
};

export const increasePlayFailCounter = (word) => {
  stats[word].playFailCounter += 1;
  calcFailPercentage(word);
  saveStats(stats);
};

export const resetCounters = () => {
  const words = Object.keys(stats);
  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    stats[word].trainClickCounter = 0;
    stats[word].playSuccessCounter = 0;
    stats[word].playFailCounter = 0;
    stats[word].failPercentage = 0;
  }
  saveStats(stats);
};

export const sortStats = (value) => {
  const statsForSort = Object.values(stats);
  const result = statsForSort.sort((a, b) => b[value] - a[value]);
  return result;
};

const createStatsPageHeader = () => {
  const statsPageHeader = div.cloneNode();
  statsPageHeader.className = 'statsPageHeader';

  const buttonsBlock = div.cloneNode();
  buttonsBlock.className = 'buttonsBlock';
  const resetButton = button.cloneNode();
  resetButton.id = 'resetButton';
  resetButton.textContent = CONSTANTS.RESET_BUTTON;
  const repeatDiffButton = button.cloneNode();
  repeatDiffButton.id = 'repeatDiffButton';
  repeatDiffButton.textContent = CONSTANTS.REPEAT_DIFF_BUTTON;
  buttonsBlock.append(resetButton, repeatDiffButton);
  statsPageHeader.append(buttonsBlock);
  for (let i = 0; i < CONSTANTS.COLUMN_HEADINGS.length; i += 1) {
    const column = CONSTANTS.COLUMN_HEADINGS[i];
    const columnHeader = div.cloneNode();
    columnHeader.className = 'columnHeader';
    columnHeader.textContent = column;
    statsPageHeader.append(columnHeader);
  }
  return statsPageHeader;
};

export const createStatsPage = () => {
  const statsPage = div.cloneNode();
  statsPage.className = 'statsPage';
  const statsPageTitle = h1.cloneNode();
  statsPageTitle.textContent = 'stats';
  const statsPageHeader = createStatsPageHeader();
  statsPage.append(statsPageTitle, statsPageHeader);

  for (let i = 0; i < categoryList.length; i += 1) {
    const category = categoryList[i];
    statsPage.append(allWords[category].createStatsHtml());
  }

  const words = Object.keys(stats);
  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    statsPage.querySelector(`#${word} > .training`).textContent = stats[word].trainClickCounter;
    statsPage.querySelector(`#${word} > .correct`).textContent = stats[word].playSuccessCounter;
    statsPage.querySelector(`#${word} > .wrong`).textContent = stats[word].playFailCounter;
    statsPage.querySelector(`#${word} > .rate`).textContent = stats[word].failPercentage;
  }
  return statsPage;
};
