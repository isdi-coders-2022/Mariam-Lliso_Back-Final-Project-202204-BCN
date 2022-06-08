const mockEstablishments = [
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
  {
    establishmentType: [
      {
        code: "HOT",
        description: "Hotel",
      },
    ],
    name: "Menjars",
    cusine: "mediterránea",
    adress: "calle catalunya",
    municipality: "benimaclet",
    region: "Mallorca",
  },
  {
    establishmentType: [
      {
        code: "OBR",
        description: "Obrador",
      },
    ],
    name: "Arroz el famos",
    cusine: "Italiana",
    adress: "pza puerta del sol, 8",
    municipality: "Benidorm",
    region: "Alicante",
  },
];

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
    adress: "pza puerta, 8",
    municipality: "La Canyada",
    region: "Valencia",
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
  mockEstablishments,
  mockEstablishment,
  mockEstablishmentsData,
};
