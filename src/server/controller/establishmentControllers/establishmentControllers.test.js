const path = require("path");
const Establishment = require("../../../database/models/Establishment");
const { rolAdmin, rolUser } = require("../../../database/utils/userRols");
const { mockEstablishment } = require("../../mocks/mockEstablishments");
const {
  getEstablishments,
  deleteEstablishmentById,
  getEstablishmentById,
  createEstablishment,
  editEstablishment,
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
  ]),
  skip: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  count: jest.fn().mockResolvedValue(4),
}));

describe("Given getEstablishments middleware", () => {
  describe("When it receives a request { limit: 2, page: 1}", () => {
    test("Then it should call it's response json method with the establishmentsDataPage1", async () => {
      const reqPage1 = {
        query: { limit: 2, page: 1 },
      };

      const establishmentsDataPage1 = {
        totalEstablishments: 4,
        currentPage: 1,
        nextPage: {
          limit: 2,
          page: 2,
        },
        previousPage: null,
        establishments: [mockEstablishment, mockEstablishment],
      };

      await getEstablishments(reqPage1, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(establishmentsDataPage1);
    });
  });

  describe("When it receives a request { limit: 2, page: 2}", () => {
    test("Then it should call it's response json method with the establishmentsDataPage2", async () => {
      const reqPage1 = {
        query: { limit: 2, page: 2 },
      };

      const establishmentsDataPage2 = {
        totalEstablishments: 4,
        currentPage: 2,
        nextPage: null,
        previousPage: {
          limit: 2,
          page: 1,
        },
        establishments: [mockEstablishment, mockEstablishment],
      };

      await getEstablishments(reqPage1, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(establishmentsDataPage2);
    });
  });

  describe("When it receives a request with no params", () => {
    test("Then it should call it's response json method with the establishmentsData", async () => {
      const req = {
        query: { limit: null, page: null },
      };

      const establishmentsData = {
        totalEstablishments: 4,
        currentPage: 1,
        nextPage: null,
        previousPage: null,
        establishments: [mockEstablishment, mockEstablishment],
      };

      await getEstablishments(req, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(establishmentsData);
    });
  });

  describe("When it receives a request but has an error on finding", () => {
    test("Then it should call it's next method with an error", async () => {
      const req = {
        query: { limit: 10, page: 2 },
      };

      const error = new Error("Couldn't load establishments");

      Establishment.find = jest.fn().mockResolvedValue(null);
      await getEstablishments(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given deleteEstablishmentById middleware", () => {
  describe("When it receives a request with a correct id and correct user rol", () => {
    test("Then it should call it's response json status with 200 and json with the expected object", async () => {
      const req = {
        params: { idEstablishment: 1234 },
        user: {
          username: "pepita",
          userRol: rolAdmin,
        },
      };
      const expectedResponse = {
        msg: "The establishment has been deleted",
      };

      Establishment.findByIdAndDelete = jest.fn().mockResolvedValue(true);
      await deleteEstablishmentById(req, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it receives a request with no param id and correct user rol", () => {
    test("Then it should call it's response json status with 400 and json with  error message 'Bad request'", async () => {
      const req = {
        params: { idEstablishment: null },
        user: {
          username: "pepita",
          userRol: rolAdmin,
        },
      };
      const expectErrorMessage = new Error("Bad request");

      Establishment.findByIdAndDelete = jest.fn().mockResolvedValue(false);
      await deleteEstablishmentById(req, null, next);

      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });

  describe("When it receives a request with no param id", () => {
    test("Then it should call it's response with  error message 'Only administrators can delete an establishment'", async () => {
      const req = {
        params: { idEstablishment: null },
        user: {
          username: "pepitan't",
          userRol: rolUser,
        },
      };
      const expectErrorMessage = new Error(
        "Only administrators can delete an establishment"
      );

      Establishment.findByIdAndDelete = jest.fn().mockResolvedValue(false);
      await deleteEstablishmentById(req, null, next);

      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });
});

describe("Given getEstablishmentById middleware", () => {
  describe("When it's called with a correct establishment id at request", () => {
    test("Then it should call it's response json status with 200 and json with the expected object", async () => {
      const req = {
        params: { idEstablishment: 1234 },
      };
      const expectedResponse = mockEstablishment;

      Establishment.findById = jest.fn().mockResolvedValue(mockEstablishment);
      await getEstablishmentById(req, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it's called with a incorrect establishment id at request", () => {
    test("Then it should call it's next function with 'Bad request'", async () => {
      const req = {
        params: { idEstablishment: 1234 },
      };
      const expectedError = new Error("Bad request");

      Establishment.findById = jest.fn().mockRejectedValue(expectedError);
      await getEstablishmentById(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given createEstablishment middleware", () => {
  describe("When it receives a request with a correct establishment and correct user rol", () => {
    test("Then it should call it's response json status with 200 and json with the expected object", async () => {
      const mockCreatedEstablishment = {
        establishmentType: [
          {
            code: "RES",
            description: "Restaurante",
          },
        ],
        name: "La Canyà Menjars",
        establishmentOffer: [
          {
            code: "DELIVERY",
            description: "A domicilio",
          },
        ],
        adress: "pza puerta, 8",
        municipality: "La Canyada",
        region: "Valencia",
        picture: "images/10-6-2022-16-35-smoliv.jpeg",
        pictureBackup: "imageFirebase.jpeg",
      };
      const req = {
        user: {
          username: "pepita",
          userRol: rolAdmin,
        },
        newImageName: "10-6-2022-16-35-smoliv.jpeg",
        firebaseFileURL: "imageFirebase.jpeg",
        body: {
          establishmentType: "RES",
          name: "La Canyà Menjars",
          establishmentOffer: "DELIVERY",
          adress: "pza puerta, 8",
          municipality: "La Canyada",
          region: "Valencia",
        },
        file: true,
      };
      const expectedResponse = {
        createdEstablishment: {
          establishmentType: [
            {
              code: "RES",
              description: "Restaurante",
            },
          ],
          name: "La Canyà Menjars",
          establishmentOffer: [
            {
              code: "DELIVERY",
              description: "A domicilio",
            },
          ],
          adress: "pza puerta, 8",
          municipality: "La Canyada",
          region: "Valencia",
          picture: "images/10-6-2022-16-35-smoliv.jpeg",
          pictureBackup: "imageFirebase.jpeg",
        },
      };

      Establishment.create = jest
        .fn()
        .mockResolvedValue(mockCreatedEstablishment);
      await createEstablishment(req, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it receives a bad request and correct user rol", () => {
    test("Then it should call it's response json status with 400 and json with  error message 'Bad request'", async () => {
      const req = {
        user: {
          username: "pepita",
          userRol: rolAdmin,
        },
        body: {
          name: "La Canyà Menjars",
          establishmentOffer: "DELIVERY",
        },
        file: false,
      };
      const expectErrorMessage = new Error("Bad request");

      Establishment.create = jest.fn().mockResolvedValue(false);
      await createEstablishment(req, null, next);

      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });

  describe("When it receives a request with no param id", () => {
    test("Then it should call it's response with  error message 'Only administrators can delete an establishment'", async () => {
      const req = {
        user: {
          username: "pepitan't",
          userRol: rolUser,
        },
        body: {
          name: "La Canyà Menjars",
          establishmentOffer: "DELIVERY",
        },
        file: false,
      };
      const expectErrorMessage = new Error(
        "Only administrators can create an establishment"
      );

      await createEstablishment(req, null, next);

      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });
});

describe("Given editEstablishment middleware", () => {
  describe("When it receives a request with a establishment, establishmentId and correct user rol", () => {
    test("Then it should call it's response json status with 200 and json with the expected object", async () => {
      const mockEditedEstablishment = {
        establishmentType: [
          {
            code: "RES",
            description: "Restaurante",
          },
        ],
        name: "La Canyà Menjars",
        establishmentOffer: [
          {
            code: "DELIVERY",
            description: "A domicilio",
          },
        ],
        adress: "pza puerta, 8",
        municipality: "La Canyada",
        region: "Valencia",
        picture: "images/10-6-2022-16-35-smoliv.jpeg",
        pictureBackup: "imageFirebase.jpeg",
      };
      const req = {
        params: { idEstablishment: 1234 },
        user: {
          username: "pepita",
          userRol: rolAdmin,
        },
        body: mockEditedEstablishment,
        file: true,
      };
      const expectedResponse = {
        editedEstablishment: mockEditedEstablishment,
      };

      jest.spyOn(path, "join").mockResolvedValue("image");

      Establishment.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(mockEditedEstablishment);
      await editEstablishment(req, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it receives a bad request and correct user rol", () => {
    test("Then it should call it's response json status with 400 and json with  error message 'Bad request'", async () => {
      const req = {
        user: {
          username: "pepita",
          userRol: rolAdmin,
        },
        body: {},
        params: {},
        file: false,
      };
      const expectErrorMessage = new Error("Bad request");

      Establishment.findByIdAndUpdate = jest.fn().mockResolvedValue(false);
      await editEstablishment(req, null, next);

      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });

  describe("When it receives a request with no param id", () => {
    test("Then it should call it's response with  error message 'Only administrators can delete an establishment'", async () => {
      const req = {
        params: {},
        user: {
          username: "pepitan't",
          userRol: rolUser,
        },
        body: {
          name: "La Canyà Menjars",
          establishmentOffer: "DELIVERY",
        },
        file: false,
      };
      const expectErrorMessage = new Error(
        "Only administrators can edit an establishment"
      );

      await editEstablishment(req, null, next);

      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });
});
