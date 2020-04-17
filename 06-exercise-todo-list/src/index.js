
import { DomController } from './views/dom-conrol';

const content = document.querySelector('content');
    const mainContainer = DomController.createMainContainerElement();
content.appendChild(mainContainer);
    const projectModal = DomController.createModalElement('project-modal');
content.appendChild(projectModal);
    const taskModal = DomController.createModalElement('task-modal') ;
content.appendChild(taskModal);

DomController.loadProjectDOMList();
DomController.loadTaskDOMList();
