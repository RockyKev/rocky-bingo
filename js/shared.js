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

// https://stackoverflow.com/a/45844934/4096078
export function encodeBase64(string) {
  return window.btoa(unescape(encodeURIComponent(string)));
}

export function decodeBase64(base64) {
  return decodeURIComponent(escape(window.atob(base64)));
}

export function encodeDataToURL(data) {
  return Object
    .keys(data)
    .map(value => `${value}=${encodeURIComponent(data[value])}`)
    .join('&');
}
