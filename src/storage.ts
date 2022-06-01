let state: any = {};

export function saveAnswer(cardId: string, correct: boolean) {
  state[cardId] = { correct: correct, time: new Date() };
  //to do
}

export function getLastAnswer(cardId: string): {
  correct: boolean;
  time: Date;
} {
  //to do
  return state[cardId];
}
