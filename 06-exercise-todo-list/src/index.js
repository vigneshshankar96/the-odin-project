
import { DomController } from "./views/dom-conrol";
import { Datastore } from "./databases/local-datastore";

const content = document.getElementById('content');
content.appendChild(DomController.render());

Datastore.readAllProjects().forEach(projectObject => {
    const projectDOM = DomController.convertProjectObjectToDOM(projectObject);
    DomController.addToProjectDOMList(projectDOM);
});
Datastore.readAllTasks().forEach(taskObject => {
    const taskDOM = DomController.convertTaskObjectToDOM(taskObject);
    DomController.addToTaskDOMList(taskDOM);
});

DomController.refreshTaskDOMList();

const newProjectObject = Datastore.createProject({
    'title': 'Personal'
});
const newProjectDOM = DomController.convertProjectObjectToDOM(newProjectObject);
DomController.addToProjectDOMList(newProjectDOM);

const newTaskObject = Datastore.createTask({
    'description': 'Use GPay to complete the payment for FEB 2020',
    'dueDate': '08 MAR 2020',
    'completed': false,
    'priority': 'High',
    'projectId': newProjectObject.id,
    'title': 'Pay Electricity bill'
});
const newTaskDOM = DomController.convertTaskObjectToDOM(newTaskObject);
DomController.addToTaskDOMList(newTaskDOM);
