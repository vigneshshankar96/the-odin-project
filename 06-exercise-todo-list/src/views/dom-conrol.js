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
            const currentTask = document.createElement('form');
                const currentTaskTitleLabel = document.createElement('label');
                const currentTaskTitle = document.createElement('input');
                const currentTaskDescriptionLabel = document.createElement('label');
                const currentTaskDescription = document.createElement('textarea');
                const currentTaskPriorityLabel = document.createElement('label');
                const currentTaskPriority = document.createElement('select');
                    const lowTaskPriority = document.createElement('option');
                    const mediumTaskPriority = document.createElement('option');
                    const highTaskPriority = document.createElement('option');
                const currentTaskDueDateLabel = document.createElement('label');
                const currentTaskDueDate = document.createElement('input');
                const updateTaskButton = document.createElement('input');

    const lineBreak = function() {
        return document.createElement('br');
    };

    const render = function() {
        mainContainer.style.height = '95vh';
        mainContainer.style.display = 'flex';
        mainContainer.style.justifyContent = 'space-around';
            leftPane.style.width = '25vw';
            leftPane.innerText = 'My Projects';
                projectDOMList.style.border = '1px solid black';
                projectDOMList.style.display = 'flex';
                projectDOMList.style.flexDirection = 'column';
                    showAllTasks.classList.add('active-project');
                    showAllTasks.innerText = 'All Tasks';
                    showAllTasks.style.border = '1px solid black';
                    showAllTasks.addEventListener('click', function(event) {
                        filterTasksByProject('all');
                        const current = document.getElementsByClassName('active-project');
                        current[0].classList.remove('active-project');
                        this.classList.add('active-project');
                    })
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
                    pendingTasksFilter.style.border = '1px solid black';
                    pendingTasksFilter.style.borderRadius = '9999px';
                    pendingTasksFilter.style.fontSize = '12.5px';
                    pendingTasksFilter.style.padding = '2.5px';
                    pendingTasksFilter.innerText = 'Pending';
                taskFilters.appendChild(pendingTasksFilter);
                    completedTasksFilter.style.border = '1px solid black';
                    completedTasksFilter.style.borderRadius = '9999px';
                    completedTasksFilter.style.fontSize = '12.5px';
                    completedTasksFilter.style.padding = '2.5px';
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
                currentTask.style.display = 'flex';
                currentTask.style.flexDirection = 'column';
                currentTask.style.alignItems = 'center';
                currentTask.style.border = '1px solid black';
                currentTask.style.height = '65vh';
                    currentTaskTitleLabel.for = 'taskTitle';
                    currentTaskTitleLabel.innerText = 'Title';
                currentTask.appendChild(currentTaskTitleLabel);
                    currentTaskTitle.type = 'text';
                    currentTaskTitle.id = 'taskTitle';
                    currentTaskTitle.name = 'taskTitle';
                currentTask.appendChild(currentTaskTitle);
                currentTask.appendChild(lineBreak());
                    currentTaskDescriptionLabel.for = 'taskDescription';
                    currentTaskDescriptionLabel.innerText = 'Description';
                currentTask.appendChild(currentTaskDescriptionLabel);
                    currentTaskDescription.id = 'taskDescription';
                    currentTaskDescription.name = 'taskDescription';
                currentTask.appendChild(currentTaskDescription);
                currentTask.appendChild(lineBreak());
                    currentTaskPriorityLabel.for = 'taskPriority';
                    currentTaskPriorityLabel.innerText = 'Priority';
                currentTask.appendChild(currentTaskPriorityLabel);
                    currentTaskPriority.id = 'taskPriority';
                    currentTaskPriority.name = 'taskPriority';
                        lowTaskPriority.value = 'Low';
                        lowTaskPriority.innerText = 'Low';
                    currentTaskPriority.appendChild(lowTaskPriority);
                        mediumTaskPriority.value = 'Medium';
                        mediumTaskPriority.innerText = 'Medium';
                    currentTaskPriority.appendChild(mediumTaskPriority);
                        highTaskPriority.value = 'High';
                        highTaskPriority.innerText = 'High';
                    currentTaskPriority.appendChild(highTaskPriority);
                currentTask.appendChild(currentTaskPriority);
                    currentTaskDueDateLabel.for = 'taskDueDate';
                    currentTaskDueDateLabel.innerText = 'Due Date';
                currentTask.appendChild(lineBreak());
                currentTask.appendChild(currentTaskDueDateLabel);
                    currentTaskDueDate.type = 'date';
                    currentTaskDueDate.id = 'taskDueDate';
                    currentTaskDueDate.name = 'taskDueDate';
                currentTask.appendChild(currentTaskDueDate);
                    updateTaskButton.type = 'submit';
                    updateTaskButton.style.border = '1px solid black';
                    updateTaskButton.innerText = 'Update';
                    updateTaskButton.style.width = '45%';
                    updateTaskButton.style.margin = 'auto';
                currentTask.appendChild(lineBreak());
                currentTask.appendChild(updateTaskButton);
            rightPane.appendChild(currentTask);
        mainContainer.appendChild(rightPane);
        return mainContainer;
    };

    const convertProjectObjectToDOM = function(projectObject) {
        const projectDOM = document.createElement('div');
            const projectDOMTitle = document.createElement('span');
            const deleteProjectButton = document.createElement('span');
        projectDOM.id = projectObject.id;
        projectDOM.classList.add('project');
        projectDOM.style.border = '1px solid black';
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
        projectDOM.addEventListener('click', function(event) {
            filterTasksByProject(projectObject.id);
            const current = document.getElementsByClassName('active-project');
            current[0].classList.remove('active-project');
            this.classList.add('active-project');
        })
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
        taskDOM.classList.add('task');
        taskDOM.classList.add(taskObject.projectId);
        taskDOM.style.border = '1px solid black';
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
        return taskDOM;
    };

    const addToTaskDOMList = function(taskDOM) {
        taskDOMList.insertBefore(taskDOM, taskDOMList.lastChild);
    };

    const deleteFromTaskDOMList = function(taskId) {
        const taskDOM = document.getElementById(taskId);
        taskDOM.parentNode.removeChild(taskDOM);
    };

    function filterTasksByProject(className) {
        const tasks = document.getElementsByClassName('task');
        if (className == 'all') className = '';
        // Add the 'show-task' class (display:block) to the filtered elements, and remove the 'show-task' class from the elements that are not selected
        for (var i = 0; i < tasks.length; i++) {
            removeClass(tasks[i], 'show-task');
            if (tasks[i].className.indexOf(className) > -1) addClass(tasks[i], 'show-task');
        }
    }

    // Show filtered elements
    function addClass(element, className) {
        element.classList.add(className);
    };

    // Hide elements that are not selected
    function removeClass(element, className) {
        element.classList.remove(className);
    };

    return {
        render, convertTaskObjectToDOM, addToTaskDOMList,
        convertProjectObjectToDOM, addToProjectDOMList,
        filterTasksByProject
    };
})();

export { DomController };
