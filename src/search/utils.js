function objectWithoutProperties (object, properties) {
  'use strict';

  var obj = {};
  var keys = Object.keys(object);
  keys.forEach(key => {
    if (!~properties.indexOf(key)) {
      obj[key] = object[key];
    }
  });
  return obj;
}

module.exports = {
  objectWithoutProperties
};
