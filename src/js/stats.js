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

export const createStatsPage = () => {
  const statsColumns = [
    'word (translation)',
    'training clicks',
    'correct clicks',
    'wrong clicks',
    'error rate',
  ];

  const div = document.createElement('div');
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  const button = document.createElement('button');

  const statsPage = div.cloneNode();
  statsPage.className = 'statsPage';

  const statsPageTitle = h1.cloneNode();
  statsPageTitle.textContent = 'stats';

  const statsPageHeader = div.cloneNode();
  statsPageHeader.className = 'statsPageHeader';
  for (let i = 0; i < statsColumns.length; i += 1) {
    const column = statsColumns[i];
    const columnHeader = div.cloneNode();
    columnHeader.className = 'columnHeader';
    columnHeader.textContent = column;
    statsPageHeader.append(columnHeader);
  }

  const resetButton = button.cloneNode();
  resetButton.id = 'resetButton';
  resetButton.textContent = '[ reset ]';

  const repeatDiffButton = button.cloneNode();
  repeatDiffButton.id = 'repeatDiffButton';
  repeatDiffButton.textContent = '[ repeat difficult words ]';

  statsPage.append(statsPageTitle, resetButton, repeatDiffButton, statsPageHeader);

  for (let i = 0; i < categoryList.length; i += 1) {
    const category = categoryList[i];
    const categoryBlock = div.cloneNode();
    categoryBlock.className = 'categoryBlock';
    const categoryTitle = h2.cloneNode();
    categoryTitle.textContent = category;
    categoryBlock.append(categoryTitle);
    const words = Object.keys(allWords[category].cards);
    for (let s = 0; s < words.length; s += 1) {
      const word = words[s];
      const wordObj = allWords[category].cards[word];
      const wordLine = div.cloneNode();
      wordLine.className = 'wordLine';
      wordLine.id = word;
      for (let index = 0; index < statsColumns.length; index += 1) {
        const column = statsColumns[index];
        const element = div.cloneNode();
        if (column === 'word (translation)') {
          element.className = 'word';
          element.textContent = `${wordObj.word} (${wordObj.translation})`;
        } else if (column === 'training clicks') {
          element.className = 'training';
          element.textContent = stats[word].trainClickCounter;
        } else if (column === 'correct clicks') {
          element.className = 'correct';
          element.textContent = stats[word].playSuccessCounter;
        } else if (column === 'wrong clicks') {
          element.className = 'wrong';
          element.textContent = stats[word].playFailCounter;
        } else {
          element.className = 'rate';
          element.textContent = stats[word].failPercentage;
        }
        wordLine.append(element);
      }
      categoryBlock.append(wordLine);
    }
    statsPage.append(categoryBlock);
  }
  return statsPage;
};
