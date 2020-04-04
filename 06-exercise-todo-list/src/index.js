import { Datastore } from "./databases/local-datastore";
import { DomController } from "./views/dom-conrol";

const content = document.querySelector('#content');
content.appendChild(DomController.render());

Datastore.readAllProjects().forEach(project => {
    DomController.addToProjectsList(project);
});
Datastore.readAllTasks().forEach(task => {
    DomController.addToTasksList(task);
});

const newProject = Datastore.createProject({
    'title': 'Personal'
});
DomController.addToProjectsList(newProject);

const newTask = Datastore.createTask({
    'description': 'Use GPay to complete the payment for FEB 2020',
    'dueDate': '08 MAR 2020',
    'pending': true,
    'priority': 'High',
    'projectId': newProject.id,
    'title': 'Pay Electricity bill'
});
DomController.addToTasksList(newTask);

console.log(Datastore.readAllTasks());
console.log(Datastore.readAllProjects());
