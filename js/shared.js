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
function encodeBase64(string) {
  return btoa(unescape(encodeURIComponent(string)));
}

function turnObjectIntoSafeURI(object) {
  console.log("turning it into a safe uri")
  const stringify = JSON.stringify(object);
  console.log("stringify", stringify)
  return encodeURIComponent(stringify);
}

export function encodeDataToURI(object) {

  const encoded = turnObjectIntoSafeURI(object);
  const base64 = encodeBase64(encoded);

  console.log("encoded", base64)

  return base64;
}


function decodeBase64(base64) {
  return decodeURIComponent(escape(atob(base64)));
}

function containsEncodedComponents(x) {
  // ie ?,=,&,/ etc
  return (decodeURI(x) !== decodeURIComponent(x));
}

function turnSafeURIIntoObject(safeURI) {

  console.log("inside turnSafeURIIntoObject")
  // if false exit
  let base64 = decodeBase64(safeURI);
  let unstringify;


  try {    
    // check if contains uriComponent
    if (!containsEncodedComponents(base64)) throw 'URL param is not properly encoded';
    unstringify = JSON.parse(decodeURIComponent(base64));

  } catch (error) {
    console.warn(error)
    unstringify = "";

  }

  console.log("returning unstringify", unstringify)
  return unstringify;

}

export function decodeURIToData(uri) {
  // console.log("decoding URI to data")
  const json = turnSafeURIIntoObject(uri);
  console.log("json", json)
  // const decoded = decodeBase64(json);
  // console.log("decoded", decoded)

  return (typeof json === 'object') ? json : {} ;
}


// export function encodeDataToURL(data) {
//   return Object
//     .keys(data)
//     .map(value => `${value}=${encodeURIComponent(data[value])}`)
//     .join('&');
// }

