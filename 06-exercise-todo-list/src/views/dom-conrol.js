import { Datastore } from "./../databases/local-datastore";

const DomController = (function() {
    const mainContainer = document.createElement('div');
        const leftPane = document.createElement('div');
            const projectDOMList = document.createElement('div');
                const showAllTasks = document.createElement('div');
                    const showAllTasksTitle = document.createElement('span');
                const addNewProject = document.createElement('div');
                    const addNewProjectText = document.createElement('span');
                    const addNewProjectButton = document.createElement('span');
        const middlePane = document.createElement('div');
            const currentProjectTitle = document.createElement('div');
            const taskFilters = document.createElement('div');
                const showPendingTasksButton = document.createElement('div');
                const showCompletedTasksButton = document.createElement('div');
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
                projectDOMList.style.height = '92.5vh';
                projectDOMList.style.overflow = 'overlay';
                projectDOMList.style.display = 'flex';
                projectDOMList.style.flexDirection = 'column';
                    showAllTasks.style.cursor = 'pointer';
                    showAllTasks.classList.add('active-project');
                        showAllTasksTitle.innerText = 'All Tasks';
                    showAllTasks.appendChild(showAllTasksTitle);
                    showAllTasks.style.border = '1px solid black';
                    showAllTasks.addEventListener('click', function(event) {
                        const activeProject = document.querySelector('.active-project');
                        activeProject.classList.remove('active-project');
                        showAllTasks.classList.add('active-project');
                        refreshTaskDOMList();
                        currentProjectTitle.innerText = 'All Tasks';
                    });
                projectDOMList.appendChild(showAllTasks);
                    addNewProject.style.cursor = 'pointer';
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
                currentProjectTitle.innerText = 'All Tasks';
            middlePane.appendChild(currentProjectTitle);
                taskFilters.style.display = 'flex';
                taskFilters.style.justifyContent = 'space-around';
                    showPendingTasksButton.style.border = '1px solid black';
                    showPendingTasksButton.style.borderRadius = '9999px';
                    showPendingTasksButton.style.fontSize = '11.25px';
                    showPendingTasksButton.style.textAlign = 'center';
                    showPendingTasksButton.style.padding = '2.5px';
                    showPendingTasksButton.style.cursor = 'pointer';
                    showPendingTasksButton.style.userSelect = 'none';
                    showPendingTasksButton.innerText = 'Show pending tasks';
                    showPendingTasksButton.classList.add('active-tasks-filter');
                    showPendingTasksButton.addEventListener('click', function(event) {
                        showPendingTasksButton.classList.toggle('active-tasks-filter');
                        refreshTaskDOMList();
                    });
                taskFilters.appendChild(showPendingTasksButton);
                    showCompletedTasksButton.style.border = '1px solid black';
                    showCompletedTasksButton.style.borderRadius = '9999px';
                    showCompletedTasksButton.style.fontSize = '11.25px';
                    showCompletedTasksButton.style.textAlign = 'center';
                    showCompletedTasksButton.style.padding = '2.5px';
                    showCompletedTasksButton.style.cursor = 'pointer';
                    showCompletedTasksButton.style.userSelect = 'none';
                    showCompletedTasksButton.innerText = 'Show completed tasks';
                    showCompletedTasksButton.classList.add('active-tasks-filter');
                    showCompletedTasksButton.addEventListener('click', function(event) {
                        showCompletedTasksButton.classList.toggle('active-tasks-filter');
                        refreshTaskDOMList();
                    });
                taskFilters.appendChild(showCompletedTasksButton);
            middlePane.appendChild(taskFilters);
                taskDOMList.style.height = '90vh';
                taskDOMList.style.overflow = 'overlay';
                taskDOMList.style.display = 'flex';
                taskDOMList.style.flexDirection = 'column';
                    addNewTask.style.border = '1px solid black';
                        addNewTaskText.innerText = 'New Task';
                    addNewTask.appendChild(addNewTaskText);
                        addNewTaskButton.innerText = '+';
                        addNewTaskButton.style.border = '1px solid black';
                        addNewTaskButton.style.borderRadius = '50%';
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
        projectDOM.classList.add('project');
        projectDOM.style.cursor = 'pointer';
        projectDOM.style.border = '1px solid black';
        projectDOM.id = projectObject.id;
            projectDOMTitle.innerText = projectObject.title;
        projectDOM.appendChild(projectDOMTitle);
            deleteProjectButton.innerText = 'x';
            deleteProjectButton.style.border = '1px solid black';
            deleteProjectButton.style.borderRadius = '50%';
            deleteProjectButton.addEventListener('click', function(event) {
                event.stopPropagation();
                if (projectDOM.classList.contains('active-project')) {
                    showAllTasks.classList.add('active-project');
                };
                deleteFromProjectDOMList(projectDOM.id);
                Datastore.deleteProject(projectObject.id);
            });
        projectDOM.appendChild(deleteProjectButton);
        projectDOM.addEventListener('click', function(event) {
            const activeProject = document.querySelector('.active-project');
            activeProject.classList.remove('active-project');
            projectDOM.classList.add('active-project');
            currentProjectTitle.innerText = projectObject.title;
            refreshTaskDOMList();
        });
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
        taskDOM.classList.add(taskObject.projectId);
        taskDOM.classList.add('task');
        taskDOM.style.cursor = 'pointer';
        taskDOM.style.border = '1px solid black';
        taskDOM.id = taskObject.id;
            taskDOMCompleted.type = 'checkbox';
            taskDOMCompleted.checked = taskObject.completed;
            taskDOMCompleted.addEventListener('click', function(event) {
                taskObject.completed = taskDOMCompleted.checked;
                Datastore.updateTask(taskObject);
                refreshTaskDOMList();
            });
        taskDOM.appendChild(taskDOMCompleted);
            taskDOMTitle.innerText = taskObject.title;
        taskDOM.appendChild(taskDOMTitle);
            deleteTaskButton.innerText = 'x';
            deleteTaskButton.style.border = '1px solid black';
            deleteTaskButton.style.borderRadius = '50%';
            deleteTaskButton.addEventListener('click', function(event) {
                event.stopPropagation();
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

    function refreshTaskDOMList() {
        const activeProject = document.querySelector('.active-project');
        const activeProjectTitle = activeProject.firstChild.innerText;
        const activeProjectId = (activeProjectTitle !== 'All Tasks') ?  activeProject.id : ''

        const showPendingTasks = showPendingTasksButton.classList.contains('active-tasks-filter');
        const showCompletedTasks = showCompletedTasksButton.classList.contains('active-tasks-filter');

        const tasks = document.getElementsByClassName('task');
        // Add the 'show-task' class to the filtered elements, and remove the 'show-task' class from the elements that are not selected
        for (var i = 0; i < tasks.length; i++) {
            removeClass(tasks[i], 'show-task');
            if (tasks[i].className.indexOf(activeProjectId) > -1) {
                const isTaskCompleted = tasks[i].querySelector('input').checked;
                if (showPendingTasks && !isTaskCompleted) {
                    addClass(tasks[i], 'show-task');
                };
                if (showCompletedTasks && isTaskCompleted) {
                    addClass(tasks[i], 'show-task');
                };
            };
        };
    };

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
        refreshTaskDOMList
    };
})();

export { DomController };
