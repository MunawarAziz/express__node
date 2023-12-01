const express = require("express")
const path = require("path")
const port = 2000;
const app = express();
app.use(express.urlencoded({
    extended:true,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.all('/',(req,res,next)=>{
   // res.send("ALLAHOAKBAR");
   console.log('i am in the base api');
    next();
});

const users = ["Fajar","zohar","asar","magrib"]

app.get('/homepage',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'viwes/index.html'));
})
app.get('/users', (req,res,next)=>{
    res.send(users);
});
app.route('/users/:userId').get(function(req,res){
    const {userId} = req.params;
    console.log(userId)
    res.status(200).send(users[userId])
})
app.post('/addUser', function(req,res,next){
    const {name} = req.body;
    users.push(name);
    res.status(201).send({users})
    console.log("isha")
})
app.get('/', function(req,res,next){
    res.send(users);
});
app.use('/users/test', function(req,res,next){
    res.send('this is .use method');
});
app.listen(port, ()=>console.log(`server is running on port no : ${port}`));