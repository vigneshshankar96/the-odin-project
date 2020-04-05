import { Datastore } from "./../databases/local-datastore";

const DomController = (function() {
    const mainContainer = document.createElement('div');
        const leftPane = document.createElement('div');
            const projectsList = document.createElement('div');
                const showAllTasks = document.createElement('div');
                const addNewProject = document.createElement('div');
                    const addNewProjectText = document.createElement('span');
                    const addNewProjectButton = document.createElement('span');
        const middlePane = document.createElement('div');
            const currentProject = document.createElement('div');
            const taskFilters = document.createElement('div');
                const pendingTasksFilter = document.createElement('div');
                const completedTasksFilter = document.createElement('div');
            const tasksList = document.createElement('div');
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
                projectsList.style.border = '1px solid black';
                projectsList.style.display = 'flex';
                projectsList.style.flexDirection = 'column';
                    showAllTasks.innerText = 'All Tasks';
                    showAllTasks.style.border = '1px solid black';
                projectsList.appendChild(showAllTasks);
                    addNewProject.style.border = '1px solid black';
                        addNewProjectText.innerText = 'New Project';
                        addNewProjectButton.innerText = '+';
                        addNewProjectButton.style.border = '1px solid black';
                        addNewProjectButton.style.borderRadius = '50%';
                    addNewProject.appendChild(addNewProjectText);
                    addNewProject.appendChild(addNewProjectButton);
                projectsList.appendChild(addNewProject);
            leftPane.appendChild(projectsList);
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
                tasksList.style.border = '1px solid black';
                tasksList.style.display = 'flex';
                tasksList.style.flexDirection = 'column';
                    addNewTask.style.border = '1px solid black';
                        addNewTaskText.innerText = 'New Task';
                        addNewTaskButton.innerText = '+';
                        addNewTaskButton.style.border = '1px solid black';
                        addNewTaskButton.style.borderRadius = '50%';
                    addNewTask.appendChild(addNewTaskText);
                    addNewTask.appendChild(addNewTaskButton);
                tasksList.appendChild(addNewTask);
            middlePane.appendChild(tasksList);
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
    }

    const addToProjectsList = function(newProject) {
        const newProjectDOM = document.createElement('div');
            const newProjectDOMText = document.createElement('span');
            const deleteProjectButton = document.createElement('span');
        newProjectDOM.id = newProject.id;
            newProjectDOMText.innerText = newProject.title;
        newProjectDOM.appendChild(newProjectDOMText);
            deleteProjectButton.innerText = 'x';
            deleteProjectButton.style.border = '1px solid black';
            deleteProjectButton.style.borderRadius = '50%';
            deleteProjectButton.addEventListener('click', function(event) {
                deleteFromProjectsList(newProject.id);
            })
        newProjectDOM.appendChild(deleteProjectButton);
        newProjectDOM.style.border = '1px solid black';
        projectsList.insertBefore(newProjectDOM, projectsList.lastChild);
    };

    const deleteFromProjectsList = function(projectId) {
        const projectDOM = document.getElementById(projectId);
        projectDOM.parentNode.removeChild(projectDOM);
        Datastore.deleteProject(projectId);
    };

    const addToTasksList = function(newTask) {
        const newTaskDOM = document.createElement('div');
            const newTaskCompleted = document.createElement('input');
            const newTaskDOMText = document.createElement('span');
            const deleteTaskButton = document.createElement('span');
        newTaskDOM.id = newTask.id;
            newTaskCompleted.type = 'checkbox';
            newTaskCompleted.checked = newTask.completed;
        newTaskDOM.appendChild(newTaskCompleted);
            newTaskDOMText.innerText = newTask.title;
        newTaskDOM.appendChild(newTaskDOMText);
            deleteTaskButton.innerText = 'x';
            deleteTaskButton.style.border = '1px solid black';
            deleteTaskButton.style.borderRadius = '50%';
            deleteTaskButton.addEventListener('click', function(event) {
                deleteFromTasksList(newTask.id);
            });
        newTaskDOM.appendChild(deleteTaskButton);
        newTaskDOM.style.border = '1px solid black';
        tasksList.insertBefore(newTaskDOM, tasksList.lastChild);
    };

    const deleteFromTasksList = function(taskId) {
        const taskDOM = document.getElementById(taskId);
        taskDOM.parentNode.removeChild(taskDOM);
        Datastore.deleteTask(taskId);
    };

    return { render, addToProjectsList, addToTasksList };
})();

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
    'completed': false,
    'priority': 'High',
    'projectId': newProject.id,
    'title': 'Pay Electricity bill'
});
DomController.addToTasksList(newTask);

export { DomController };
