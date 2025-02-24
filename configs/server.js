'use strict'

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"

const middelwares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const connectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Databasse connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middelwares(app)
        connectarDB()
        app.listen(process.env.PORT)
        console.log(`Server running on a port  ${process.env.PORT}`)
    }catch(err){
        console.log(`sever init failed: ${err}`)
    }  
}