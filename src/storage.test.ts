import * as storage from "./storage";

test("answer is saved", () => {
  storage.saveAnswer("elephant", false);
  expect(storage.getLastAnswer("elephant").correct).toBe(false);
  expect(storage.getLastAnswer("elephant").time).toBeDefined();
});
