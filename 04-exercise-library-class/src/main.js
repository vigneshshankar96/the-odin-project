
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
        newBookClear.addEventListener('click', clearNewBookFields);
    footerButtonContainer.appendChild(newBookClear);
        const newBookAdd = document.createElement('button');
        newBookAdd.setAttribute('class', 'button');
        newBookAdd.setAttribute('type', 'submit');
        newBookAdd.textContent = 'Add';
        newBookAdd.addEventListener('click', addBookToRemoteBookShelf);
    footerButtonContainer.appendChild(newBookAdd);
newBookNode.appendChild(footerButtonContainer);

bookShelf.appendChild(newBookNode);

class Book {
    #id;
    #title;
    #author;
    #pages;
    #isRead;
    #bookNode;

    constructor(id, title, author, pages, isRead) {
        this.#id = id;
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#isRead = isRead;
    }

    createNode() {
        this.#bookNode = document.createElement('div');
        this.#bookNode.setAttribute('class', 'book-template');
        this.#bookNode.setAttribute('id', this.#id);
            const bookNodeTitle = document.createElement('input');
            bookNodeTitle.setAttribute('class', 'title');
            bookNodeTitle.value = this.#title;
        this.#bookNode.appendChild(bookNodeTitle);
            const bookNodeAuthor = document.createElement('input');
            bookNodeAuthor.setAttribute('class', 'author');
            bookNodeAuthor.value = this.#author;
        this.#bookNode.appendChild(bookNodeAuthor);
            const midSubContainer = document.createElement('div');
            midSubContainer.setAttribute('class', 'mid-sub-container');
                const bookNodePages = document.createElement('input');
                bookNodePages.setAttribute('type', 'number');
                bookNodePages.setAttribute('class', 'pages');
                bookNodePages.value = this.#pages;
            midSubContainer.appendChild(bookNodePages);
                const bookNodeIsRead = document.createElement('input');
                bookNodeIsRead.setAttribute('type', 'checkbox');
                bookNodeIsRead.setAttribute('class', 'isRead');
                bookNodeIsRead.checked = this.#isRead;
            midSubContainer.appendChild(bookNodeIsRead);
                const newBookIsReadLabel = document.createElement('label');
                newBookIsReadLabel.innerText = 'Mark as read';
            midSubContainer.appendChild(newBookIsReadLabel);
        this.#bookNode.appendChild(midSubContainer);
            const footerButtonContainer = document.createElement('div');
            footerButtonContainer.setAttribute('class', 'footer-buttons-container');
                const bookNodeUpdate = document.createElement('button');
                bookNodeUpdate.setAttribute('class', 'button');
                bookNodeUpdate.textContent = 'Update';
                bookNodeUpdate.addEventListener('click', updateBookInRemoteBookShelf);
            footerButtonContainer.appendChild(bookNodeUpdate);
                const bookNodeRemove = document.createElement('button');
                bookNodeRemove.setAttribute('class', 'button');
                bookNodeRemove.textContent = 'Remove';
                bookNodeRemove.addEventListener('click', removeBookFromRemoteBookShelf);
            footerButtonContainer.appendChild(bookNodeRemove);
        this.#bookNode.appendChild(footerButtonContainer);
    }

    get node() {
        this.createNode();
        return this.#bookNode;
    }
}

function clearNewBookFields() {
    newBookTitle.value = '';
    newBookAuthor.value = '';
    newBookPages.value = '';
    newBookIsRead.checked = false;
}

function addBookToRemoteBookShelf(event) {
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
    const newBook = new Book(
        bookId, book.title, book.author, book.pages, book.isRead
    );
    bookShelf.appendChild(newBook.node);

    clearNewBookFields();
})

function updateBookInRemoteBookShelf(event) {
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

function removeBookFromRemoteBookShelf(event) {
    const book = event.target.parentNode.parentNode;
    remoteBookShelf.child(book.id).remove();
}

remoteBookShelf.on('child_removed', snapshot => {
    const book = snapshot.val();
    const bookId = snapshot.key;
    const bookToRemove = bookShelf.querySelector('#' + bookId);
    bookShelf.removeChild(bookToRemove);
})
