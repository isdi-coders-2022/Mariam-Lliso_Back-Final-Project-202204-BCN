const { rolUser, rolAdmin } = require("../../database/utils/userRols");

const mockUsers = [
  {
    name: "marto",
    username: "marto",
    password: "marto",
    userRol: rolUser,
  },
  {
    name: "marta",
    username: "marta",
    password: "marta",
    userRol: rolUser,
  },
];

const mockUser = {
  name: "marta",
  username: "marta",
  password: "marta",
  userRol: rolUser,
};

const mockBadUser = {
  mane: "Evil Mario",
};

const newMockUser = {
  name: "johndoe",
  surnames: "y sus monyecos",
  username: "johndoe",
  password: "johndoe",
  userRol: rolAdmin,
};

const mockRol = {
  code: "USR",
  description: "Usuario/a",
  id: "6295c9304bab9e5540ff8fc8",
};

const mockRolWithoutId = {
  code: "USR",
  description: "Usuario/a",
};

const mockUserWithId = {
  id: 1,
  name: "marta",
  username: "marta",
  password: "marta",
  userRol: mockRol,
};

const mockToken = "";

const mockUserCredentials = {
  username: "johndoe",
  password: "johndoe",
};

module.exports = {
  mockUsers,
  mockUser,
  newMockUser,
  mockRol,
  mockToken,
  mockUserCredentials,
  mockBadUser,
  mockUserWithId,
  mockRolWithoutId,
};
