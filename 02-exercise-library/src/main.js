
const database = firebase.database();
const myLibraryRemote = database.ref('/myLibraryRemote');

const bookShelf = document.querySelector('book-shelf');
bookShelf.appendChild(new createAddNewBookNode())

function toNode(id, title, author, pages) {

    const bookNode = document.createElement('div');
    bookNode.setAttribute('id', id);

    const bookNodeTitleValue = document.createElement('input');
    bookNodeTitleValue.setAttribute('class', 'title');
    bookNodeTitleValue.defaultValue = title;
    bookNode.appendChild(bookNodeTitleValue);

    const bookNodeAuthorLabel = document.createElement('label');
    bookNodeAuthorLabel.textContent = ' by ';
    bookNode.appendChild(bookNodeAuthorLabel);
    const bookNodeAuthorValue = document.createElement('input');
    bookNodeAuthorValue.setAttribute('class', 'author');
    bookNodeAuthorValue.defaultValue = author;
    bookNode.appendChild(bookNodeAuthorValue);

    const bookNodePagesValue = document.createElement('input');
    bookNodePagesValue.setAttribute('class', 'pages');
    bookNodePagesValue.defaultValue = pages;
    bookNode.appendChild(bookNodePagesValue);

    const bookNodeUpdate = document.createElement('button');
    bookNodeUpdate.textContent = 'Update';
    bookNodeUpdate.addEventListener('click', updateBookInLibrary);
    bookNode.appendChild(bookNodeUpdate);

    const bookNodeRemove = document.createElement('button');
    bookNodeRemove.textContent = 'Remove';
    bookNodeRemove.addEventListener('click', removeBookFromLibrary);
    bookNode.appendChild(bookNodeRemove);

    return bookNode;
}

function createAddNewBookNode() {
    const newBookNode = document.createElement('div');

    const newTitleValue = document.createElement('input');
    newTitleValue.setAttribute('id', 'newTitle');
    newTitleValue.placeholder = 'Book title';
    newBookNode.appendChild(newTitleValue);

    const newAuthorLabel = document.createElement('label');
    newAuthorLabel.textContent = ' by ';
    newBookNode.appendChild(newAuthorLabel);
    const newAuthorValue = document.createElement('input');
    newAuthorValue.setAttribute('id', 'newAuthor');
    newAuthorValue.placeholder = 'Author';
    newBookNode.appendChild(newAuthorValue);

    const newPagesValue = document.createElement('input');
    newPagesValue.setAttribute('id', 'newPages');
    newPagesValue.placeholder = 'Number of pages';
    newBookNode.appendChild(newPagesValue);

    const newBookAdd = document.createElement('button');
    newBookAdd.textContent = 'Add';
    newBookAdd.addEventListener('click', addBookToLibrary)
    newBookNode.appendChild(newBookAdd);

    return newBookNode;
}

function addBookToLibrary(event) {
    const book = event.target.parentNode;
    const title = book.querySelector('#newTitle').value;
    const author = book.querySelector('#newAuthor').value;
    const pages = parseInt(book.querySelector('#newPages').value);
    const isRead = false;

    const bookId = myLibraryRemote.push().key;
    myLibraryRemote.child(bookId).set({
        author, title, pages, isRead
    });
}

myLibraryRemote.on('child_added', snapshot => {
    const book = snapshot.val();
    const bookId = snapshot.key;
    const bookNode = toNode(bookId, book.title, book.author, book.pages);
    bookShelf.appendChild(bookNode);
})

function updateBookInLibrary(event) {
    const book = event.target.parentNode;
    const title = book.querySelector('.title').value;
    const author = book.querySelector('.author').value;
    const pages = parseInt(book.querySelector('.pages').value);
    const isRead = false;

    myLibraryRemote.child(book.id).update({
        author, title, pages, isRead
    });
}

myLibraryRemote.on('child_changed', snapshot => {
    const book = snapshot.val();
    const bookId = snapshot.key;
    const bookToUpdate = bookShelf.querySelector('#' + bookId);
    bookToUpdate.querySelector('.title').value = book.title;
    bookToUpdate.querySelector('.author').value = book.author;
    bookToUpdate.querySelector('.pages').value = book.pages;
    console.log('Hello')
})

function removeBookFromLibrary(event) {
    const book = event.target.parentNode;
    myLibraryRemote.child(book.id).remove();
}

myLibraryRemote.on('child_removed', snapshot => {
    const book = snapshot.val();
    const bookId = snapshot.key;
    const bookToRemove = bookShelf.querySelector('#' + bookId);
    bookShelf.removeChild(bookToRemove);
})
