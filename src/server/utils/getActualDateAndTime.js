const getActualDateAndTime = () => {
  const actualDate = new Date();

  const day = actualDate.getDate();
  const month = actualDate.getMonth() + 1;
  const year = actualDate.getFullYear();
  const hours = actualDate.getHours();
  const minutes = actualDate.getMinutes();

  const dateFormatString = `${day}-${month}-${year}-${hours}-${minutes}`;

  return dateFormatString;
};

module.exports = {
  getActualDateAndTime,
};
