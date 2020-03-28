const navigationBar = document.querySelector('ul');
const content = document.querySelector('#content');

navigationBar.addEventListener('click', function(event) {
  if (event.target.localName === 'li') {
    navigationBar.childNodes.forEach(childNode => {
      if (childNode.nodeType !== 3) {
        childNode.classList.remove('active');
      }
    });
    event.target.classList.add('active');
  }
});
