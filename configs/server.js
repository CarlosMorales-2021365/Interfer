'use strict'

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import User from "../src/user/user.model.js"
import { hash } from "argon2"

const middelwares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/intefer/v1/auth", authRoutes)
}

const connectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Databasse connection failed: ${err}`)
        process.exit(1)
    }
}

const crearPrimerAdmin = async () =>{
    try{
        const adminExist = await User.findOne({role: "ADMIN_ROLE"});

        if(!adminExist){
            const encryptedPassword = await hash("Abc123**")

            const  admin = new User({
                name: "Admin1",
                surname: "Admin1",
                username: "admin1",
                email: "Admin1@gmail.com",
                password: encryptedPassword,
                role: "ADMIN_ROLE"
            });

            await admin.save();
            console.log("administrador inicial creado exitosamente")
        }
    }catch(err){
        console.log(`Error al crear al administrador inicial: ${err} `)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middelwares(app)
        connectarDB()
        routes(app)
        crearPrimerAdmin()
        app.listen(process.env.PORT)
        console.log(`Server running on a port  ${process.env.PORT}`)
    }catch(err){
        console.log(`sever init failed: ${err}`)
    }  
}