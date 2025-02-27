import { Router } from "express";
import { createEmpresa } from "./empresa.controller.js";
import { createEmpresasValidator } from "../middlewares/empresa-validators.js";

const router = Router();

router.post("/createEmpresas", createEmpresasValidator, createEmpresa);

export default router;