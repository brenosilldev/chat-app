import express from 'express'
import {router} from "./routers/routes.js"
import dotenv from 'dotenv';
import { dbConnection} from "./lib/db.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app,server } from './lib/socket.js';
import path from 'path';

const  __dirname = path.resolve();


dotenv.config();

 

const port = process.env.PORT || 3001
app.use(cors({
    origin: 'http://localhost:5173',
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json({ limit: '50mb' })); 
app.use("/v1",router)


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get("*", (req, res) => {    
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    });
}


server.listen(port, () => {
    dbConnection()
    console.log('Server is running on port ' + port)
})