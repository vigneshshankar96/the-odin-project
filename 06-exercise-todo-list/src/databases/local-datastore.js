import store from 'store-js';

class LocalStorage {

    constructor() {
        this.emptyTodoListDatastore = {
            taskDatastore: [],
            projectDatastore: []
        };
    };

    clearTodoListDatastore() {
        this.todoListDatastore = this.emptyTodoListDatastore;
    };

    get todoListDatastore() {
        return store.get('todoListDatastore') || this.emptyTodoListDatastore;
    };

    set todoListDatastore(value) {
        store.set('todoListDatastore', value);
    };

    get taskDatastore() {
        return this.todoListDatastore.taskDatastore;
    };

    set taskDatastore(value) {
        const _todoListDatastore = this.todoListDatastore;
        _todoListDatastore.taskDatastore = value;
        this.todoListDatastore = _todoListDatastore;
    };

    get projectDatastore() {
        return this.todoListDatastore.projectDatastore;
    };

    set projectDatastore(value) {
        const _todoListDatastore = this.todoListDatastore;
        _todoListDatastore.projectDatastore = value;
        this.todoListDatastore = _todoListDatastore;
    };
};


const Datastore = (function() {
    const localStorage = new LocalStorage();
    // localStorage.clearTodoListDatastore();

    const _generateUUID = function() {
        return 'xxyxxxy'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    function createTask(object) {
        object.id = _generateUUID();
        const _taskDatastore = localStorage.taskDatastore;
        _taskDatastore.push(object);
        localStorage.taskDatastore = _taskDatastore;
        return object;
    };

    function readAllTasks() {
        return localStorage.taskDatastore;
    };

    function updateTask(object) {
        const taskId = object.id;
        const _taskDatastore = localStorage.taskDatastore;
        const objectIndex = _taskDatastore.findIndex((
            _object => _object.id === taskId
        ));
        _taskDatastore[objectIndex] = Object.assign(_taskDatastore[objectIndex], object);
        localStorage.taskDatastore = _taskDatastore;
        return object;
    };

    function deleteTask(taskId) {
        console.log(localStorage.taskDatastore);  
        localStorage.taskDatastore = localStorage.taskDatastore.filter((
            _object => _object.id !== taskId
        ));
        console.log(localStorage.taskDatastore);  
    };

    function createProject(object) {
        object.id = _generateUUID();
        const _projectDatastore = localStorage.projectDatastore;
        _projectDatastore.push(object);
        localStorage.projectDatastore = _projectDatastore;
        return object;
    };

    function readAllProjects() {
        return localStorage.projectDatastore;
    };

    function updateProject(object) {
        const projectId = object.id;
        const _projectDatastore = localStorage.projectDatastore;
        const objectIndex = _projectDatastore.findIndex((
            _object => _object.id === projectId
        ));
        _projectDatastore[objectIndex] = Object.assign(_projectDatastore[objectIndex], object);
        localStorage.projectDatastore = _projectDatastore;
        return object;
    };

    function deleteProject(projectId) {
        localStorage.projectDatastore = localStorage.projectDatastore.filter((
            _object => _object.id !== projectId
        ));
    };

    return {
        createTask, readAllTasks, updateTask, deleteTask,
        createProject, readAllProjects, updateProject, deleteProject
    };
})();

export { Datastore };