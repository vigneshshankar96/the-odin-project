
import { createHomePage } from './pages/home';
import { createContactPage } from './pages/contact';
import { createAboutPage } from './pages/about';

const navigationBar = document.querySelector('.navigation-bar');
const content = document.querySelector('#content');

var activePage = document.querySelector('.active').innerText;
navigateTo(activePage);

navigationBar.addEventListener('click', function(event) {
  if (event.target.localName === 'nav-button') {
    if (event.target.innerText !== activePage) {
      navigationBar.childNodes.forEach(childNode => {
        if (childNode.nodeType !== 3) {
          childNode.classList.remove('active');
        }
      });
      event.target.classList.add('active');
      activePage = event.target.innerText;
      navigateTo(activePage);
    }
  }
});

function navigateTo(page) {
  while (content.firstChild) {
    content.removeChild(content.lastChild);
  }
  if (page === 'HOME') {
    content.appendChild(createHomePage());
  } else if (page === 'CONTACT') {
    content.appendChild(createContactPage());
  } else if (page === 'ABOUT') {
    content.appendChild(createAboutPage());
  }
}
