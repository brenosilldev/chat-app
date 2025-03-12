import express from 'express'
import {router} from "./routers/routes.js"
import dotenv from 'dotenv';
import { dbConnection} from "./lib/db.js"

dotenv.config();

const app = express() 
const port = process.env.PORT || 3001

app.use(express.json())
app.use("/v1",router)
app.listen(port, () => {
    dbConnection()
    console.log('Server is running on port ' + port)
})