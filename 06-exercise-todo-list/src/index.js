
import { DOMController } from './views/dom-conrol';

const content = document.querySelector('content');
    const mainContainer = DOMController.createMainContainerElement();
content.appendChild(mainContainer);
    const projectModal = DOMController.createModalElement('project-modal');
content.appendChild(projectModal);
    const taskModal = DOMController.createModalElement('task-modal') ;
content.appendChild(taskModal);

DOMController.loadProjectDOMList();
DOMController.loadTaskDOMList();
