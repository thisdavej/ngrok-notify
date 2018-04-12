// Leveraged https://stackoverflow.com/a/31839509 and modified slightly

module.exports = (str, o) => {
  return str.replace(/{([^{}]*)}/g, (a, b) => {
    const r = o[b];
    return typeof r === 'string' || typeof r === 'number' ? r : a;
  });
};
