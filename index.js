import express  from "express";
import router from "./Routers/index.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import morgan from "morgan";
import cors from 'cors';

const app = express();

dotenv.config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

app.get('/', function(req, res){
    res.send('hello rahul')
})

app.use('/app/v1/', router);

mongoose.connect(process.env.MONGO_URL).then(()=>console.log('Database Connected'))

app.listen(8000, ()=> console.log('running on port 8000'));


// console.log('hi from index.js');