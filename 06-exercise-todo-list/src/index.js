import { Datastore } from "./firebase-datastore";

let allTasks = {};

const task = {
    'title': 'Task #1: Title',
    'description': 'Task #1: Description',
    'dueDate': 'Task #1: Due Data',
    'priority': 'Task #1: Priority'
}
const response = Datastore.createTask(task)
console.log(response);

Datastore.readAllTasks().then(function(snapshot) {
    allTasks = snapshot.val();
    console.log(allTasks);
});

Datastore.createProject({
    'title': 'Task List #1: Title'
});
