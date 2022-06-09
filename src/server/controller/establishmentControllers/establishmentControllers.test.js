const Establishment = require("../../../database/models/Establishment");
const { mockEstablishments } = require("../../mocks/mockEstablishments");
const {
  getEstablishments,
  deleteEstablishmentById,
} = require("./establishmentControllers");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("../../../database/models/Establishment", () => ({
  ...jest.requireActual("../../../database/models/Establishment"),
  limit: jest.fn().mockResolvedValue([
    {
      establishmentType: [
        {
          code: "RES",
          description: "Restaurante",
        },
      ],
      name: "La Canyà Menjars",
      cusine: "Cocina mediterránea",
      adress: "pza puerta, 8",
      municipality: "La Canyada",
      region: "Valencia",
    },
    {
      establishmentType: [
        {
          code: "CAF",
          description: "Cafetería",
        },
      ],
      name: "Menjars",
      cusine: "Dulces",
      adress: "calle recafort, 8",
      municipality: "meliana",
      region: "Castellon",
    },
  ]),
  skip: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  count: jest.fn().mockResolvedValue(4),
}));

describe("Given getEstablishments middleware", () => {
  describe("When it receives a request { limit: 2, page: 1}", () => {
    test("Then it should call it's response json method with the establishmentsDataPage1", async () => {
      const reqPage1 = {
        params: { limit: 2, page: 1 },
      };

      const establishmentsDataPage1 = {
        totalEstablishments: 2,
        currentPage: 1,
        nextPage: {
          limit: 2,
          page: 2,
        },
        previousPage: null,
        establishments: [mockEstablishments[0], mockEstablishments[1]],
      };

      await getEstablishments(reqPage1, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(establishmentsDataPage1);
    });
  });

  describe("When it receives a request { limit: 2, page: 2}", () => {
    test("Then it should call it's response json method with the establishmentsDataPage2", async () => {
      const reqPage1 = {
        params: { limit: 2, page: 2 },
      };

      const establishmentsDataPage2 = {
        totalEstablishments: 2,
        currentPage: 2,
        nextPage: null,
        previousPage: {
          limit: 2,
          page: 1,
        },
        establishments: [mockEstablishments[0], mockEstablishments[1]],
      };

      await getEstablishments(reqPage1, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(establishmentsDataPage2);
    });
  });

  describe("When it receives a request with no params", () => {
    test("Then it should call it's response json method with the establishmentsData", async () => {
      const req = {
        params: { limit: null, page: null },
      };

      const establishmentsData = {
        totalEstablishments: 2,
        currentPage: 1,
        nextPage: null,
        previousPage: null,
        establishments: [mockEstablishments[0], mockEstablishments[1]],
      };

      await getEstablishments(req, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(establishmentsData);
    });
  });

  describe("When it receives a request but has an error on finding", () => {
    test("Then it should call it's next method with an error", async () => {
      const req = {
        params: { limit: 10, page: 2 },
      };

      const error = new Error("Couldn't load establishments");

      Establishment.find = jest.fn().mockResolvedValue(null);
      await getEstablishments(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given deleteEstablishmentById middleware", () => {
  describe("When it receives a request with a correct id", () => {
    test("Then it should call it's response json status with 200 and json with the expected object", async () => {
      const req = {
        params: { idEstablishment: 1234 },
      };
      const expectedResponse = {
        msg: "The establishment has been deleted",
      };

      Establishment.findOneAndDelete = jest.fn().mockResolvedValue(true);
      await deleteEstablishmentById(req, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it receives a request with no param id", () => {
    test("Then it should call it's response json status with 400 and json with  error message 'Bad request'", async () => {
      const req = { params: { idEstablishment: null } };
      const expectErrorMessage = new Error("Bad request");

      Establishment.findOneAndDelete = jest.fn().mockResolvedValue(false);
      await deleteEstablishmentById(req, null, next);

      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });
});
