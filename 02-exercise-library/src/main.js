
const database = firebase.database();
const remoteBookShelf = database.ref('/remoteBookShelf');

const bookShelf = document.querySelector('book-shelf');

const newBookNode = document.createElement('form');
  const newBookTitle = document.createElement('input');
  const newBookAuthor = document.createElement('input');
  const midSubContainer = document.createElement('div');
    const newBookPages = document.createElement('input');
    const newBookIsRead = document.createElement('input');
    const newBookIsReadLabel = document.createElement('label');
  const footerButtonContainer = document.createElement('div');
    const newBookClear = document.createElement('button');
    const newBookAdd = document.createElement('button');
newBookNode.className = 'book-template';
  newBookTitle.className = 'title';
  newBookTitle.required = true;
  newBookTitle.placeholder = 'Book title';
newBookNode.appendChild(newBookTitle);
  newBookAuthor.className = 'author';
  newBookAuthor.required = true;
  newBookAuthor.placeholder = 'Author';
newBookNode.appendChild(newBookAuthor);
  midSubContainer.className = 'mid-sub-container';
    newBookPages.type = 'number';
    newBookPages.className = 'pages';
    newBookPages.min = "1";
    newBookPages.max = "1600";
    newBookPages.required = true;
    newBookPages.placeholder = 'Total pages';
  midSubContainer.appendChild(newBookPages);
    newBookIsRead.type = 'checkbox';
    newBookIsRead.className = 'isRead';
  midSubContainer.appendChild(newBookIsRead);
    newBookIsReadLabel.innerText = 'Mark as read';
  midSubContainer.appendChild(newBookIsReadLabel);
newBookNode.appendChild(midSubContainer);
  footerButtonContainer.className = 'footer-buttons-container';
    newBookClear.className = 'button';
    newBookClear.type = 'reset';
    newBookClear.textContent = 'Clear';
    newBookClear.addEventListener('click', clearNewBookFields);
  footerButtonContainer.appendChild(newBookClear);
    newBookAdd.className = 'button';
    newBookAdd.type = 'submit';
    newBookAdd.textContent = 'Add';
  footerButtonContainer.appendChild(newBookAdd);
newBookNode.appendChild(footerButtonContainer);
newBookNode.addEventListener('submit', function (event) {
  event.preventDefault();
  const bookId = remoteBookShelf.push().key;
  remoteBookShelf.child(bookId).set({
    author: newBookAuthor.value,
    title: newBookTitle.value,
    pages: parseInt(newBookPages.value),
    isRead: newBookIsRead.checked
  });
});

bookShelf.appendChild(newBookNode);

function createBookNode(id, title, author, pages, isRead) {
  const bookNode = document.createElement('form');
    const bookNodeTitle = document.createElement('input');
    const bookNodeAuthor = document.createElement('input');
    const midSubContainer = document.createElement('div');
      const bookNodePages = document.createElement('input');
      const bookNodeIsRead = document.createElement('input');
      const newBookIsReadLabel = document.createElement('label');
    const footerButtonContainer = document.createElement('div');
      const bookNodeRemove = document.createElement('button');
      const bookNodeUpdate = document.createElement('button');
    bookNode.className = 'book-template';
    bookNode.id = id;
      bookNodeTitle.className = 'title';
      bookNodeTitle.required = true;
      bookNodeTitle.value = title;
    bookNode.appendChild(bookNodeTitle);
      bookNodeAuthor.className = 'author';
      bookNodeAuthor.required = true;
      bookNodeAuthor.value = author;
    bookNode.appendChild(bookNodeAuthor);
      midSubContainer.className = 'mid-sub-container';
        bookNodePages.type = 'number';
        bookNodePages.className = 'pages';
        bookNodePages.min = "1";
        bookNodePages.max = "1600";
        bookNodePages.required = true;
        bookNodePages.value = pages;
      midSubContainer.appendChild(bookNodePages);
        bookNodeIsRead.type = 'checkbox';
        bookNodeIsRead.className = 'isRead';
        bookNodeIsRead.checked = isRead;
      midSubContainer.appendChild(bookNodeIsRead);
        newBookIsReadLabel.innerText = 'Mark as read';
      midSubContainer.appendChild(newBookIsReadLabel);
    bookNode.appendChild(midSubContainer);
      footerButtonContainer.className = 'footer-buttons-container';
        bookNodeRemove.className = 'button';
        bookNodeRemove.textContent = 'Remove';
        bookNodeRemove.addEventListener('click', removeBookFromLibrary);
      footerButtonContainer.appendChild(bookNodeRemove);
        bookNodeUpdate.className = 'button';
        bookNodeUpdate.type = 'submit';
        bookNodeUpdate.textContent = 'Update';
      footerButtonContainer.appendChild(bookNodeUpdate);
    bookNode.appendChild(footerButtonContainer);;
    bookNode.addEventListener('submit', function (event) {
      event.preventDefault();
      remoteBookShelf.child(bookNode.id).update({
        author: bookNodeAuthor.value,
        title: bookNodeTitle.value,
        pages: parseInt(bookNodePages.value),
        isRead: bookNodeIsRead.checked
      });
    });

    return bookNode;
}

function clearNewBookFields() {
  newBookTitle.value = '';
  newBookAuthor.value = '';
  newBookPages.value = '';
  newBookIsRead.checked = false;
}

remoteBookShelf.on('child_added', snapshot => {
  const book = snapshot.val();
  const bookId = snapshot.key;
  const bookNode = createBookNode(
    bookId, book.title, book.author, book.pages, book.isRead
  );
  bookShelf.appendChild(bookNode);

  clearNewBookFields();
})

remoteBookShelf.on('child_changed', snapshot => {
  const book = snapshot.val();
  const bookId = snapshot.key;
  const bookToUpdate = bookShelf.querySelector('#' + bookId);
    bookToUpdate.querySelector('.title').value = book.title;
    bookToUpdate.querySelector('.author').value = book.author;
    bookToUpdate.querySelector('.pages').value = book.pages;
})

function removeBookFromLibrary(event) {
  const book = event.target.parentNode.parentNode;
  remoteBookShelf.child(book.id).remove();
}

remoteBookShelf.on('child_removed', snapshot => {
  const book = snapshot.val();
  const bookId = snapshot.key;
  const bookToRemove = bookShelf.querySelector('#' + bookId);
  bookShelf.removeChild(bookToRemove);
})
