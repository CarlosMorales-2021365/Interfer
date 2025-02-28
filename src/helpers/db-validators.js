import User from "../user/user.model.js"
import Empresa from "../empresa/empresa.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const empresaExists = async (id = " ") => {
    const existe = await Empresa.findById(id)
    if(!existe){
        throw new Error("No existe la empresa con el ID proporcionado")
    }
}