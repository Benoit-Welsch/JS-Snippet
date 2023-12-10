import mergeWith from 'lodash.mergewith';

export const dot = (data: string, conflictChar = '_') => {
  if (!data) throw new Error('No data provided');
  // Global oject (returned by the function)
  const res = {};
  // Array of line
  data.split('\n').forEach((line) => {
    if (!line) return;
    // Separate value from key object
    const [keys, value] = line.split(':');
    // Array of key object
    const splitted = keys.split('.');
    // Object containing key and value to merge to global object
    let valueForKey: string | object = value.trimStart().trimEnd();
    // Create Object from Array of key object
    for (let keyIndex = splitted.length - 1; keyIndex >= 0; keyIndex--) {
      valueForKey = { [splitted[keyIndex]]: valueForKey };
    }
    // Deep merge with conflict detection
    mergeWith(
      res,
      valueForKey,
      (objValue: string | object, srcValue: object) => {
        if (
          objValue &&
          typeof objValue !== 'object' &&
          !Array.isArray(objValue)
        ) {
          return { [`${conflictChar}value`]: objValue, ...srcValue };
        }
        return undefined;
      },
    );
  });
  return res;
};

export default dot;
