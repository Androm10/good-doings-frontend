export function buildQuery(object: any) {
  let string = '';
  if (!object) {
    return string;
  }

  Object.keys(object)
    .filter((key) => object[key])
    .forEach((key, index) => {
      string += index ? '&' : '';
      string += `${key}=${object[key]}`;
    });
  return string;
}
