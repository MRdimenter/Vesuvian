export function convertObjectToArray(obj) {
  const keys = Object.getOwnPropertyNames(obj);
  const resultArray = keys.map(key => [key, obj[key]]);
  return resultArray;
}