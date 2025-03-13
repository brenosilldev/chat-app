import express from 'express'
import {router} from "./routers/routes.js"
import dotenv from 'dotenv';
import { dbConnection} from "./lib/db.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'


dotenv.config();

const app = express() 
const port = process.env.PORT || 3001
app.use(cors({
    origin: 'http://localhost:5173',
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json({ limit: '50mb' })); 
app.use("/v1",router)
app.listen(port, () => {
    dbConnection()
    console.log('Server is running on port ' + port)
})