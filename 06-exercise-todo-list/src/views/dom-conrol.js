import { Datastore } from './../databases/local-datastore';

const DomController = (function() {

    const createLineBreak = function() {
        return document.createElement('br');
    };

    const createProjectViewerElement = function() {
        const projectViewer = document.createElement('form');
            const projectViewerTitleLabel = document.createElement('label');
            const projectViewerTitle = document.createElement('input');
            const updateProjectButton = document.createElement('input');
        projectViewer.style.display = 'flex';
        projectViewer.style.flexDirection = 'column';
        projectViewer.style.alignItems = 'center';
            projectViewerTitleLabel.for = 'taskTitle';
            projectViewerTitleLabel.innerText = 'Title';
        projectViewer.appendChild(projectViewerTitleLabel);
            projectViewerTitle.type = 'text';
            projectViewerTitle.id = 'taskTitle';
            projectViewerTitle.name = 'taskTitle';
        projectViewer.appendChild(projectViewerTitle);
        projectViewer.appendChild(createLineBreak());
            updateProjectButton.type = 'submit';
            updateProjectButton.style.border = '1px solid black';
            updateProjectButton.innerText = 'Update';
            updateProjectButton.style.width = '45%';
            updateProjectButton.style.margin = 'auto';
        projectViewer.appendChild(createLineBreak());
        projectViewer.appendChild(updateProjectButton);
        return projectViewer;
    };

    const createTaskViewerElement = function() {
        const taskViewer = document.createElement('form');
            const taskViewerTitleLabel = document.createElement('label');
            const taskViewerTitle = document.createElement('input');
            const taskViewerDescriptionLabel = document.createElement('label');
            const taskViewerDescription = document.createElement('textarea');
            const taskViewerPriorityLabel = document.createElement('label');
            const taskViewerPriority = document.createElement('select');
                const lowTaskPriority = document.createElement('option');
                const mediumTaskPriority = document.createElement('option');
                const highTaskPriority = document.createElement('option');
            const taskViewerDueDateLabel = document.createElement('label');
            const taskViewerDueDate = document.createElement('input');
            const updateTaskButton = document.createElement('input');
        taskViewer.style.display = 'flex';
        taskViewer.style.flexDirection = 'column';
        taskViewer.style.alignItems = 'center';
            taskViewerTitleLabel.for = 'taskTitle';
            taskViewerTitleLabel.innerText = 'Title';
        taskViewer.appendChild(taskViewerTitleLabel);
            taskViewerTitle.type = 'text';
            taskViewerTitle.id = 'taskTitle';
            taskViewerTitle.name = 'taskTitle';
        taskViewer.appendChild(taskViewerTitle);
        taskViewer.appendChild(createLineBreak());
            taskViewerDescriptionLabel.for = 'taskDescription';
            taskViewerDescriptionLabel.innerText = 'Description';
        taskViewer.appendChild(taskViewerDescriptionLabel);
            taskViewerDescription.id = 'taskDescription';
            taskViewerDescription.name = 'taskDescription';
        taskViewer.appendChild(taskViewerDescription);
        taskViewer.appendChild(createLineBreak());
            taskViewerPriorityLabel.for = 'taskPriority';
            taskViewerPriorityLabel.innerText = 'Priority';
        taskViewer.appendChild(taskViewerPriorityLabel);
            taskViewerPriority.id = 'taskPriority';
            taskViewerPriority.name = 'taskPriority';
                lowTaskPriority.value = 'Low';
                lowTaskPriority.innerText = 'Low';
            taskViewerPriority.appendChild(lowTaskPriority);
                mediumTaskPriority.value = 'Medium';
                mediumTaskPriority.innerText = 'Medium';
            taskViewerPriority.appendChild(mediumTaskPriority);
                highTaskPriority.value = 'High';
                highTaskPriority.innerText = 'High';
            taskViewerPriority.appendChild(highTaskPriority);
        taskViewer.appendChild(taskViewerPriority);
            taskViewerDueDateLabel.for = 'taskDueDate';
            taskViewerDueDateLabel.innerText = 'Due Date';
        taskViewer.appendChild(createLineBreak());
        taskViewer.appendChild(taskViewerDueDateLabel);
            taskViewerDueDate.type = 'date';
            taskViewerDueDate.id = 'taskDueDate';
            taskViewerDueDate.name = 'taskDueDate';
        taskViewer.appendChild(taskViewerDueDate);
            updateTaskButton.type = 'submit';
            updateTaskButton.style.border = '1px solid black';
            updateTaskButton.innerText = 'Update';
            updateTaskButton.style.width = '45%';
            updateTaskButton.style.margin = 'auto';
        taskViewer.appendChild(createLineBreak());
        taskViewer.appendChild(updateTaskButton);
        return taskViewer;
    };

    const createModalElement = function(id, content) {
        const modal = document.createElement('div');
            const modalContainer = document.createElement('div');
                const modalCloseButton = document.createElement('span');
                const modalContent = document.createElement('div');
        modal.id = id;
        modal.style.display = 'none'; // Hidden by default
        modal.style.position = 'fixed'; // Stay in place
        modal.style.zIndex = '1'; // Sit on top
        modal.style.paddingTop = '100px'; // Location of the box
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%'; // Full width
        modal.style.height = '100%'; // Full height
        modal.style.overflow = 'auto'; // Enable scroll if needed
        modal.style.backgroundColor = 'rgb(0,0,0)'; // Fallback color
        modal.style.backgroundColor = 'rgba(0,0,0,0.4)'; // Black w/ opacity
            modalContainer.style.backgroundColor = '#fefefe';
            modalContainer.style.margin = 'auto';
            modalContainer.style.padding = '20px';
            modalContainer.style.border = '1px solid #888';
            modalContainer.style.width = '80%';
                modalCloseButton.style.color = '#aaa';
                modalCloseButton.style.float = 'right';
                modalCloseButton.style.fontSize = '28px';
                modalCloseButton.style.fontWeight = 'bold';
                modalCloseButton.innerText = '×';
                modalCloseButton.addEventListener('click', function(event) {
                    modal.style.display = 'none';
                });
                modalCloseButton.addEventListener('mouseover', function(event) {
                    modalCloseButton.style.color = 'black';
                    modalCloseButton.style.textDecoration = 'none';
                    modalCloseButton.style.cursor = 'pointer';
                });
                modalCloseButton.addEventListener('mouseout', function(event) {
                    modalCloseButton.style.color = '#aaa';
                });
            modalContainer.appendChild(modalCloseButton);
                modalContent.id = id + '-content';
                if (typeof content !== 'undefined') {
                    modalContent.appendChild(content);
                } else {
                    modalContent.innerText = id;
                }
            modalContainer.appendChild(modalContent);
        modal.appendChild(modalContainer);
        return modal;
    };

    const createMainContainerElement = function() {
        const mainContainer = document.createElement('div');
            const leftPane = document.createElement('div');
                const projectDOMList = document.createElement('div');
                    const showAllTasks = document.createElement('div');
                        const showAllTasksTitle = document.createElement('span');
                    const addNewProject = document.createElement('div');
                        const addNewProjectText = document.createElement('span');
                        const addNewProjectButton = document.createElement('span');
            const rightPane = document.createElement('div');
                const currentProjectTitle = document.createElement('div');
                const taskFilters = document.createElement('div');
                    const showPendingTasksButton = document.createElement('div');
                    const showCompletedTasksButton = document.createElement('div');
                const taskDOMList = document.createElement('div');
                    const addNewTask = document.createElement('div');
                        const addNewTaskText = document.createElement('span');
                        const addNewTaskButton = document.createElement('span');

        mainContainer.style.height = '95vh';
        mainContainer.style.display = 'flex';
        mainContainer.style.justifyContent = 'space-around';
            leftPane.style.width = '25vw';
            leftPane.innerText = 'My Projects';
                projectDOMList.id = 'project-dom-list';
                projectDOMList.style.height = '92.5vh';
                projectDOMList.style.overflow = 'overlay';
                projectDOMList.style.display = 'flex';
                projectDOMList.style.flexDirection = 'column';
                    showAllTasks.id = 'show-all-tasks';
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
                        addNewProjectButton.style.color = 'blue';
                        addNewProjectButton.style.fontWeight = 'bold';
                        addNewProjectButton.innerText = '+';
                    addNewProject.appendChild(addNewProjectText);
                    addNewProject.appendChild(addNewProjectButton);
                    addNewProject.addEventListener('click', function(event) {
                        const projectModal = document.querySelector('#project-modal');
                        projectModal.style.display = 'block';
                    });
                projectDOMList.appendChild(addNewProject);
            leftPane.appendChild(projectDOMList);
        mainContainer.appendChild(leftPane);
            rightPane.style.width = '25vw';
                currentProjectTitle.id = 'current-project-title';
                currentProjectTitle.innerText = 'All Tasks';
            rightPane.appendChild(currentProjectTitle);
                taskFilters.style.display = 'flex';
                taskFilters.style.justifyContent = 'space-around';
                    showPendingTasksButton.id = 'show-pending-tasks-button';
                    showPendingTasksButton.style.border = '1px solid black';
                    showPendingTasksButton.style.borderRadius = '9999px';
                    showPendingTasksButton.style.fontSize = '11.25px';
                    showPendingTasksButton.style.textAlign = 'center';
                    showPendingTasksButton.style.padding = '2.5px';
                    showPendingTasksButton.style.cursor = 'pointer';
                    showPendingTasksButton.style.userSelect = 'none';
                    showPendingTasksButton.classList.add('active-tasks-filter');
                    showPendingTasksButton.addEventListener('click', function(event) {
                        showPendingTasksButton.classList.toggle('active-tasks-filter');
                        refreshTaskDOMList();
                    });
                taskFilters.appendChild(showPendingTasksButton);
                    showCompletedTasksButton.id = 'show-completed-tasks-button';
                    showCompletedTasksButton.style.border = '1px solid black';
                    showCompletedTasksButton.style.borderRadius = '9999px';
                    showCompletedTasksButton.style.fontSize = '11.25px';
                    showCompletedTasksButton.style.textAlign = 'center';
                    showCompletedTasksButton.style.padding = '2.5px';
                    showCompletedTasksButton.style.cursor = 'pointer';
                    showCompletedTasksButton.style.userSelect = 'none';
                    showCompletedTasksButton.classList.add('active-tasks-filter');
                    showCompletedTasksButton.addEventListener('click', function(event) {
                        showCompletedTasksButton.classList.toggle('active-tasks-filter');
                        refreshTaskDOMList();
                    });
                taskFilters.appendChild(showCompletedTasksButton);
            rightPane.appendChild(taskFilters);
                taskDOMList.id = 'task-dom-list';
                taskDOMList.style.height = '90vh';
                taskDOMList.style.overflow = 'overlay';
                taskDOMList.style.display = 'flex';
                taskDOMList.style.flexDirection = 'column';
                    addNewTask.style.cursor = 'pointer';
                    addNewTask.style.border = '1px solid black';
                        addNewTaskText.innerText = 'New Task';
                    addNewTask.appendChild(addNewTaskText);
                        addNewTaskButton.style.color = 'blue';
                        addNewTaskButton.style.fontWeight = 'bold';
                        addNewTaskButton.innerText = '+';
                    addNewTask.appendChild(addNewTaskButton);
                    addNewTask.addEventListener('click', function(event) {
                        const taskModal = document.querySelector('#task-modal');
                        taskModal.style.display = 'block';
                    });
                taskDOMList.appendChild(addNewTask);
            rightPane.appendChild(taskDOMList);
        mainContainer.appendChild(rightPane);
        return mainContainer;
    };

    const convertProjectObjectToDOM = function(projectObject) {
        const projectDOM = document.createElement('div');
            const projectDOMTitle = document.createElement('span');
            const editProjectButton = document.createElement('span');
            const deleteProjectButton = document.createElement('span');
        projectDOM.classList.add('project');
        projectDOM.style.cursor = 'pointer';
        projectDOM.style.border = '1px solid black';
        projectDOM.id = projectObject.id;
            projectDOMTitle.innerText = projectObject.title;
        projectDOM.appendChild(projectDOMTitle);
            editProjectButton.innerText = '✎';
            editProjectButton.addEventListener('click', function(event) {
                const projectModal = document.querySelector('#project-modal');
                projectModal.style.display = 'block';
            });
        projectDOM.appendChild(editProjectButton);
            deleteProjectButton.style.color = 'red';
            deleteProjectButton.style.fontWeight = 'bold';
            deleteProjectButton.innerText = '×';
            deleteProjectButton.addEventListener('click', function(event) {
                event.stopPropagation();
                if (projectDOM.classList.contains('active-project')) {
                    const showAllTasks = document.querySelector('#show-all-tasks');
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
            const currentProjectTitle = document.querySelector('#current-project-title');
            currentProjectTitle.innerText = projectObject.title;
            refreshTaskDOMList();
        });
        return projectDOM;
    };

    const addToProjectDOMList = function(projectDOM) {
        const projectDOMList = document.querySelector('#project-dom-list');
        projectDOMList.insertBefore(projectDOM, projectDOMList.lastChild);
        refreshTaskDOMList();
    };

    const deleteFromProjectDOMList = function(projectId) {
        const projectDOM = document.getElementById(projectId);
        projectDOM.parentNode.removeChild(projectDOM);
        refreshTaskDOMList();
    };

    const convertTaskObjectToDOM = function(taskObject) {
        const taskDOM = document.createElement('div');
            const taskDOMCompleted = document.createElement('input');
            const taskDOMTitle = document.createElement('span');
            const editTaskButton = document.createElement('span');
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
            editTaskButton.innerText = '✎';
            editTaskButton.addEventListener('click', function(event) {
                const taskModal = document.querySelector('#task-modal');
                taskModal.style.display = 'block';
            });
        taskDOM.appendChild(editTaskButton);
            deleteTaskButton.style.color = 'red';
            deleteTaskButton.style.fontWeight = 'bold';
            deleteTaskButton.innerText = '×';
            deleteTaskButton.addEventListener('click', function(event) {
                event.stopPropagation();
                deleteFromTaskDOMList(taskDOM.id);
                Datastore.deleteTask(taskObject.id);
            });
        taskDOM.appendChild(deleteTaskButton);
        return taskDOM;
    };

    const addToTaskDOMList = function(taskDOM) {
        const taskDOMList = document.querySelector('#task-dom-list');
        taskDOMList.insertBefore(taskDOM, taskDOMList.lastChild);
        refreshTaskDOMList();
    };

    const deleteFromTaskDOMList = function(taskId) {
        const taskDOM = document.getElementById(taskId);
        taskDOM.parentNode.removeChild(taskDOM);
        refreshTaskDOMList();
    };

    function refreshTaskDOMList() {
        const activeProject = document.querySelector('.active-project');
        const activeProjectTitle = activeProject.firstChild.innerText;
        const activeProjectId = (activeProjectTitle !== 'All Tasks') ?  activeProject.id : ''

        const showPendingTasksButton = document.querySelector('#show-pending-tasks-button');
        const showPendingTasks = showPendingTasksButton.classList.contains('active-tasks-filter');
        var pendingTasksCount = 0;

        const showCompletedTasksButton = document.querySelector('#show-completed-tasks-button');
        const showCompletedTasks = showCompletedTasksButton.classList.contains('active-tasks-filter');
        var completedTasksCount = 0;

        const tasks = document.getElementsByClassName('task');
        // Add the 'show-task' class to the filtered elements, and remove the 'show-task' class from the elements that are not selected
        for (var i = 0; i < tasks.length; i++) {
            removeClass(tasks[i], 'show-task');
            if (tasks[i].className.indexOf(activeProjectId) > -1) {
                const isTaskCompleted = tasks[i].querySelector('input').checked;
                if (!isTaskCompleted) {
                    pendingTasksCount++;
                    if (showPendingTasks) {
                        addClass(tasks[i], 'show-task');
                    };
                };
                if (isTaskCompleted) {
                    completedTasksCount++;
                    if (showCompletedTasks) {
                        addClass(tasks[i], 'show-task');
                    };
                };
            };
        };
        showPendingTasksButton.innerText = 'Pending tasks (' + pendingTasksCount + ')';
        showCompletedTasksButton.innerText = 'Completed tasks (' + completedTasksCount + ')';
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
        createMainContainerElement, createModalElement,
        convertProjectObjectToDOM, addToProjectDOMList, createProjectViewerElement,
        convertTaskObjectToDOM, addToTaskDOMList, createTaskViewerElement, refreshTaskDOMList
    };
})();

export { DomController };
