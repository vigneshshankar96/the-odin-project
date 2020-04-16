
import { DomController } from './views/dom-conrol';
import { Datastore } from './databases/local-datastore';

const content = document.getElementById('content');
    const mainContainer = DomController.createMainContainerElement();
content.appendChild(mainContainer);
    const projectViewer = DomController.createProjectViewerElement();
    const newProjectModal = DomController.createModalElement('project-modal', projectViewer);
content.appendChild(newProjectModal);
    const taskViewer = DomController.createTaskViewerElement();
    const newTaskModal = DomController.createModalElement('task-modal', taskViewer) 
content.appendChild(newTaskModal);

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

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === newProjectModal) {
        newProjectModal.style.display = 'none';
    } else if (event.target === newTaskModal) {
        newTaskModal.style.display = 'none';
    }
}
