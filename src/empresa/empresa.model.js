import { Schema, model } from "mongoose";

const empresaSchema = new Schema({
    name:{
        type: String,
        required: [true, "Company name is required"]
    },
    contacto:{
        type: String,
        required: [true, "Name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
    },
    direccion:{
        type: String
    },
    fundacion:{
        type: String
    },
    impacto:{
        type: String,
    },
    trayectoria:{
        type: String,
    },
    categoria:{
        type: String
    },
    status:{
        type: Boolean,
        default: true
    },
},{
    versionKey: false,
    timestamps: true
})

export default model('Empresas', empresaSchema)