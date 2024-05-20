import { body } from "express-validator";

export const validateCreateAccountReqSchema = () => [
  body("first_name").isString(),
  body("last_name").isString(),
  body("email").isEmail(),
  body("phone").isString(),
  body("password").isString(),
];

export const validateLoginReqSchema = () => [
  body("email").isEmail(),
  body("password").isString(),
];