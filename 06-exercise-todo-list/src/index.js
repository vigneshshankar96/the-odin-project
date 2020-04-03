import { Datastore } from "./databases/firebase-datastore";
import { DomController } from "./views/dom-conrol";

const content = document.querySelector('#content');
content.appendChild(DomController.render());

let allTasks = [];
let allProjects = [];

allTasks = Datastore.readAllTasks();
allProjects = Datastore.readAllProjects();

// const newProject = Datastore.createProject({
//     'title': 'Personal'
// });
// DomController.addToProjectsList(newProject);

// const newTask = Datastore.createTask({
//     'description': 'Use GPay to complete the payment for FEB 2020',
//     'dueDate': '08 MAR 2020',
//     'pending': true,
//     'priority': 'High',
//     'projectId': newProject.id,
//     'title': 'Pay Electricity bill'
// });
// DomController.addToTasksList(newTask);
