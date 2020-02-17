let myLibrary = [];

const myLibraryDb = firebase.database().ref('/myLibrary');

function writeData() {
    myLibrary.forEach((book, idx) => {
        myLibraryDb.child(book.id).set(
            book.toObject()
        );
    })
}

function Book(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
    this.createId = function() {
        return 'xxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    this.id = this.createId();

    this.toObject = function() {
        return {
            author: this.author,
            title: this.title,
            pages: this.pages,
            isRead: this.isRead
        };
    }

    this.toNode = function() {

        let bookNode = document.createElement('div');
        bookNode.setAttribute('id', this.id);
        let bookNodeTitle = document.createElement('h2');
        let bookNodeAuthor = document.createElement('div');
        let bookNodePages = document.createElement('div');
        let bookNodeRemove = document.createElement('button');

        bookNodeTitle.textContent = this.title;
        bookNodeAuthor.textContent = 'by ' + this.author;
        bookNodePages.textContent = this.pages + ' pages';
        bookNodeRemove.textContent = 'Remove';

        bookNode.appendChild(bookNodeTitle);
        bookNode.appendChild(bookNodeAuthor);
        bookNode.appendChild(bookNodePages);
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
    myLibrary.forEach(book => {
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
    addToLibrary(newBook, toTheBeginning=true);
}

function addToLibrary(book, toTheBeginning=false) {
    if (toTheBeginning) {
        myLibrary.unshift(book);
    } else {
        myLibrary.push(book);
    }
    renderLibrary();
}

function removeFromLibrary(event) {
    bookId = event.target.parentNode.getAttribute('id');
    myLibrary = myLibrary.filter(book => 
        book.id !== bookId
    );
    renderLibrary();
}

addToLibrary(new Book('Frank Herbert', 'Dune', 600, false));
addToLibrary(new Book('Kurt Vonnegut', 'The Sirens of Titan', 300, true));
addToLibrary(new Book('Blake Crouch', 'Recursion', 400, true));
addToLibrary(new Book('Stuart Turton', 'The Seven Deaths of Evelyn Hardcastle',350, true));
addToLibrary(new Book('J.R.R. Tolkien', 'The Hobbit', 295, true));
