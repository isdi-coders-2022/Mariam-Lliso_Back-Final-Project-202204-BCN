const mockEstablishment = [
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
        code: "CAF",
        description: "Cafetería",
      },
    ],
    name: "Menjars",
    cusine: "Dulces",
    adress: "calle recafort, 8",
    municipality: "meliana",
    region: "Valencia",
  },
  {
    establishmentType: [
      {
        code: "RES",
        description: "Restaurante",
      },
    ],
    name: "Menjars",
    cusine: "mediterránea",
    adress: "calle catalunya",
    municipality: "benimaclet",
    region: "Valencia",
  },
  {
    establishmentType: [
      {
        code: "RES",
        description: "Restaurante",
      },
    ],
    name: "Arroz el famos",
    cusine: "mediterránea",
    adress: "pza puerta del sol, 8",
    municipality: "Benidorm",
    region: "Alicante",
  },
];

const mockEstablishmentsData = {
  totalEstablishments: 0,
  currentPage: 1,
  nextPage: null,
  previousPage: null,
  establishments: [],
};

module.exports = {
  mockEstablishment,
  mockEstablishmentsData,
};
