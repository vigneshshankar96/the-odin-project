import { Datastore } from './../databases/local-datastore';

const DOMController = (function () {
	const createMainContainerElement = function () {
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
				leftPane.style.width = '40vw';
				leftPane.innerText = 'My Projects';
					projectDOMList.id = 'project-dom-list';
					projectDOMList.style.height = '92.5vh';
					projectDOMList.style.overflow = 'overlay';
					projectDOMList.style.display = 'flex';
					projectDOMList.style.flexDirection = 'column';
						showAllTasks.id = 'all-tasks';
						showAllTasks.classList.add('active-project');
						showAllTasks.style.cursor = 'pointer';
						showAllTasks.style.border = '1px solid black';
							showAllTasksTitle.innerText = 'All Tasks';
						showAllTasks.appendChild(showAllTasksTitle);
						showAllTasks.addEventListener('click', function () {
							const activeProject = document.querySelector('.active-project');
							activeProject.classList.remove('active-project');
							showAllTasks.classList.add('active-project');
							_refreshTaskDOMList();
							currentProjectTitle.innerText = 'All Tasks';
						});
						projectDOMList.appendChild(showAllTasks);
							addNewProject.style.cursor = 'pointer';
							addNewProject.style.border = '1px solid black';
								addNewProjectText.innerText = 'New Project';
							addNewProject.appendChild(addNewProjectText);
								addNewProjectButton.style.color = 'blue';
								addNewProjectButton.style.fontWeight = 'bold';
								addNewProjectButton.innerText = '+';
							addNewProject.appendChild(addNewProjectButton);
							addNewProject.addEventListener('click', function () {
								const projectModalContent = _getProjectModal().querySelector('#project-modal-content');
								while (projectModalContent.hasChildNodes()) {
									projectModalContent.removeChild(projectModalContent.firstChild);
								}
								projectModalContent.appendChild(_createProjectView());
								_getProjectModal().style.display = 'block';
							});
						projectDOMList.appendChild(addNewProject);
				leftPane.appendChild(projectDOMList);
			mainContainer.appendChild(leftPane);
				rightPane.style.width = '40vw';
					currentProjectTitle.id = 'current-project-title';
					currentProjectTitle.innerText = 'All Tasks';
				rightPane.appendChild(currentProjectTitle);
					taskFilters.style.display = 'flex';
					taskFilters.style.justifyContent = 'space-around';
						showPendingTasksButton.id = 'show-pending-tasks-button';
						showPendingTasksButton.classList.add('active-tasks-filter');
						showPendingTasksButton.style.border = '1px solid black';
						showPendingTasksButton.style.borderRadius = '9999px';
						showPendingTasksButton.style.fontSize = '11.25px';
						showPendingTasksButton.style.textAlign = 'center';
						showPendingTasksButton.style.padding = '2.5px';
						showPendingTasksButton.style.cursor = 'pointer';
						showPendingTasksButton.style.userSelect = 'none';
						showPendingTasksButton.addEventListener('click', function () {
							showPendingTasksButton.classList.toggle('active-tasks-filter');
							_refreshTaskDOMList();
						});
					taskFilters.appendChild(showPendingTasksButton);
						showCompletedTasksButton.id = 'show-completed-tasks-button';
						showCompletedTasksButton.classList.add('active-tasks-filter');
						showCompletedTasksButton.style.border = '1px solid black';
						showCompletedTasksButton.style.borderRadius = '9999px';
						showCompletedTasksButton.style.fontSize = '11.25px';
						showCompletedTasksButton.style.textAlign = 'center';
						showCompletedTasksButton.style.padding = '2.5px';
						showCompletedTasksButton.style.cursor = 'pointer';
						showCompletedTasksButton.style.userSelect = 'none';
						showCompletedTasksButton.addEventListener('click', function () {
							showCompletedTasksButton.classList.toggle('active-tasks-filter');
							_refreshTaskDOMList();
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
							addNewTask.addEventListener('click', function () {
								const taskModalContent = _getTaskModal().querySelector('#task-modal-content');
								while (taskModalContent.hasChildNodes()) {
									taskModalContent.removeChild(taskModalContent.firstChild);
								}
								taskModalContent.appendChild(_createTaskView());
								_getTaskModal().style.display = 'block';
							});
					taskDOMList.appendChild(addNewTask);
				rightPane.appendChild(taskDOMList);
			mainContainer.appendChild(rightPane);
			return mainContainer;
	};

	const createModalElement = function (id) {
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
				modalCloseButton.addEventListener('click', function () {
					modal.style.display = 'none';
				});
				modalCloseButton.addEventListener('mouseover', function () {
					modalCloseButton.style.color = 'black';
					modalCloseButton.style.textDecoration = 'none';
					modalCloseButton.style.cursor = 'pointer';
				});
				modalCloseButton.addEventListener('mouseout', function () {
					modalCloseButton.style.color = '#aaa';
				});
			modalContainer.appendChild(modalCloseButton);
				modalContent.id = `${id}-content`;
			modalContainer.appendChild(modalContent);
		modal.appendChild(modalContainer);

		// When the user clicks anywhere outside of the modal, close it
		window.addEventListener('click', function (event) {
			if (event.target === modal) modal.style.display = 'none';
		});
		return modal;
	};

	const _createLineBreak = function () {
		return document.createElement('br');
	};

	const _getActiveProjectId = function () {
		const activeProject = document.querySelector('.active-project');
		return activeProject.id === 'all-tasks' ? '' : activeProject.id;
	};

	const _getProjectModal = function () {
		return document.querySelector('#project-modal');
	};

	const _getTaskModal = function () {
		return document.querySelector('#task-modal');
	};

	const _createProjectView = function (projectObject) {
		let isProjectBeingNewlyCreated = false;
		if (typeof projectObject === 'undefined') {
			isProjectBeingNewlyCreated = true;
			projectObject = {
				title: '',
			};
		}

		const projectView = document.createElement('form');
			const projectViewTitleLabel = document.createElement('label');
			const projectViewTitle = document.createElement('input');
			const updateProjectButton = document.createElement('input');

		projectView.style.display = 'flex';
		projectView.style.flexDirection = 'column';
		projectView.style.alignItems = 'center';
			projectViewTitleLabel.for = 'projectTitle';
			projectViewTitleLabel.innerText = 'Title';
		projectView.appendChild(projectViewTitleLabel);
		projectView.appendChild(_createLineBreak());
			projectViewTitle.type = 'text';
			projectViewTitle.required = true;
			projectViewTitle.name = 'projectTitle';
			projectViewTitle.value = projectObject.title;
		projectView.appendChild(projectViewTitle);
		projectView.appendChild(_createLineBreak());
			updateProjectButton.type = 'submit';
			updateProjectButton.style.border = '1px solid black';
			updateProjectButton.value = 'Update';
			if (isProjectBeingNewlyCreated) updateProjectButton.value = 'Create';
			updateProjectButton.style.width = '45%';
			updateProjectButton.style.margin = 'auto';
		projectView.appendChild(updateProjectButton);
		projectView.addEventListener('submit', function (event) {
			event.preventDefault();
			projectObject.title = projectViewTitle.value;
			if (isProjectBeingNewlyCreated) {
				_addProjectDOMToDOMList(
					_createProjectDOM(
						Datastore.createProject(projectObject)
					)
				);
			} else {
				Datastore.updateProject(projectObject);
				_updateProjectDOM(projectObject);
			}
			_getProjectModal().style.display = 'none';
		});
		return projectView;
	};

	const _createTaskView = function (taskObject) {
		let isTaskBeingNewlyCreated = false;
		if (typeof taskObject === 'undefined') {
			isTaskBeingNewlyCreated = true;
			const today = new Date();
			const dateString = today.toLocaleDateString('en-CA');
			taskObject = {
				completed: false,
				description: '',
				dueDate: dateString,
				priority: 'Low',
				projectId: _getActiveProjectId() === '' ? 'project-id-unassigned' : _getActiveProjectId(),
				title: '',
			};
		}

		const taskView = document.createElement('form');
			const taskViewTitleLabel = document.createElement('label');
			const taskViewTitle = document.createElement('input');
			const taskViewDescriptionLabel = document.createElement('label');
			const taskViewDescription = document.createElement('textarea');
			const taskViewPriorityLabel = document.createElement('label');
			const taskViewPriority = document.createElement('select');
				const lowTaskPriority = document.createElement('option');
				const mediumTaskPriority = document.createElement('option');
				const highTaskPriority = document.createElement('option');
				const criticalTaskPriority = document.createElement('option');
			const taskViewDueDateLabel = document.createElement('label');
			const taskViewDueDate = document.createElement('input');
			const updateTaskButton = document.createElement('input');

		taskView.style.display = 'flex';
		taskView.style.flexDirection = 'column';
		taskView.style.alignItems = 'center';
			taskViewTitleLabel.for = 'taskTitle';
			taskViewTitleLabel.innerText = 'Title';
		taskView.appendChild(taskViewTitleLabel);
			taskViewTitle.type = 'text';
			taskViewTitle.required = true;
			taskViewTitle.name = 'taskTitle';
			taskViewTitle.value = taskObject.title;
		taskView.appendChild(taskViewTitle);
		taskView.appendChild(_createLineBreak());
			taskViewDescriptionLabel.for = 'taskDescription';
			taskViewDescriptionLabel.innerText = 'Description';
		taskView.appendChild(taskViewDescriptionLabel);
			taskViewDescription.required = true;
			taskViewDescription.name = 'taskDescription';
			taskViewDescription.defaultValue = taskObject.description;
		taskView.appendChild(taskViewDescription);
		taskView.appendChild(_createLineBreak());
			taskViewPriorityLabel.for = 'taskPriority';
			taskViewPriorityLabel.innerText = 'Priority';
		taskView.appendChild(taskViewPriorityLabel);
			taskViewPriority.name = 'taskPriority';
				lowTaskPriority.value = 'Low';
				lowTaskPriority.innerText = 'Low';
			taskViewPriority.appendChild(lowTaskPriority);
				mediumTaskPriority.value = 'Medium';
				mediumTaskPriority.innerText = 'Medium';
			taskViewPriority.appendChild(mediumTaskPriority);
				highTaskPriority.value = 'High';
				highTaskPriority.innerText = 'High';
			taskViewPriority.appendChild(highTaskPriority);
				criticalTaskPriority.value = 'Critical';
				criticalTaskPriority.innerText = 'Critical';
			taskViewPriority.appendChild(criticalTaskPriority);
			taskViewPriority.value = taskObject.priority;
		taskView.appendChild(taskViewPriority);
		taskView.appendChild(_createLineBreak());
			taskViewDueDateLabel.for = 'taskDueDate';
			taskViewDueDateLabel.innerText = 'Due Date';
		taskView.appendChild(taskViewDueDateLabel);
			taskViewDueDate.type = 'date';
			taskViewDueDate.name = 'taskDueDate';
			taskViewDueDate.value = taskObject.dueDate;
		taskView.appendChild(taskViewDueDate);
		taskView.appendChild(_createLineBreak());
			updateTaskButton.type = 'submit';
			updateTaskButton.style.border = '1px solid black';
			updateTaskButton.value = 'Update';
			if (isTaskBeingNewlyCreated) updateTaskButton.value = 'Create';
			updateTaskButton.style.width = '45%';
			updateTaskButton.style.margin = 'auto';
		taskView.appendChild(updateTaskButton);
		taskView.addEventListener('submit', function (event) {
			event.preventDefault();
			taskObject.title = taskViewTitle.value;
			taskObject.description = taskViewDescription.value;
			taskObject.priority = taskViewPriority.value;
			taskObject.dueDate = taskViewDueDate.value;
			if (isTaskBeingNewlyCreated) {
				_addTaskDOMToDOMList(
					_createTaskDOM(
						Datastore.createTask(taskObject)
					)
				);
			} else {
				Datastore.updateTask(taskObject);
				_updateTaskDOM(taskObject);
			}
			_getTaskModal().style.display = 'none';
		});
		return taskView;
	};

	const _createProjectDOM = function (projectObject) {
		const projectDOM = document.createElement('div');
			const projectDOMTitle = document.createElement('span');
			const editProjectButton = document.createElement('span');
			const deleteProjectButton = document.createElement('span');

		projectDOM.id = projectObject.id;
		projectDOM.classList.add('project');
		projectDOM.style.cursor = 'pointer';
		projectDOM.style.border = '1px solid black';
			projectDOMTitle.innerText = projectObject.title;
		projectDOM.appendChild(projectDOMTitle);
			editProjectButton.innerText = '✎';
			editProjectButton.addEventListener('click', function () {
				const projectModalContent = _getProjectModal().querySelector('#project-modal-content');
				while (projectModalContent.hasChildNodes()) {
					projectModalContent.removeChild(projectModalContent.firstChild);
				}
				projectModalContent.appendChild(_createProjectView(projectObject));
				_getProjectModal().style.display = 'block';
			});
		projectDOM.appendChild(editProjectButton);
			deleteProjectButton.style.color = 'red';
			deleteProjectButton.style.fontWeight = 'bold';
			deleteProjectButton.innerText = '×';
			deleteProjectButton.addEventListener('click', function (event) {
				event.stopPropagation();
				if (projectDOM.classList.contains('active-project')) {
					const showAllTasks = document.querySelector('#all-tasks');
					showAllTasks.classList.add('active-project');
				}
				_deleteProjectDOMFromDOMList(projectDOM.id);
				Datastore.deleteProject(projectObject.id);
			});
		projectDOM.appendChild(deleteProjectButton);
		projectDOM.addEventListener('click', function () {
			const activeProject = document.querySelector('.active-project');
			activeProject.classList.remove('active-project');
			projectDOM.classList.add('active-project');
			const currentProjectTitle = document.querySelector('#current-project-title');
			currentProjectTitle.innerText = projectObject.title;
			_refreshTaskDOMList();
		});
		return projectDOM;
	};

	const _updateProjectDOM = function (projectObject) {
		const projectDOM = document.getElementById(projectObject.id);
		const projectDOMTitle = projectDOM.querySelector('span');

		projectDOMTitle.innerText = projectObject.title;
		return projectDOM;
	};

	const _addProjectDOMToDOMList = function (projectDOM) {
		const projectDOMList = document.querySelector('#project-dom-list');

		projectDOMList.insertBefore(projectDOM, projectDOMList.lastChild);
		_refreshTaskDOMList();
	};

	const _deleteProjectDOMFromDOMList = function (projectId) {
		const projectDOM = document.getElementById(projectId);

		projectDOM.parentNode.removeChild(projectDOM);
		_refreshTaskDOMList();
	};

	const loadProjectDOMList = function () {
		Datastore.readAllProjects().forEach(projectObject => {
			_addProjectDOMToDOMList(
				_createProjectDOM(projectObject)
			);
		});
	};

	const _createTaskDOM = function (taskObject) {
		const taskDOM = document.createElement('div');
			const taskDOMCompleted = document.createElement('input');
			const taskDOMTitle = document.createElement('span');
			const editTaskButton = document.createElement('span');
			const deleteTaskButton = document.createElement('span');

		taskDOM.id = taskObject.id;
		taskDOM.classList.add(taskObject.projectId);
		taskDOM.classList.add('task');
		taskDOM.style.cursor = 'pointer';
		taskDOM.style.border = '1px solid black';
			taskDOMCompleted.type = 'checkbox';
			taskDOMCompleted.checked = taskObject.completed;
			taskDOMCompleted.addEventListener('click', function () {
				taskObject.completed = taskDOMCompleted.checked;
				Datastore.updateTask(taskObject);
				_refreshTaskDOMList();
			});
		taskDOM.appendChild(taskDOMCompleted);
			taskDOMTitle.innerText = taskObject.title;
		taskDOM.appendChild(taskDOMTitle);
			editTaskButton.innerText = '✎';
			editTaskButton.addEventListener('click', function () {
				const taskModalContent = _getTaskModal().querySelector('#task-modal-content');
				while (taskModalContent.hasChildNodes()) {
					taskModalContent.removeChild(taskModalContent.firstChild);
				}
				taskModalContent.appendChild(_createTaskView(taskObject));
				_getTaskModal().style.display = 'block';
			});
		taskDOM.appendChild(editTaskButton);
			deleteTaskButton.style.color = 'red';
			deleteTaskButton.style.fontWeight = 'bold';
			deleteTaskButton.innerText = '×';
			deleteTaskButton.addEventListener('click', function (event) {
				event.stopPropagation();
				_deleteTaskDOMFromDOMList(taskDOM.id);
				Datastore.deleteTask(taskObject.id);
			});
		taskDOM.appendChild(deleteTaskButton);
		return taskDOM;
	};

	const _updateTaskDOM = function (taskObject) {
		const taskDOM = document.getElementById(taskObject.id);
		const taskDOMTitle = taskDOM.querySelector('span');

		taskDOMTitle.innerText = taskObject.title;
		return taskDOM;
	};

	const _addTaskDOMToDOMList = function (taskDOM) {
		const taskDOMList = document.querySelector('#task-dom-list');

		taskDOMList.insertBefore(taskDOM, taskDOMList.lastChild);
		_refreshTaskDOMList();
	};

	const _deleteTaskDOMFromDOMList = function (taskId) {
		const taskDOM = document.getElementById(taskId);

		taskDOM.parentNode.removeChild(taskDOM);
		_refreshTaskDOMList();
	};

	const loadTaskDOMList = function () {
		Datastore.readAllTasks().forEach(taskObject => {
			_addTaskDOMToDOMList(
				_createTaskDOM(taskObject)
			);
		});
		_refreshTaskDOMList();
	};

	const _refreshTaskDOMList = function () {
		const showPendingTasksButton = document.querySelector('#show-pending-tasks-button');
		const showPendingTasks = showPendingTasksButton.classList.contains('active-tasks-filter');
		let pendingTasksCount = 0;

		const showCompletedTasksButton = document.querySelector('#show-completed-tasks-button');
		const showCompletedTasks = showCompletedTasksButton.classList.contains('active-tasks-filter');
		let completedTasksCount = 0;

		const tasks = document.getElementsByClassName('task');

		// Add the 'show-task' class to the filtered elements, and remove the 'show-task' class from the elements that are not selected
		for (let i = 0; i < tasks.length; i++) {
			tasks[i].classList.remove('show-task');
			if (tasks[i].className.indexOf(_getActiveProjectId()) > -1) {
				const isTaskCompleted = tasks[i].querySelector('input').checked;
				if (!isTaskCompleted) {
					pendingTasksCount++;
					if (showPendingTasks) tasks[i].classList.add('show-task');
				} else {
					completedTasksCount++;
					if (showCompletedTasks) tasks[i].classList.add('show-task');
				}
			}
		}
		showPendingTasksButton.innerText = `Pending tasks (${pendingTasksCount})`;
		showCompletedTasksButton.innerText = `Completed tasks (${completedTasksCount})`;
	};

	return {
		createMainContainerElement, createModalElement, loadProjectDOMList, loadTaskDOMList,
	};
})();

export { DOMController };
