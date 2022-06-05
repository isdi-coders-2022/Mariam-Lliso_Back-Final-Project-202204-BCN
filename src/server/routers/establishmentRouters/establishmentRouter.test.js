require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../index");
const connectDatabase = require("../../../database");
const Establishment = require("../../../database/models/Establishment");
const {
  mockEstablishment,
  mockEstablishmentsData,
} = require("../../mocks/mockEstablishments");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDatabase(mongoServer.getUri());
});

beforeEach(async () => {});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Establishment.deleteMany({});
});

describe("Given a GET '/establishments/list' endpoint", () => {
  describe("When in recieves a request and the resource it's found on the server", () => {
    test("Then it should respond with status 200 and a list of establishments", async () => {
      const { body } = await request(app)
        .get("/establishments/list/?page=1&limit=2")
        .expect(200);

      expect(body).toEqual(mockEstablishmentsData);
    });
  });
});
