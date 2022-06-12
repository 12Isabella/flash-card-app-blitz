import * as storage from "./storage";

test("answer is saved", () => {
  const cardId = "elephant";
  storage.saveAnswer(cardId, false);
  const lastAnswer = storage.getLastAnswer(cardId);
  expect(lastAnswer.correct).toBe(false);
  expect(lastAnswer.time).toBeDefined();
  const shouldntExist = storage.getLastAnswer("peanut");
  expect(shouldntExist).toBeUndefined();
});
