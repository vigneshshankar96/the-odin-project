const DomController = (function() {
    const mainContainer = document.createElement('div');
        const leftPane = document.createElement('div');
            const projectsList = document.createElement('div');
                const showAllTasks = document.createElement('div');
                const addNewProject = document.createElement('div');
        const middlePane = document.createElement('div');
            const currentProject = document.createElement('div');
            const taskFilters = document.createElement('div');
                const pendingTasksFilter = document.createElement('div');
                const completedTasksFilter = document.createElement('div');
            const tasksList = document.createElement('div');
                const addNewTask = document.createElement('div');
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
                    addNewProject.innerText = 'New Project +';
                    addNewProject.style.border = '1px solid black';
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
                    addNewTask.innerText = 'New Task +';
                    addNewTask.style.border = '1px solid black';
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
        newProjectDOM.id = newProject.id;
        newProjectDOM.innerText = newProject.title;
        newProjectDOM.style.border = '1px solid black';
        projectsList.insertBefore(newProjectDOM, projectsList.lastChild);
    }

    const addToTasksList = function(newTask) {
        const newTaskDOM = document.createElement('div');
        newTaskDOM.id = newTask.id;
        newTaskDOM.innerText = newTask.title;
        newTaskDOM.style.border = '1px solid black';
        tasksList.insertBefore(newTaskDOM, tasksList.lastChild);
    }

    return { render, addToProjectsList, addToTasksList };
})();

export { DomController };
