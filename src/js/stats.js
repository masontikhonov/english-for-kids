import allWords from './allWords.js';

const categoryList = Object.keys(allWords);

const saveStats = (stats) => {
  localStorage.setItem('stats', JSON.stringify(stats));
};

const loadStats = () => {
  let stats = {};
  if (localStorage.getItem('stats') === null) {
    for (let i = 0; i < categoryList.length; i += 1) {
      const category = categoryList[i];
      const wordList = Object.keys(allWords[category].cards);
      for (let s = 0; s < wordList.length; s += 1) {
        const word = wordList[s];
        stats[word] = {};
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

const stats = loadStats();

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
  calcFailPercentage();
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

export const createStatsPage = () => {
  const statsPage = document.createElement('div');
  statsPage.className = 'statsPage';
  const statsPageTitle = document.createElement('h1');
  statsPageTitle.textContent = 'stats';
  statsPage.append(statsPageTitle);
  for (let i = 0; i < categoryList.length; i += 1) {
    const category = categoryList[i];
    const categoryBlock = document.createElement('div');
    categoryBlock.className = 'categoryBlock';
    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = category;
    categoryBlock.append(categoryTitle);
    const wordList = Object.keys(allWords[category].cards);
    for (let s = 0; s < wordList.length; s += 1) {
      const word = wordList[s];
      const wordObj = allWords[category].cards[word];
      const wordLine = document.createElement('div');
      wordLine.className = 'wordLine';
      const div = document.createElement('div');
      const wordTitle = div.cloneNode();
      wordTitle.textContent = `${wordObj.word} (${wordObj.translation})`;
      const trainClickCounter = div.cloneNode();
      trainClickCounter.textContent = stats[word].trainClickCounter;
      const playSuccessCounter = div.cloneNode();
      playSuccessCounter.textContent = stats[word].playSuccessCounter;
      const playFailCounter = div.cloneNode();
      playFailCounter.textContent = stats[word].playFailCounter;
      const failPercentage = div.cloneNode();
      failPercentage.textContent = stats[word].failPercentage;
      wordLine.append(wordTitle, trainClickCounter, playSuccessCounter, playFailCounter, failPercentage);
      categoryBlock.append(wordLine);
    }
    statsPage.append(categoryBlock);
  }
  return statsPage;
};
