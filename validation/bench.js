const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBenchInput(data) {
  let errors = {};

  data.body = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.description)) {
    errors.body = "Body field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
