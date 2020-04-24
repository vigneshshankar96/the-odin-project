// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI4ihJIx5Eq17UFEq5HqnE6Oux6XtI52k",
  authDomain: "the-odin-project-4fe63.firebaseapp.com",
  databaseURL: "https://the-odin-project-4fe63.firebaseio.com",
  projectId: "the-odin-project-4fe63",
  storageBucket: "the-odin-project-4fe63.appspot.com",
  messagingSenderId: "504811638679",
  appId: "1:504811638679:web:6fb41e23816e5d79053ed2",
  measurementId: "G-ZB924EX38H",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Datastore = (function () {
  const firebaseDatabase = firebase.database();
  const taskDatastore = firebaseDatabase.ref(
    "/todoListDatastore/taskDatastore"
  );
  const projectDatastore = firebaseDatabase.ref(
    "/todoListDatastore/projectDatastore"
  );

  function createTask(object) {
    const newTask = taskDatastore.push();
    newTask.set(object);
    object.id = newTask.key;
    return object;
  }

  function readAllTasks() {
    return taskDatastore.once("value");
  }

  function updateTask(object) {
    taskDatastore.child(object.id).update(object);
    return object;
  }

  function deleteTask(taskId) {
    taskDatastore.child(taskId).remove();
  }

  function createProject(object) {
    const newProject = projectDatastore.push();
    newProject.set(object);
    object.id = newProject.key;
    return object;
  }

  function readAllProjects() {
    return projectDatastore.once("value");
  }

  function updateProject(object) {
    projectDatastore.child(object.id).update(object);
    return object;
  }

  function deleteProject(projectId) {
    projectDatastore.child(projectId).remove();
  }

  return {
    createTask,
    readAllTasks,
    updateTask,
    deleteTask,
    createProject,
    readAllProjects,
    updateProject,
    deleteProject,
  };
})();

export { Datastore };
