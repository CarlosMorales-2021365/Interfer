import { Router } from "express";
import { createEmpresa, updateEmpresa, filtrarEmpresas } from "./empresa.controller.js";
import { createEmpresasValidator, updateEmpresaValidator, obtenerEmpresaValidator } from "../middlewares/empresa-validators.js";

const router = Router();

router.post("/createEmpresas", createEmpresasValidator, createEmpresa);

router.put("/updateEmpresa/:id", updateEmpresaValidator, updateEmpresa);

router.get("/obtenerEmpresas", obtenerEmpresaValidator, filtrarEmpresas);

export default router;