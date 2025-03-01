import { Router } from "express";
import { createEmpresa, updateEmpresa, filtrarEmpresas } from "./empresa.controller.js";
import { createEmpresasValidator, updateEmpresaValidator, obtenerEmpresaValidator } from "../middlewares/empresa-validators.js";

const router = Router();

/**
 * @swagger
 * /createEmpresas:
 *   post:
 *     summary: Create a new company
 *     tags: [Empresa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Company name
 *                 example: Tech Solutions
 *               contacto:
 *                 type: string
 *                 description: Contact person's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Contact email
 *                 example: johndoe@example.com
 *               direccion:
 *                 type: string
 *                 description: Company address
 *                 example: 123 Main St
 *               fundacion:
 *                 type: string
 *                 description: Year of foundation
 *                 example: 2000
 *               impacto:
 *                 type: string
 *                 description: Impact level
 *                 example: High
 *               trayectoria:
 *                 type: string
 *                 description: Years of trajectory
 *                 example: 20
 *               categoria:
 *                 type: string
 *                 description: Company category
 *                 example: Technology
 *     responses:
 *       200:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Empresa creada exitosamente
 *                 empresas:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Tech Solutions
 *                     contacto:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     direccion:
 *                       type: string
 *                       example: 123 Main St
 *                     fundacion:
 *                       type: string
 *                       example: 2000
 *                     impacto:
 *                       type: string
 *                       example: High
 *                     trayectoria:
 *                       type: string
 *                       example: 20
 *                     categoria:
 *                       type: string
 *                       example: Technology
 *       500:
 *         description: Error creating company
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Error al crear la empresa
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.post("/createEmpresas", createEmpresasValidator, createEmpresa);

/**
 * @swagger
 * /updateEmpresa/{id}:
 *   put:
 *     summary: Update an existing company
 *     tags: [Empresa]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The company ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Company name
 *                 example: Tech Solutions
 *               contacto:
 *                 type: string
 *                 description: Contact person's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Contact email
 *                 example: johndoe@example.com
 *               direccion:
 *                 type: string
 *                 description: Company address
 *                 example: 123 Main St
 *               fundacion:
 *                 type: string
 *                 description: Year of foundation
 *                 example: 2000
 *               impacto:
 *                 type: string
 *                 description: Impact level
 *                 example: High
 *               trayectoria:
 *                 type: string
 *                 description: Years of trajectory
 *                 example: 20
 *               categoria:
 *                 type: string
 *                 description: Company category
 *                 example: Technology
 *     responses:
 *       200:
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Empresa actualizada
 *                 empresa:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Tech Solutions
 *                     contacto:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     direccion:
 *                       type: string
 *                       example: 123 Main St
 *                     fundacion:
 *                       type: string
 *                       example: 2000
 *                     impacto:
 *                       type: string
 *                       example: High
 *                     trayectoria:
 *                       type: string
 *                       example: 20
 *                     categoria:
 *                       type: string
 *                       example: Technology
 *       500:
 *         description: Error updating company
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Error al actualizar la empresa
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.put("/updateEmpresa/:id", updateEmpresaValidator, updateEmpresa);

/**
 * @swagger
 * /obtenerEmpresas:
 *   get:
 *     summary: Get filtered companies
 *     tags: [Empresa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               min:
 *                 type: integer
 *                 description: Minimum years of trajectory
 *                 example: 5
 *               max:
 *                 type: integer
 *                 description: Maximum years of trajectory
 *                 example: 20
 *               trayectoria:
 *                 type: integer
 *                 description: Exact years of trajectory
 *                 example: 10
 *               categoria:
 *                 type: string
 *                 description: Company category
 *                 example: Technology
 *               ordenA_Z:
 *                 type: boolean
 *                 description: Order companies from A to Z
 *                 example: true
 *               ordenZ_A:
 *                 type: boolean
 *                 description: Order companies from Z to A
 *                 example: false
 *     responses:
 *       200:
 *         description: Companies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Empresas filtradas con éxito y se ha generado un archivo excel
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Tech Solutions
 *                       contacto:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: johndoe@example.com
 *                       direccion:
 *                         type: string
 *                         example: 123 Main St
 *                       fundacion:
 *                         type: string
 *                         example: 2000
 *                       impacto:
 *                         type: string
 *                         example: High
 *                       trayectoria:
 *                         type: integer
 *                         example: 10
 *                       categoria:
 *                         type: string
 *                         example: Technology
 *                 excel:
 *                   type: string
 *                   example: /path/to/generated/excel/file.xlsx
 *       500:
 *         description: Error retrieving companies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al obtener las empresas o guardar el archivo excel
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.get("/obtenerEmpresas", obtenerEmpresaValidator, filtrarEmpresas);

export default router;