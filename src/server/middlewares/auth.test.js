const jwt = require("jsonwebtoken");
const auth = require("./auth");

describe("Given a auth function", () => {
  describe("When it receives a request with a valid authorization but invalid token", () => {
    test("Then it should call the received next function with a custom error 'Invalid token'", () => {
      const expectedCustomError = new Error("Invalid token");
      const req = {
        headers: {
          authorization: "Bearer noValidToken",
        },
      };

      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });

  describe("When it receives a request with a authorization withouth 'Bearer '", () => {
    test("Then it should call the received next function with a custom error 'Invalid Authorization'", () => {
      const expectedCustomError = new Error("Invalid Authorization");
      const req = {
        headers: {
          authorization: "12345",
        },
      };
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });

  describe("When its invoked with a valid token", () => {
    test("Then it should call the next function", () => {
      const req = {
        headers: {
          authorization: "Bearer ",
        },
      };

      jwt.verify = jest.fn().mockReturnValue({
        userData: { id: "qwertyuiop123456" },
      });

      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
