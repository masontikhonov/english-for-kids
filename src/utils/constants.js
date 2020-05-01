export const REGEX = {
  WHITESPACES: /\s+/g,
  DASH: /-/g,
};

export const GAME = {
  GAME_BUTTON_WAITING: '[ start game! ]',
  GAME_BUTTON_ACTIVE: '[ repeat the word ]',
  CORRECT_SYMBOL: '✔️',
  ERROR_SYMBOL: '❌',
  GAME_RESULT_TEXT: (errors) => {
    let output;
    switch (errors) {
      case 0:
        output = 'Congratulations!';
        break;
      default:
        output = `Unfortunately, you have ${errors} errors.`;
        break;
    }
    return output;
  },
};

export const STATS = {
  RESET_BUTTON: '[ reset ]',
  REPEAT_DIFF_BUTTON: '[ repeat difficult words ]',
  COLUMN_HEADINGS: [
    'word (translation)',
    'training clicks',
    'correct clicks',
    'wrong clicks',
    'error rate',
  ],
};
