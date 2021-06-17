const validateParams = (obj, keys) => {
  let isValid = true;
  keys.forEach(key => {
    if (!obj[key]) {
      isValid = false;
    }
  });
  return isValid;
};

const validatePatchParams = (obj, keys) => {
  let isValid = false;
  keys.forEach(key => {
    if (obj[key]) {
      isValid = true;
    }
  });
  return isValid;
};

const validateCollectionParams = (collection, keys) => {
  let isValid = true;
  if (!collection.length) {
    return false;
  }
  collection.forEach(obj => {
    keys.forEach(key => {
      if (!obj[key]) {
        isValid = false;
      }
    });
  })
  return isValid;
};

module.exports = {
  validateParams,
  validateCollectionParams,
  validatePatchParams,
};