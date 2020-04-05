import { Datastore } from "./../databases/local-datastore";

const DomController = (function() {
    const mainContainer = document.createElement('div');
        const leftPane = document.createElement('div');
            const projectDOMList = document.createElement('div');
                const showAllTasks = document.createElement('div');
                const addNewProject = document.createElement('div');
                    const addNewProjectText = document.createElement('span');
                    const addNewProjectButton = document.createElement('span');
        const middlePane = document.createElement('div');
            const currentProject = document.createElement('div');
            const taskFilters = document.createElement('div');
                const pendingTasksFilter = document.createElement('div');
                const completedTasksFilter = document.createElement('div');
            const taskDOMList = document.createElement('div');
                const addNewTask = document.createElement('div');
                    const addNewTaskText = document.createElement('span');
                    const addNewTaskButton = document.createElement('span');
        const rightPane = document.createElement('div');
            const taskDescription = document.createElement('div');
            const updateTaskButton = document.createElement('div');

    const render = function() {
        mainContainer.style.height = '95vh';
        mainContainer.style.display = 'flex';
        mainContainer.style.justifyContent = 'space-around';
            leftPane.style.width = '25vw';
            leftPane.innerText = 'My Projects';
                projectDOMList.style.border = '1px solid black';
                projectDOMList.style.display = 'flex';
                projectDOMList.style.flexDirection = 'column';
                    showAllTasks.innerText = 'All Tasks';
                    showAllTasks.style.border = '1px solid black';
                projectDOMList.appendChild(showAllTasks);
                    addNewProject.style.border = '1px solid black';
                        addNewProjectText.innerText = 'New Project';
                        addNewProjectButton.innerText = '+';
                        addNewProjectButton.style.border = '1px solid black';
                        addNewProjectButton.style.borderRadius = '50%';
                    addNewProject.appendChild(addNewProjectText);
                    addNewProject.appendChild(addNewProjectButton);
                projectDOMList.appendChild(addNewProject);
            leftPane.appendChild(projectDOMList);
        mainContainer.appendChild(leftPane);
            middlePane.style.width = '25vw';
                currentProject.innerText = '<< Active Project Title >>';
            middlePane.appendChild(currentProject);
                taskFilters.style.display = 'flex';
                taskFilters.style.justifyContent = 'space-around';
                    pendingTasksFilter.innerText = 'Pending';
                    pendingTasksFilter.style.border = '1px solid black';
                    pendingTasksFilter.style.padding = '5px';
                    pendingTasksFilter.style.borderRadius = '9999px';
                taskFilters.appendChild(pendingTasksFilter);
                    completedTasksFilter.style.border = '1px solid black';
                    completedTasksFilter.style.borderRadius = '9999px';
                    completedTasksFilter.style.padding = '5px';
                    completedTasksFilter.innerText = 'Completed';
                taskFilters.appendChild(completedTasksFilter);
            middlePane.appendChild(taskFilters);
                taskDOMList.style.border = '1px solid black';
                taskDOMList.style.display = 'flex';
                taskDOMList.style.flexDirection = 'column';
                    addNewTask.style.border = '1px solid black';
                        addNewTaskText.innerText = 'New Task';
                        addNewTaskButton.innerText = '+';
                        addNewTaskButton.style.border = '1px solid black';
                        addNewTaskButton.style.borderRadius = '50%';
                    addNewTask.appendChild(addNewTaskText);
                    addNewTask.appendChild(addNewTaskButton);
                taskDOMList.appendChild(addNewTask);
            middlePane.appendChild(taskDOMList);
        mainContainer.appendChild(middlePane);
            rightPane.style.width = '45vw';
                taskDescription.style.border = '1px solid black';
                taskDescription.innerText = '<< Active Task Details >>';
                taskDescription.style.height = '65vh';
            rightPane.appendChild(taskDescription);
                updateTaskButton.style.border = '1px solid black';
                updateTaskButton.innerText = 'Update';
                updateTaskButton.style.height = '7.5vh';
                updateTaskButton.style.width = '45%';
                updateTaskButton.style.margin = 'auto';
            rightPane.appendChild(updateTaskButton);
        mainContainer.appendChild(rightPane);
        return mainContainer;
    };

    const convertProjectObjectToDOM = function(projectObject) {
        const projectDOM = document.createElement('div');
            const projectDOMTitle = document.createElement('span');
            const deleteProjectButton = document.createElement('span');
        projectDOM.id = projectObject.id;
            projectDOMTitle.innerText = projectObject.title;
        projectDOM.appendChild(projectDOMTitle);
            deleteProjectButton.innerText = 'x';
            deleteProjectButton.style.border = '1px solid black';
            deleteProjectButton.style.borderRadius = '50%';
            deleteProjectButton.addEventListener('click', function(event) {
                deleteFromProjectDOMList(projectDOM.id);
                Datastore.deleteProject(projectObject.id);
            })
        projectDOM.appendChild(deleteProjectButton);
        projectDOM.style.border = '1px solid black';
        return projectDOM;
    };

    const addToProjectDOMList = function(projectDOM) {
        projectDOMList.insertBefore(projectDOM, projectDOMList.lastChild);
    };

    const deleteFromProjectDOMList = function(projectId) {
        const projectDOM = document.getElementById(projectId);
        projectDOM.parentNode.removeChild(projectDOM);
    };

    const convertTaskObjectToDOM = function(taskObject) {
        const taskDOM = document.createElement('div');
            const taskDOMCompleted = document.createElement('input');
            const taskDOMTitle = document.createElement('span');
            const deleteTaskButton = document.createElement('span');
        taskDOM.id = taskObject.id;
            taskDOMCompleted.type = 'checkbox';
            taskDOMCompleted.checked = taskObject.completed;
            taskDOMCompleted.addEventListener('click', function(event) {
                taskObject.completed = taskDOMCompleted.checked;
                Datastore.updateTask(taskObject);
            });
        taskDOM.appendChild(taskDOMCompleted);
            taskDOMTitle.innerText = taskObject.title;
        taskDOM.appendChild(taskDOMTitle);
            deleteTaskButton.innerText = 'x';
            deleteTaskButton.style.border = '1px solid black';
            deleteTaskButton.style.borderRadius = '50%';
            deleteTaskButton.addEventListener('click', function(event) {
                deleteFromTaskDOMList(taskDOM.id);
                Datastore.deleteTask(taskObject.id);
            });
        taskDOM.appendChild(deleteTaskButton);
        taskDOM.style.border = '1px solid black';
        return taskDOM;
    };

    const addToTaskDOMList = function(taskDOM) {
        taskDOMList.insertBefore(taskDOM, taskDOMList.lastChild);
    };

    const deleteFromTaskDOMList = function(taskId) {
        const taskDOM = document.getElementById(taskId);
        taskDOM.parentNode.removeChild(taskDOM);
    };

    return {
        render, convertTaskObjectToDOM, addToTaskDOMList,
        convertProjectObjectToDOM, addToProjectDOMList
    };
})();

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

export { DomController };
