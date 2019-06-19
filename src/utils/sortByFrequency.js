export default (array, count) => {
  const frequency = {};

  array.forEach(key => {
    frequency[key] = 0;
  });

  const uniques = array.filter(key => ++frequency[key] == 1);

  return uniques
    .sort((a, b) => frequency[b.key] - frequency[a.key])
    .slice(0, count);
};
