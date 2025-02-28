import { Router } from "express";
import { createEmpresa, updateEmpresa } from "./empresa.controller.js";
import { createEmpresasValidator, updateEmpresaValidator } from "../middlewares/empresa-validators.js";

const router = Router();

router.post("/createEmpresas", createEmpresasValidator, createEmpresa);

router.put("/updateEmpresa/:id", updateEmpresaValidator, updateEmpresa);

export default router;