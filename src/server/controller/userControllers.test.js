const User = require("../../database/models/User");
const { registerUser } = require("./userControllers");

describe("Given a registerUser controller", () => {
  describe("When its called with a inexistent username: name, 'Marta', username 'Marta' and a password '1234'", () => {
    test("Then it should call the responses method json with a 201, and the method json with the message 'New user created succesfully'", async () => {
      User.findOne = jest.fn().mockReturnValue(false);
      User.create = jest.fn().mockResolvedValue(true);

      const expectedStatus = 201;
      const expectedMessage = { msg: "New user created succesfully" };
      const req = {
        body: {
          name: "Marta",
          username: "Marta",
          password: "1234",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const next = jest.fn();

      await registerUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When its called with a existent username: name, 'Marta', username 'Marta' and a password '1234'", () => {
    test("Then it should call the next function with an error", async () => {
      User.findOne = jest.fn().mockReturnValue(true);

      const req = {
        body: {
          name: "Marta",
          username: "Marta",
          password: "1234",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      const errorExpected = new Error();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(errorExpected);
    });
  });

  describe("When its called with an inexistent request body", () => {
    test("Then it should call the next function with an error", async () => {
      const errorExpected = new Error();
      User.findOne = jest.fn().mockReturnValue(errorExpected);

      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
