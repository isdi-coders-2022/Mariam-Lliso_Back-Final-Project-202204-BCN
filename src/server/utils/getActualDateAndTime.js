const getActualDateAndTime = () => {
  const actualDate = new Date();

  const day = actualDate.getDate();
  const month = actualDate.getMonth() + 1;
  const year = actualDate.getFullYear();
  const hours = actualDate.getHours();
  const minutes = actualDate.getMinutes();

  return `${day}-${month}-${year}-${hours}-${minutes}`;
};

module.exports = {
  getActualDateAndTime,
};
