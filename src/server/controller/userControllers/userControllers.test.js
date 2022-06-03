const bcrypt = require("bcrypt");
const User = require("../../../database/models/User");
const UserRol = require("../../../database/models/UserRol");
const {
  mockUser,
  mockRol,
  mockUserCredentials,
  mockToken,
  mockBadUser,
} = require("../../mocks/mocksUsers");
const { userRegister, userLogin } = require("./userControllers");

jest.mock("../../../database/models/User", () => ({
  findOne: jest.fn().mockResolvedValue(() => mockUserCredentials),
}));

jest.mock("jsonwebtoken", () => ({
  sign: () => mockToken,
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn().mockResolvedValue(() => true),
  hash: jest.fn().mockResolvedValue(() => "mockPasswordEncrypted"),
}));

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

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
      const req = {
        body: mockBadUser,
      };
      const expectedError = new Error("Bad request");

      User.findOne = jest.fn().mockResolvedValue(false);

      await userRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given userLogin function", () => {
  describe("When it's called with correct user credentials", () => {
    test("Then it should call response method status with 200 and method json with a token", async () => {
      // Arrange
      const req = {
        body: {
          id: 1,
          username: "username",
          password: "password",
        },
      };

      const expectedStatus = 200;

      User.findOne = jest.fn().mockResolvedValue(true);

      // Act
      await userLogin(req, res, null);

      // Assert
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });
  });

  describe("When it's called with incorrect username", () => {
    test("Then it should call next method with 'Username or password are worng'", async () => {
      // Arrange
      User.findOne = jest.fn().mockResolvedValue(false);

      const req = {
        body: {
          id: 1,
          username: "menganito",
          password: "password",
        },
      };

      const expectErrorMessage = new Error("Username or password are worng");

      // Act
      await userLogin(req, null, next);

      // Assert
      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });

  describe("When it's called with incorrect password", () => {
    test("Then it should call next method with 'Username or password are worng'", async () => {
      // Arrange
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const req = {
        body: {
          id: 1,
          username: "username",
          password: "incorrectPassword",
        },
      };

      const expectErrorMessage = new Error("Username or password are worng");

      // Act
      await userRegister(req, null, next);

      // Assert
      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });
});
