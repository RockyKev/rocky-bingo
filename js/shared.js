export function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    // eslint-disable-next-line no-plusplus
    currentIndex--;
    // And swap it with the current element.
    // eslint-disable-next-line no-param-reassign
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  console.log("ive been shuffled");
  return array;
}
