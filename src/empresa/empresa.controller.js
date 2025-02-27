import Empresas from './empresa.model.js'

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