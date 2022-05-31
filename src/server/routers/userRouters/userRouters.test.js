require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../index");
const connectDatabase = require("../../../database");

const User = require("../../../database/models/User");
const { newMockUser } = require("../../mocks/mocksUsers");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDatabase(mongoServer.getUri());
});

beforeEach(async () => {
  await request(app).post("/user/register").send(newMockUser).expect(201);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a POST 'user/register' endpoint", () => {
  describe("When it receives a request with valid name, username and password", () => {
    test("Then it should respond with status 201 and message 'User created'", async () => {
      const expectedMessage = "User created";
      const newUser = {
        name: "johndoe",
        username: "johndoe",
        password: "johndoe",
      };

      const { body } = await request(app)
        .post("/user/register")
        .send(newUser)
        .expect(201);

      expect(body.msg).toBe(expectedMessage);
    });
  });

  describe("When it receives a request with username that already exists", () => {
    test("Then it should respond with status 409 and message 'User already exists'", async () => {
      const expectedMessage = "User already exists";

      const { body } = await request(app)
        .post("/user/register")
        .send(newMockUser)
        .expect(409);

      expect(body).toBe(expectedMessage);
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should respond with status 409 and message 'Validation Failed'", async () => {
      const expectedMessage = "Validation Failed";

      const { body } = await request(app)
        .post("/user/register")
        .send({})
        .expect(400);

      expect(body).toBe(expectedMessage);
    });
  });
});
