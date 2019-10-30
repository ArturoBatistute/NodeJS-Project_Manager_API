const express = require('express');
const server =  express();

server.use(express.json()); //Tells that we want a Json file in return

const projects = [
    {
    id: "0",
    title: "Nasa C0FFe",
    tasks: ["Build a Starbucks on the Moon", "Build a new type of hipster"]
    },{
    id: "1",
    title: "Stark",
    tasks: ["Work on robotics in Mining", "FlameThrower on everybody"]
    },{
    id: "2",
    title: "HourGlass",
    tasks: ["Build a TimeFlies project", "Complete the sand" ]
    },
];

function checkProjectExists(req, res, next) {
    const project = projects[req.params.index];

    if(!project){
        return res.status(400).json({error: 'Project ID not found'});
    }
    return next();
}

function logrequests(req, res, next) {
    console.count("Número de requisições");

    return next();
}

server.use(logrequests);

//return all projects
server.get('/projects', (req, res) => {

    return res.json(projects);
})

//return a single project by id
server.get('/projects/:index', (req, res) => {
    const project = projects[req.params.index];

    return res.json(project.title);
})

//change a single project Id and Title
server.put('/projects/:index', checkProjectExists, (req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;

    return res.json(project);
})

//Add a project
server.post('/projects/', (req, res) => {
    const {id, title} = req.body;

    const project ={
        id,
        title,
        tasks: []
    };

    projects.push(project);

    return res.json(projects);
})

//Add a task into an existing project
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const {id} = req.params;
    const {task} = req.body;

    const project = projects.find(p => p.id == id);

    project.tasks.push(task);

    return res.json(projects);
})

//delete a single project by id
server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const {id} = req.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    projects.splice(projectIndex, 1) ;

    return res.send("Usuário deletado");
})

server.listen(3000);