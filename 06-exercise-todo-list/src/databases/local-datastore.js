import store from 'store-js';

class LocalStorage {

  constructor() {
    this.emptyTodoListDatastore = {
      taskDatastore: [],
      projectDatastore: []
    };
  }

  clearTodoListDatastore() {
    this.todoListDatastore = this.emptyTodoListDatastore;
  }

  get todoListDatastore() {
    return store.get('todoListDatastore') || this.emptyTodoListDatastore;
  }

  set todoListDatastore(value) {
    store.set('todoListDatastore', value);
  }

  get taskDatastore() {
    return this.todoListDatastore.taskDatastore;
  }

  set taskDatastore(value) {
    const _todoListDatastore = this.todoListDatastore;
    _todoListDatastore.taskDatastore = value;
    this.todoListDatastore = _todoListDatastore;
  }

  get projectDatastore() {
    return this.todoListDatastore.projectDatastore;
  }

  set projectDatastore(value) {
    const _todoListDatastore = this.todoListDatastore;
    _todoListDatastore.projectDatastore = value;
    this.todoListDatastore = _todoListDatastore;
  }
}

const Datastore = (function () {
  const localStorage = new LocalStorage();
  // localStorage.clearTodoListDatastore();

  const _generateUUID = function () {
    return 'xxyxxxy'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  function createProject(projectObject) {
    projectObject.id = _generateUUID();
    const _projectDatastore = localStorage.projectDatastore;
    _projectDatastore.push(projectObject);
    localStorage.projectDatastore = _projectDatastore;
    return projectObject;
  }

  function readAllProjects() {
    return localStorage.projectDatastore;
  }

  function updateProject(projectObject) {
    const _projectDatastore = localStorage.projectDatastore;
    const projectObjectIndex = _projectDatastore.findIndex((
      _projectObject => _projectObject.id === projectObject.id
    ));
    _projectDatastore[projectObjectIndex] = Object.assign(_projectDatastore[projectObjectIndex], projectObject);
    localStorage.projectDatastore = _projectDatastore;
    return projectObject;
  }

  function deleteProject(projectId) {
    localStorage.projectDatastore = localStorage.projectDatastore.filter((
      _projectObject => _projectObject.id !== projectId
    ));
  }

  function createTask(taskObject) {
    taskObject.id = _generateUUID();
    const _taskDatastore = localStorage.taskDatastore;
    _taskDatastore.push(taskObject);
    localStorage.taskDatastore = _taskDatastore;
    return taskObject;
  }

  function readAllTasks() {
    return localStorage.taskDatastore;
  }

  function updateTask(taskObject) {
    const _taskDatastore = localStorage.taskDatastore;
    const taskObjectIndex = _taskDatastore.findIndex((
      _taskObject => _taskObject.id === taskObject.id
    ));
    _taskDatastore[taskObjectIndex] = Object.assign(_taskDatastore[taskObjectIndex], taskObject);
    localStorage.taskDatastore = _taskDatastore;
    return taskObject;
  }

  function deleteTask(taskId) {
    localStorage.taskDatastore = localStorage.taskDatastore.filter((
      _taskObject => _taskObject.id !== taskId
    ));
  }

  return {
    createProject, readAllProjects, updateProject, deleteProject,
    createTask, readAllTasks, updateTask, deleteTask,
  };
})();

export { Datastore };