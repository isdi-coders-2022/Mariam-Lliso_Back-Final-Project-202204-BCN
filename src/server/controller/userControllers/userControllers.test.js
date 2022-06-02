const User = require("../../../database/models/User");
const UserRol = require("../../../database/models/UserRol");
const { mockUser, mockRol } = require("../../mocks/mocksUsers");
const userRegister = require("./userControllers");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue(() => "mockPasswordEncrypted"),
}));

const next = jest.fn();

describe("Given a userRegister function", () => {
  describe("When it's called with a new name, username and password", () => {
    test("Then it should call the response method status with 201 and it's json method with the message 'User created'", async () => {
      const expectedMessage = { msg: "User created" };

      const req = {
        body: mockUser,
      };

      const expectedStatus = 201;

      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockResolvedValue(mockUser);
      UserRol.findOne = jest.fn().mockResolvedValue(mockRol);

      await userRegister(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it's called with an existing username", () => {
    test("Then it should call next with an error", async () => {
      const expectedError = new Error("User already exists");
      const req = {
        body: mockUser,
      };
      User.findOne = jest.fn().mockResolvedValue(true);

      await userRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's invoked an a error occurs", () => {
    test("Then it should call next with an error", async () => {
      const expectedError = new Error("Bad request");
      const req = {
        body: mockUser,
      };

      User.findOne = jest.fn().mockRejectedValue(expectedError);

      await userRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
