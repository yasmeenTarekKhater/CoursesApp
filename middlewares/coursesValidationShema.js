const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title required")
      .isLength({ min: 3 })
      .withMessage("min length 3"),
    body("price").notEmpty().withMessage("title required"),
  ];
};
module.exports = { validationSchema };
