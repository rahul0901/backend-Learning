import { Express } from "express";

const app = Express();

app.get('/', function(req, res){
    res.send('hello rahul')
})

app.listen(8000, ()=> console.log('running on port 8000'));

export default app;


// console.log('hi from index.js');