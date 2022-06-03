const { rolUser } = require("../../database/utils/userRols");

const mockUsers = [
  {
    id: "6287dcfafc0614bd47bc9c4a",
    name: "Mario",
    username: "marioLG",
    password: "CA32A1E4F9CB46B6D99FC627F9EB4AC606BC3474",
    userRol: rolUser,
  },
  {
    id: "6287e11ffc0614bd47bc9c4e",
    name: "Maichol",
    username: "queEsEstoMaicol",
    password: "CA32A1E4F9CB46B8D99FC627F9EB4AC606BC3474",
    userRol: rolUser,
  },
];

const mockUser = {
  name: "Mario",
  surnames: "lgggg",
  username: "marioLG",
  password: "CA32A1E4F9CB46B6D99FC627F9EB4AC606BC3474",
  userRol: rolUser,
};

const mockBadUser = {
  mane: "Evil Mario",
};

const newMockUser = {
  name: "marta",
  username: "marta",
  password: "marta",
  userRol: rolUser,
};

const mockRol = {
  id: "6295c9304bab9e5540ff8fc8",
};

const mockToken = "";

const mockUserCredentials = {
  id: 1,
  username: "username",
  password: "password",
};

module.exports = {
  mockUsers,
  mockUser,
  newMockUser,
  mockRol,
  mockToken,
  mockUserCredentials,
  mockBadUser,
};
