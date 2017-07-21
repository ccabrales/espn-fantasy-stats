/* eslint-disable import/prefer-default-export */

/**
 * Check to see if an object is empty
 * @param {Object} obj
 */
export const isEmpty = obj => obj && Object.keys(obj).length === 0 && obj.constructor === Object;

/**
 * Get the value for a given property from an object, or return the default
 * @param {string} property Which property to find on the object. String separated by '.' characters
 * @param {Object} obj Object to search
 * @param [defaultValue=null] The default value to return
 */
export const getValue = (property, obj = {}, defaultValue = null) => {
  const recursiveGetValue = (properties, currValue) => {
    if (properties.length === 0) {
      return currValue;
    }
    if (currValue[properties[0]]) {
      return recursiveGetValue(properties.slice(1), currValue[properties[0]]);
    }
    return defaultValue;
  };

  return recursiveGetValue(property.split('.'), obj);
};
