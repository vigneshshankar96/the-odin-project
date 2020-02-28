
const database = firebase.database();
const remoteBookShelf = database.ref('/remoteBookShelf');

const bookShelf = document.querySelector('book-shelf');

const newBookNode = document.createElement('div');
newBookNode.setAttribute('class', 'book-template');
    const newBookTitle = document.createElement('input');
    newBookTitle.setAttribute('class', 'title');
    newBookTitle.placeholder = 'Book title';
newBookNode.appendChild(newBookTitle);
    const newBookAuthor = document.createElement('input');
    newBookAuthor.setAttribute('class', 'author');
    newBookAuthor.placeholder = 'Author';
newBookNode.appendChild(newBookAuthor);
    const midSubContainer = document.createElement('div');
    midSubContainer.setAttribute('class', 'mid-sub-container');
        const newBookPages = document.createElement('input');
        newBookPages.setAttribute('type', 'number');
        newBookPages.setAttribute('class', 'pages');
        newBookPages.placeholder = 'Total pages';
    midSubContainer.appendChild(newBookPages);
        const newBookIsRead = document.createElement('input');
        newBookIsRead.setAttribute('type', 'checkbox');
        newBookIsRead.setAttribute('class', 'isRead');
    midSubContainer.appendChild(newBookIsRead);
        const newBookIsReadLabel = document.createElement('label');
        newBookIsReadLabel.innerText = 'Mark as read';
    midSubContainer.appendChild(newBookIsReadLabel);
newBookNode.appendChild(midSubContainer);
    const footerButtonContainer = document.createElement('div');
    footerButtonContainer.setAttribute('class', 'footer-buttons-container');
        const newBookClear = document.createElement('button');
        newBookClear.setAttribute('class', 'button');
        newBookClear.setAttribute('type', 'reset');
        newBookClear.textContent = 'Clear';
        newBookClear.addEventListener('click', clearNewBookFields)
    footerButtonContainer.appendChild(newBookClear);
        const newBookAdd = document.createElement('button');
        newBookAdd.setAttribute('class', 'button');
        newBookAdd.setAttribute('type', 'submit');
        newBookAdd.textContent = 'Add';
        newBookAdd.addEventListener('click', addBookToLibrary)
    footerButtonContainer.appendChild(newBookAdd);
newBookNode.appendChild(footerButtonContainer);

bookShelf.appendChild(newBookNode)

function createBookNode(id, title, author, pages, isRead) {
    const bookNode = document.createElement('div');
    bookNode.setAttribute('class', 'book-template');
    bookNode.setAttribute('id', id);
        const bookNodeTitle = document.createElement('input');
        bookNodeTitle.setAttribute('class', 'title');
        bookNodeTitle.value = title;
    bookNode.appendChild(bookNodeTitle);
        const bookNodeAuthor = document.createElement('input');
        bookNodeAuthor.setAttribute('class', 'author');
        bookNodeAuthor.value = author;
    bookNode.appendChild(bookNodeAuthor);
        const midSubContainer = document.createElement('div');
        midSubContainer.setAttribute('class', 'mid-sub-container');
            const bookNodePages = document.createElement('input');
            bookNodePages.setAttribute('type', 'number');
            bookNodePages.setAttribute('class', 'pages');
            bookNodePages.value = pages;
        midSubContainer.appendChild(bookNodePages);
            const bookNodeIsRead = document.createElement('input');
            bookNodeIsRead.setAttribute('type', 'checkbox');
            bookNodeIsRead.setAttribute('class', 'isRead');
            bookNodeIsRead.checked = isRead;
        midSubContainer.appendChild(bookNodeIsRead);
            const newBookIsReadLabel = document.createElement('label');
            newBookIsReadLabel.innerText = 'Mark as read';
        midSubContainer.appendChild(newBookIsReadLabel);
    bookNode.appendChild(midSubContainer);
        const footerButtonContainer = document.createElement('div');
        footerButtonContainer.setAttribute('class', 'footer-buttons-container');
            const bookNodeUpdate = document.createElement('button');
            bookNodeUpdate.setAttribute('class', 'button');
            bookNodeUpdate.textContent = 'Update';
            bookNodeUpdate.addEventListener('click', updateBookInLibrary);
        footerButtonContainer.appendChild(bookNodeUpdate);
            const bookNodeRemove = document.createElement('button');
            bookNodeRemove.setAttribute('class', 'button');
            bookNodeRemove.textContent = 'Remove';
            bookNodeRemove.addEventListener('click', removeBookFromLibrary);
        footerButtonContainer.appendChild(bookNodeRemove);
    bookNode.appendChild(footerButtonContainer);

    return bookNode;
}

function clearNewBookFields() {
    newBookTitle.value = '';
    newBookAuthor.value = '';
    newBookPages.value = '';
    newBookIsRead.checked = false;
}

function addBookToLibrary(event) {
    const bookId = remoteBookShelf.push().key;
    remoteBookShelf.child(bookId).set({
        author: newBookAuthor.value,
        title: newBookTitle.value,
        pages: parseInt(newBookPages.value),
        isRead: newBookIsRead.checked
    });
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

function updateBookInLibrary(event) {
    const book = event.target.parentNode.parentNode;
        const title = book.querySelector('.title').value;
        const author = book.querySelector('.author').value;
        const pages = parseInt(book.querySelector('.pages').value);
        const isRead = book.querySelector('.isRead').checked;

    remoteBookShelf.child(book.id).update({
        author, title, pages, isRead
    });
}

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
