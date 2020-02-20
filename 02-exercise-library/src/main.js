let myLibraryLocal = [];

const database = firebase.database();
const myLibraryRemote = database.ref('/myLibraryRemote');

function writeData() {
    myLibraryLocal.forEach((book) => {
        myLibraryRemote.child(book.id).set(
            book.asObject
        );
    })
}

function Book(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
    this.id = myLibraryRemote.push().key;

    this.asObject = {
        author, title, pages, isRead
    };

    this.toNode = function() {

        let bookNode = document.createElement('div');
        bookNode.setAttribute('id', this.id);

        let bookNodeTitleLabel = document.createElement('label');
        bookNodeTitleLabel.textContent = 'Title';
        bookNode.appendChild(bookNodeTitleLabel);
        let bookNodeTitleValue = document.createElement('input');
        bookNodeTitleValue.defaultValue = this.title;
        bookNode.appendChild(bookNodeTitleValue);

        let bookNodeAuthorLabel = document.createElement('label');
        bookNodeAuthorLabel.textContent = 'Author';
        bookNode.appendChild(bookNodeAuthorLabel);
        let bookNodeAuthorValue = document.createElement('input');
        bookNodeAuthorValue.defaultValue = this.author;
        bookNode.appendChild(bookNodeAuthorValue);

        let bookNodePagesLabel = document.createElement('label');
        bookNodePagesLabel.textContent = 'Number of pages';
        bookNode.appendChild(bookNodePagesLabel);
        let bookNodePagesValue = document.createElement('input');
        bookNodePagesValue.defaultValue = this.pages;
        bookNode.appendChild(bookNodePagesValue);

        let bookNodeUpdate = document.createElement('button');
        bookNodeUpdate.textContent = 'Update';
        bookNode.appendChild(bookNodeUpdate);

        let bookNodeRemove = document.createElement('button');
        bookNodeRemove.textContent = 'Remove';
        bookNodeRemove.addEventListener('click', removeFromLibrary);
        bookNode.appendChild(bookNodeRemove);

        return bookNode;
    }
}

function renderLibrary() {
    bookShelf = document.querySelector('book-shelf');
    while (bookShelf.firstChild) {
        bookShelf.removeChild(bookShelf.firstChild);
    }
    bookShelf.appendChild(new createAddNewBookNode())
    myLibraryLocal.forEach(book => {
        bookNode = book.toNode();
        bookShelf.appendChild(bookNode);
    });
    writeData()
}

function createAddNewBookNode() {
    let newBookNode = document.createElement('div');

    let newTitleLabel = document.createElement('label');
    newTitleLabel.textContent = 'Title';
    newBookNode.appendChild(newTitleLabel);
    let newTitleValue = document.createElement('input');
    newTitleValue.setAttribute('id', 'newTitle');
    newBookNode.appendChild(newTitleValue);

    let newAuthorLabel = document.createElement('label');
    newAuthorLabel.textContent = 'Author';
    newBookNode.appendChild(newAuthorLabel);
    let newAuthorValue = document.createElement('input');
    newAuthorValue.setAttribute('id', 'newAuthor');
    newBookNode.appendChild(newAuthorValue);

    let newPagesLabel = document.createElement('label');
    newPagesLabel.textContent = 'Number of pages';
    newBookNode.appendChild(newPagesLabel);
    let newPagesValue = document.createElement('input');
    newPagesValue.setAttribute('id', 'newPages');
    newBookNode.appendChild(newPagesValue);

    let newBookAdd = document.createElement('button');
    newBookAdd.textContent = 'Add';
    newBookAdd.addEventListener('click', createBookAndAddToLibrary);
    newBookNode.appendChild(newBookAdd);

    return newBookNode;
}

function createBookAndAddToLibrary(event) {
    book = event.target.parentNode;
    newBookTitle = book.querySelector('#newTitle').value;
    newBookAuthor = book.querySelector('#newAuthor').value;
    newBookPages = parseInt(book.querySelector('#newPages').value);
    newBook = new Book(newBookAuthor, newBookTitle, newBookPages, false);
    addToLibrary(newBook, atTheBeginning=true);
}

function addToLibrary(book, atTheBeginning=false) {
    if (atTheBeginning) {
        myLibraryLocal.unshift(book);
    } else {
        myLibraryLocal.push(book);
    }
    myLibraryRemote.child(book.id).set(
        book.asObject
    );
    renderLibrary();
}

function removeFromLibrary(event) {
    bookId = event.target.parentNode.getAttribute('id');
    myLibraryLocal = myLibraryLocal.filter(book => 
        book.id !== bookId
    );
    myLibraryRemote.child(bookId).remove();
    renderLibrary();
}

addToLibrary(new Book('Frank Herbert', 'Dune', 600, false));
addToLibrary(new Book('Kurt Vonnegut', 'The Sirens of Titan', 300, true));
addToLibrary(new Book('Blake Crouch', 'Recursion', 400, true));
addToLibrary(new Book('Stuart Turton', 'The Seven Deaths of Evelyn Hardcastle',350, true));
addToLibrary(new Book('J.R.R. Tolkien', 'The Hobbit', 295, true));
