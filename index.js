import Express  from "express";
import router from "./Routers/index.js";

const app = Express();

app.get('/', function(req, res){
    res.send('hello rahul')
})

app.use('/app/v1/', router)

app.listen(8000, ()=> console.log('running on port 8000'));


// console.log('hi from index.js');