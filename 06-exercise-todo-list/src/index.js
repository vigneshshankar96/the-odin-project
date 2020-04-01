import { Datastore } from "./firebase-datastore";
import { DomController } from "./views/dom-conrol";

let allTasks = {};
let allProjects = {};

// Datastore.readAllTasks().then(function(snapshot) {
//     allTasks = snapshot.val();
// });

// Datastore.readAllProjects().then(function(snapshot) {
//     allProjects = snapshot.val();
// });

// const newProject = Datastore.createProject({
//     'title': 'Task List #1: Title'
// });

// const task = {
//     'description': 'Task #1: Description',
//     'dueDate': 'Task #1: Due Data',
//     'pending': true,
//     'priority': 'Task #1: Priority',
//     'project': Object.keys(newProject)[0],
//     'title': 'Task #1: Title'
// };
// const newTask = Datastore.createTask(task);

const content = document.querySelector('#content');
content.appendChild(DomController.render());
