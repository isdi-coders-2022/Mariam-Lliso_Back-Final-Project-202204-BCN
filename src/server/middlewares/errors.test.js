const { errorNotFound, generalServerError } = require("./errors");

describe("Given a errorNotFound function", () => {
  describe("When its invoked", () => {
    test("Then it should call the responses status method with a 404", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedStatus = 404;

      errorNotFound(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When its invoked", () => {
    test("Then it should call the responses json method with a message 'Endpoint not found'", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedMessage = { msg: "Endpoint not found" };

      errorNotFound(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});

describe("Given a generalServerError function", () => {
  describe("When its invoked with an error with no custom status code", () => {
    test("Then it should call the responses status method with a 500", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const error = {};
      const expectedStatus = 500;

      generalServerError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When its invoked with an error with a status code '401' and a message 'User unauthorized'", () => {
    test("Then it should call the responses status method with a 401 and the json method with a message 'User unauthorized'", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const error = {
        statusCode: 401,
        message: "User unauthorized",
      };
      const expectedStatus = 401;
      const expectedMessage = "User unauthorized";

      generalServerError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
