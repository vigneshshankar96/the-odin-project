import { Datastore } from "./firebase-datastore";

const response = Datastore.createTask({
    'title': 'Task #1: Title',
    'description': 'Task #1: Description',
    'dueDate': 'Task #1: Due Data',
    'priority': 'Task #1: Priority'
})

Datastore.readTask().then(function(snapshot) {
    var values = snapshot.val();
    console.log(values);
});

Datastore.createTaskList({
    'title': 'Task List #1: Title'
});
