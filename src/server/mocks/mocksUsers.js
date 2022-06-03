const { rolUser } = require("../../database/utils/userRols");

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
  username: "marta",
  password: "marta",
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
