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
  res.send(`Hello from express....`);
});  

const port = 4000;
server.listen(port, () => { 
     console.log(`server on ${port}`);
})  


// GET all the projects 

server.get('/api/projects' , (req , res) => {
    projectModel.get()  
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})    

// CREATE a new project 

server.post('/api/projects' , (req,res) => { 
    const updatedProjects = req.body;
    projectModel.insert(updatedProjects)
    .then( response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(400).json(err);
    })
})  

//GETID specific project 

server.get('/api/projects/:id' , validateProjectId, (req , res) => {
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

 //UPDATE a project 

 router.put("/api/projects/:id", (req, res) => {
    const id = req.params.id;
    const updatedproject = req.body;
  
    if (!req.body.name || !req.body.description) {
      res.status(404).json({ error: "can not update" });
    } else {
      projectModel.update(id, updatedproject).then(response => {
        if (!response) {
          res.status(400).json(response);
        } else {
          res.status(200).json(response);
        }
      });
    }
  });

// DELETE a project 

server.delete('/api/projects/:id' , validateProjectId, (req, res) => {
    const {id} = req.params;
    projectModel.remove(id) 
    .then(response => {
        if(response){
          res.status(204).json(response); 
        } else {
          res.status(404).json({ error: 'Project with id does not exist' });
        }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error removing project' });
    })
  })   


//ACTIONS ......

// GET all the actions 

server.get('/api/actions' , (req , res) => {
    actionsModel.get()  
    .then(response => {
        console.log(response)
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})   

// CREATE a new action 

server.post('/api/actions/:id' , (req , res) => {
    const {description , completed , notes} = req.body;
    const {id} = req.params; 

    if(!description || !notes || !completed ){
        return res.status(400).json({error : 'you did not provide description , notes and completed' })
    } 
     
    projectModel.getProjectActions({id})
    .then(( {id}) => {
        actionModel.insert({ description, notes, completed });
      });
    })  

    
// GETID specific action  

server.get('/api/actions/:id' , (req , res) => {
    const id = req.params
    actionsModel.get(id)  
    .then(response => {
        if(response) { 
            console.log(response)
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
  
// UPDATE action for a specific id 

server.put('/api/actions/:id' , (req ,res) => {
    const id = req.params.id;
    const updatedAction = req.body;
  
    actionsModel.get(id)
      .then(response => {
        updatedAction.project_id = response.project_id;
        actionsModel.update(id, updatedAction)
          .then(response => {
            res.status(200).json(response);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }) 

  //DELETE a action 

router.delete("/api/action/:id", (req, res) => {
    const { id } = req.params;
    actionsModel.remove(id)
      .then(result => {
        res.status(204).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'server error'});
      });
  });





// MiddleWares 

function validateProjectId(req, res, next) {
    const id = req.params.id;
  
    projectModel.get(id)
      .then(resource => {
        if (resource) { 
            req.resource = resource;
          next();
        } else {
          res.status(400).json({ message: "Project with this id does not exist" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Error" });
      });
  }    






