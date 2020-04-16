import dictionary from './dictionary.js';
import Category from './Category.js';

const allWords = {};

const categoryList = Object.keys(dictionary);
for (let i = 0; i < categoryList.length; i += 1) {
  const categoryTitle = categoryList[i];
  allWords[categoryTitle] = new Category(categoryTitle, dictionary[categoryTitle]);
}

export default allWords;
