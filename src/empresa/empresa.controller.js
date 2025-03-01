import { timeStamp } from 'console';
import Empresas from './empresa.model.js'
import ExcelJS from 'exceljs'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createEmpresa = async (req, res) =>{
    try{
        const data= req.body;

        const trayectoria= new Date().getFullYear() - new Date(data.fundacion).getFullYear();

        const empresas = new Empresas({ ...data, trayectoria });

        await empresas.save();

        return res.status(200).json({
            success: true,
            msg: `Empresa creada exitosamente`,
            empresas: empresas
        })
    }catch(error){
        return res.status(500).json({
            msg: "Error al crear la empresa",
            error
        });
    }
}

export const updateEmpresa = async (req, res) =>{
    try{
        const { id } = req.params;
        const data = req.body;

        const empresa = await Empresas.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: "Empresa actualizada",
            empresa
        })
    }catch(err){
        res.status(500).json({
            success: false,
            msg: "Error al actualizar la empresa",
            error: err.message
        });
    }
}

export const filtrarEmpresas = async (req, res) => {
    try {
        const {min, max, trayectoria, categoria, ordenA_Z, ordenZ_A} = req.body;
        let filtro = {};
 
        if (categoria !== undefined){
            filtro.categoria = categoria;
        }
        if (trayectoria !== undefined) {
            filtro.trayectoria = {$eq: parseInt(trayectoria)};
        }
        if (min !== undefined){
            filtro.trayectoria = {$gte: parseInt(min)};
        }
        if (max !== undefined){
            filtro.trayectoria = {...filtro.trayectoria, $lte: parseInt(max)};
        }

        let orden = {};
 
        if (ordenA_Z) {
            orden.name = 1;
        } else if (ordenZ_A) {
            orden.name = -1;
        }
 
        const empresas = await Empresas.find(filtro).sort(orden);

        const excel = await generarExcel(empresas);
        const timeStamp = Date.now();
        const nombreExcel = `empresas_${timeStamp}.xlsx`;
        const directorioDestino = path.join(__dirname, '..','..', 'public', 'uploads', 'Excel');

        const archivoExcelPath = path.join(directorioDestino, nombreExcel);

        await fs.promises.writeFile(archivoExcelPath, excel);

        res.status(200).json({
            success: true,
            message: "Empresas filtradas con éxito y se ha generado un archivo excel",
            data: empresas,
            excel: archivoExcelPath
        });
 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las empresas o gardar el archivo excel",
            error: error.message
        })
    }
}

async function generarExcel(empresas){
    const workbook = new ExcelJS.Workbook();
    const workSheet = workbook.addWorksheet('Empresas');

    workSheet.columns = [
        { header: "Nombre", key: "name", width: 30 },
        { header: "Contacto", key: "contacto", width: 25 },
        { header: "Email del Contacto", key: "email", width: 35 },
        { header: "Direccion", key: "direccion", width: 25 },
        { header: "Año de Fundacion", key: "fundacion", width: 20 },
        { header: "Nivel de impacto", key: "impacto", width: 25 },
        { header: "Años de Trayectoria", key: "trayectoria", width: 20 },
        { header: "Categoria", key: "categoria", width: 25 }
    ];

    empresas.forEach(empresa => {
        workSheet.addRow({
            name: empresa.name,
            contacto: empresa.contacto,
            email: empresa.email,
            direccion: empresa.direccion,
            fundacion: empresa.fundacion,
            impacto: empresa.impacto,
            trayectoria: empresa.trayectoria,
            categoria: empresa.categoria
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}