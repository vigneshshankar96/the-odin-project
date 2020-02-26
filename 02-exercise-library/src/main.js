
const database = firebase.database();
const myLibraryRemote = database.ref('/myLibraryRemote');

bookShelf = document.querySelector('book-shelf');
bookShelf.appendChild(new createAddNewBookNode())

function toNode(id, title, author, pages) {

    let bookNode = document.createElement('div');
    bookNode.setAttribute('id', id);

    let bookNodeTitleValue = document.createElement('input');
    bookNodeTitleValue.setAttribute('name', 'title');
    bookNodeTitleValue.defaultValue = title;
    bookNode.appendChild(bookNodeTitleValue);

    let bookNodeAuthorLabel = document.createElement('label');
    bookNodeAuthorLabel.textContent = ' by ';
    bookNode.appendChild(bookNodeAuthorLabel);
    let bookNodeAuthorValue = document.createElement('input');
    bookNodeAuthorValue.setAttribute('name', 'author');
    bookNodeAuthorValue.defaultValue = author;
    bookNode.appendChild(bookNodeAuthorValue);

    let bookNodePagesValue = document.createElement('input');
    bookNodePagesValue.setAttribute('name', 'pages');
    bookNodePagesValue.defaultValue = pages;
    bookNode.appendChild(bookNodePagesValue);

    let bookNodeUpdate = document.createElement('button');
    bookNodeUpdate.textContent = 'Update';
    bookNodeUpdate.addEventListener('click', updateBookInLibrary);
    bookNode.appendChild(bookNodeUpdate);

    let bookNodeRemove = document.createElement('button');
    bookNodeRemove.textContent = 'Remove';
    bookNodeRemove.addEventListener('click', removeBookFromLibrary);
    bookNode.appendChild(bookNodeRemove);

    return bookNode;
}

function createAddNewBookNode() {
    let newBookNode = document.createElement('div');

    let newTitleValue = document.createElement('input');
    newTitleValue.setAttribute('id', 'newTitle');
    newTitleValue.placeholder = 'Book title';
    newBookNode.appendChild(newTitleValue);

    let newAuthorLabel = document.createElement('label');
    newAuthorLabel.textContent = ' by ';
    newBookNode.appendChild(newAuthorLabel);
    let newAuthorValue = document.createElement('input');
    newAuthorValue.setAttribute('id', 'newAuthor');
    newAuthorValue.placeholder = 'Author';
    newBookNode.appendChild(newAuthorValue);

    let newPagesValue = document.createElement('input');
    newPagesValue.setAttribute('id', 'newPages');
    newPagesValue.placeholder = 'Number of pages';
    newBookNode.appendChild(newPagesValue);

    let newBookAdd = document.createElement('button');
    newBookAdd.textContent = 'Add';
    newBookAdd.addEventListener('click', addBookToLibrary)
    newBookNode.appendChild(newBookAdd);

    return newBookNode;
}

function addBookToLibrary(event) {
    book = event.target.parentNode;
    title = book.querySelector('#newTitle').value;
    author = book.querySelector('#newAuthor').value;
    pages = parseInt(book.querySelector('#newPages').value);
    isRead = false;

    bookId = myLibraryRemote.push().key;
    myLibraryRemote.child(bookId).set({
        author, title, pages, isRead
    });
}

myLibraryRemote.on('child_added', snapshot => {
    book = snapshot.val();
    bookId = snapshot.key;
    bookNode = toNode(bookId, book.title, book.author, book.pages);
    bookShelf.appendChild(bookNode);
})

function updateBookInLibrary(event) {
    book = event.target.parentNode;
    title = book.querySelector('#newTitle').value;
    author = book.querySelector('#newAuthor').value;
    pages = parseInt(book.querySelector('#newPages').value);
    isRead = false;

    myLibraryRemote.child(book.id).update({
        author, title, pages, isRead
    });
}

myLibraryRemote.on('child_changed', snapshot => {
    book = snapshot.val();
    bookId = snapshot.key;
    bookNode = toNode(bookId, book.title, book.author, book.pages);
    bookShelf.appendChild(bookNode);
})

function removeBookFromLibrary(event) {
    book = event.target.parentNode;
    myLibraryRemote.child(book.id).remove();
}

myLibraryRemote.on('child_removed', snapshot => {
    book = snapshot.val();
    bookId = snapshot.key;
    bookToRemove = bookShelf.querySelector('#' + bookId);
    bookShelf.removeChild(bookToRemove);
})
