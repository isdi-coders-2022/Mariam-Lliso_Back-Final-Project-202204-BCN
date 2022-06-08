require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../index");
const connectDatabase = require("../../../database");

const User = require("../../../database/models/User");
const {
  newMockUser,
  mockUserWithId,
  mockRolWithoutId,
} = require("../../mocks/mocksUsers");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDatabase(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  jest.clearAllMocks();
  await request(app).post("/user/register").send(newMockUser).expect(201);
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("Given a GET user/profile endpoint", () => {
  describe("When it receives a request with a registered user", () => {
    test("Then it should respond with a 200 status and a user profile data", async () => {
      User.findOne = jest.fn(() => ({
        populate: jest.fn().mockReturnValue(mockUserWithId),
      }));

      jwt.verify = jest.fn().mockResolvedValue("tokencito");

      const expectUserData = {
        name: mockUserWithId.name,
        username: mockUserWithId.username,
        userRol: mockRolWithoutId,
      };

      const { body } = await request(app)
        .get("/user/profile")
        .set("Authorization", "Bearer 1234")
        .expect(200);

      expect(body).toEqual(expectUserData);
    });
  });
});
