const getActualDateAndTime = () => {
  const actualDate = new Date();

  const day = actualDate.getDate();
  const month = actualDate.getMonth() + 1;
  const year = actualDate.getFullYear();

  const dateFormatString = `${day}-${month}-${year}`;

  return dateFormatString;
};

module.exports = {
  getActualDateAndTime,
};
