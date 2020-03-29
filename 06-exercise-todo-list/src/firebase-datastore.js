
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDI4ihJIx5Eq17UFEq5HqnE6Oux6XtI52k",
    authDomain: "the-odin-project-4fe63.firebaseapp.com",
    databaseURL: "https://the-odin-project-4fe63.firebaseio.com",
    projectId: "the-odin-project-4fe63",
    storageBucket: "the-odin-project-4fe63.appspot.com",
    messagingSenderId: "504811638679",
    appId: "1:504811638679:web:6fb41e23816e5d79053ed2",
    measurementId: "G-ZB924EX38H"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Datastore = (function() {
    const firebaseDatabase = firebase.database();
    const taskDatastore = firebaseDatabase.ref('/todoListDatastore/taskDatastore');
    const taskListDatastore = firebaseDatabase.ref('/todoListDatastore/taskListDatastore');

    function createTask(object) {
        const id = taskDatastore.push().key;
        taskDatastore.child(id).set({
            object
        });
        const response = {};
        response[id] = object;
        return response;
    };

    function readTask() {
        return taskListDatastore.once('value');
    }

    function updateTask(id, object) {
        taskDatastore.child(id).update({
            object
        });
        const response = {};
        response[id] = object;
        return response;
    };

    function deleteTask(id) {
        taskDatastore.child(id).remove();
    };

    function createTaskList(object) {
        const id = taskListDatastore.push().key;
        taskListDatastore.child(id).set({
            object
        });
        const response = {};
        response[id] = object;
        return response;
    };

    function updateTaskList(id, object) {
        taskListDatastore.child(id).update({
            object
        });
        const response = {};
        response[id] = object;
        return response;
    };

    function deleteTaskList(id) {
        taskListDatastore.child(id).remove();
    };

    return { createTask, readTask, updateTask, deleteTask, createTaskList, updateTaskList, deleteTaskList };
})();

export { Datastore };
