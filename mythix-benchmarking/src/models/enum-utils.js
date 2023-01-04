'use strict';

const enums = require('./enum-types');

function getter(enumTypes) {
  return ({ value }) => {
    for (let [key, enumValue] of enums[enumTypes]) {
      if (key === value)
        return key;

      if (enumValue === value)
        return key;
    }
    throw new TypeError(`Bad "enum" value provided: "${value}"`);
  };
}

function setter(enumType) {
  return ({ value, set }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (Object.prototype.hasOwnProperty(enums[enumType], value))
      return set(enums[enumType]);

    if (Object.values(enums[enumType]).indexOf(value) >= 0)
      return set(value);

    throw new TypeError(`Bad "enum" value provided: "${value}"`);
  };
}

module.exports = {
  getter,
  setter,
};