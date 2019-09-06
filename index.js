/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/ 

const express = require('express'); 
const server = express(); 

//imports from project and actions 

const projectModel = require('./data/helpers/projectModel');
const actionsModel = require('./data/helpers/actionModel');

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`hello`);
});  

const port = 4000;
server.listen(port, () => { 
     console.log(`server on ${port}`);
})  

// get all the actions 

server.get('/api/actions' , (req , res) => {
    actionsModel.get()  
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})  

// get all the projects 

server.get('/api/projects' , (req , res) => {
    projectModel.get()  
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})    

// get specific action  

server.get('/api/actions/:id' , (req , res) => {
    const id = req.params
    actionsModel.get(id)  
    .then(response => {
        if(response) {
            res.status(200).json(response) 
        } 
        else {
            res.status(400).json(response)
        } 
    })
    .catch(err => {
        res.status(500).json(err)
    })
})    

//get specific project 

server.get('/api/projects/:id' , (req , res) => {
    const id = req.params
    projectModel.get(id)  
    .then(response => {
        if(response) {
            res.status(200).json(response) 
        } 
        else {
            res.status(400).json(response)
        } 
    })
    .catch(err => {
        res.status(500).json(err)
    })
})    
  
// post a new action 

server.post('/api/actions/:id' , (req , res) => {
    const {description , completed , notes} = req.body;
    const {id} = req.params; 

    if(!description || !notes || typeof completed !== "boolean"){
        return res.status(400).json({error : 'you did not provide description , notes and completed' })
    } 
     
    projectModel.getProjectActions({id})
    .then(( {id} ) => {
        actionModel.insert({ description, notes, completed });
      });
    }) 

// post a new project 

server.post('/api/projects' , (req,res) => {
    const { name , description , completed } = req.body; 
    const id = req.params
    if(!description || !completed || !name) {
       return res.status(400).json({error : "you did not provide description , name and completed"})
    } 

    projectModel.insert({description , name , completed})
    .then((id ) => {
        res.status(200).json(id);
    })
    .catch(err => {
        res.status(400).json(err);
    })
})
 
//