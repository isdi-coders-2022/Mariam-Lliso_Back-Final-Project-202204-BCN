const { notFoundError, generalError } = require("./errors");

describe("Given an notFoundError function", () => {
  describe("When its invoked", () => {
    test("Then it should call the next function with an error", () => {
      const nextFunction = jest.fn();
      const error = new Error();

      notFoundError(null, null, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given an generalError function", () => {
  describe("When its invoked with an empty error", () => {
    test("Then it should call the responses status method with a 500", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedError = 500;
      const error = {};

      generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedError);
    });
  });
});
