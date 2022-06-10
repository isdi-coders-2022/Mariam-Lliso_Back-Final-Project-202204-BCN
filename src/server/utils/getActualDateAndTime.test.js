const { getActualDateAndTime } = require("./getActualDateAndTime");

beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date(2022, 1, 26, 20, 30));
});

afterAll(() => {
  jest.useRealTimers();
});
describe("Given getActualDateAndTime function", () => {
  describe("When actual date is 2022/1/26 and time is 20:30", () => {
    test("Then it should return a formarted date string like '26-2-2022-20-30'", () => {
      // Arrange
      const expectedDateFormatString = "26-2-2022-20-30";
      // Act
      const resoultDateFormatString = getActualDateAndTime();
      // Assert
      expect(resoultDateFormatString).toBe(expectedDateFormatString);
    });
  });
});
