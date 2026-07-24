// middleware/validation.js
// Reusable express-validator chains + a shared error handler.
// Each route composes the specific chains it needs, then ends with
// `handleValidation` which returns a 422 with clear field messages
// if anything failed.

const { body, validationResult } = require("express-validator");

// Runs after all validation chains for a route; short-circuits the
// request with a structured error response if validation failed.
function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed. Please check the highlighted fields.",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

// ---- Reusable field validators -------------------------------------

const nameField = (field = "name", label = "Name") =>
  body(field).trim().notEmpty().withMessage(`${label} is required`);

const phoneField = (field = "phone", { optional = false } = {}) => {
  const chain = body(field);
  if (optional) chain.optional({ checkFalsy: true });
  return chain
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be exactly 10 digits");
};

const emailField = (field = "email", { optional = true } = {}) => {
  const chain = body(field);
  if (optional) chain.optional({ checkFalsy: true });
  return chain.isEmail().withMessage("A valid email address is required").normalizeEmail();
};

const requiredField = (field, label) =>
  body(field).trim().notEmpty().withMessage(`${label || field} is required`);

const positiveIntField = (field, label) =>
  body(field).isInt({ min: 1 }).withMessage(`${label || field} must be a positive number`);

const ratingField = (field, label, { optional = false } = {}) => {
  const chain = body(field);
  if (optional) chain.optional({ nullable: true, checkFalsy: true });
  return chain.isInt({ min: 1, max: 5 }).withMessage(`${label || field} must be between 1 and 5`);
};

const dateField = (field, label) =>
  body(field).isISO8601().withMessage(`${label || field} must be a valid date (YYYY-MM-DD)`);

const timeField = (field, label, { optional = false } = {}) => {
  const chain = body(field);
  if (optional) chain.optional({ checkFalsy: true });
  return chain
    .matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .withMessage(`${label || field} must be a valid time (HH:MM)`);
};

module.exports = {
  handleValidation,
  nameField,
  phoneField,
  emailField,
  requiredField,
  positiveIntField,
  ratingField,
  dateField,
  timeField,
};
