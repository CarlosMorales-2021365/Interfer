import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { emailExists } from "../helpers/db-validators.js";

export const createEmpresasValidator = [
    validateJWT,
    body("name").notEmpty().withMessage("El nombre de la empresa es requerido"),
    body("contacto").notEmpty().withMessage("El nombre del contacto es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    validarCampos,
    handleErrors
]