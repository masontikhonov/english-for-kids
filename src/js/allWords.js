import dictionary from '../utils/dictionary.js';
import Category from './Category.js';

const allWords = () => {
  const result = {};
  const categoryList = Object.keys(dictionary);
  for (let i = 0; i < categoryList.length; i += 1) {
    const categoryTitle = categoryList[i];
    result[categoryTitle] = new Category(categoryTitle, dictionary[categoryTitle]);
  }
  return result;
};

export default allWords();
