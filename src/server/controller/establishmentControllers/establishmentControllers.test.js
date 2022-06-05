const Establishment = require("../../../database/models/Establishment");
const { mockEstablishment } = require("../../mocks/mockEstablishments");
const { getEstablishments } = require("./establishmentControllers");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

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
      adress: "pza puerta del sol, 8",
      municipality: "La Canyada",
      region: "Valencia",
    },
    {
      establishmentType: [
        {
          code: "RES",
          description: "Restaurante",
        },
      ],
      name: "La Canyà Menjars",
      cusine: "Cocina mediterránea",
      adress: "pza puerta del sol, 8",
      municipality: "La Canyada",
      region: "Valencia",
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
        establishments: [mockEstablishment[0], mockEstablishment[1]],
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
        establishments: [mockEstablishment[2], mockEstablishment[3]],
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
        nextPage: {
          limit: 2,
          page: 2,
        },
        previousPage: null,
        establishments: [mockEstablishment[0], mockEstablishment[1]],
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
