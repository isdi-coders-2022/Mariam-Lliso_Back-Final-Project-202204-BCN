const fs = require("fs");
const path = require("path");
const saveImages = require("./saveImages");

jest.mock("firebase/storage", () => ({
  ref: jest.fn().mockReturnValue("ref"),
  uploadBytes: jest.fn().mockResolvedValue({}),
  getStorage: jest.fn(),
  getDownloadURL: jest.fn().mockResolvedValue("url"),
}));

jest.mock("../utils/getActualDateAndTime", () => ({
  getActualDateAndTime: jest.fn().mockReturnValue("26-11-1995"),
}));

const next = jest.fn();

describe("Given a imageConverter middleware", () => {
  describe("When it receives a request with a file and the readFile fails", () => {
    test("Then it should call the next received function", async () => {
      const req = { file: { filename: "file" } };

      jest.spyOn(path, "join").mockReturnValue(path.join("uploads", "images"));

      jest
        .spyOn(fs, "rename")
        .mockImplementation((oldpath, newpath, callback) => {
          callback();
        });

      jest.spyOn(fs, "readFile").mockImplementation((pathToRead, callback) => {
        callback("readFileError");
      });

      await saveImages(req, null, next);

      expect(next).toHaveBeenCalledWith("readFileError");
    });
  });

  describe("When it receives a request with a file and the rename fails", () => {
    test("Then it should call the next received function", async () => {
      const req = { file: { filename: "file" } };

      jest.spyOn(path, "join").mockReturnValue(path.join("uploads", "images"));

      jest
        .spyOn(fs, "rename")
        .mockImplementation((oldpath, newpath, callback) => {
          callback("renameError");
        });

      await saveImages(req, null, next);

      expect(next).toHaveBeenCalledWith("renameError");
    });
  });

  describe("When it receives a request with no file", () => {
    test("Then it should call the next received function", async () => {
      const req = { file: null };

      await saveImages(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
