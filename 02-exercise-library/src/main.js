let myLibrary = [];

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

    this.info = function() {
        let readStatus = 'not read yet';
        if (this.isRead) {
            readStatus = 'completed read';
        }
        return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + readStatus;
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
    bookShelf.appendChild(new createNewBookNode())
    myLibrary.forEach(book => {
        bookNode = book.toNode();
        bookShelf.appendChild(bookNode);
    });
}

function createNewBookNode() {
    let newBookNode = document.createElement('div');
    let newBookNodeTitle = document.createElement('input');
    let newBookNodeAuthor = document.createElement('input');
    let newBookNodePages = document.createElement('input');
    let newBookNodeAdd = document.createElement('button');

    newBookNodeTitle.setAttribute('id', 'newTitle');
    newBookNodeAuthor.setAttribute('id', 'newAuthor');
    newBookNodePages.setAttribute('id', 'newPages');
    newBookNodeAdd.textContent = 'Add';

    newBookNode.appendChild(newBookNodeTitle);
    newBookNode.appendChild(newBookNodeAuthor);
    newBookNode.appendChild(newBookNodePages);
    newBookNodeAdd.addEventListener('click', createBookAndAddToLibrary);
    newBookNode.appendChild(newBookNodeAdd);

    return newBookNode;
}

function createBookAndAddToLibrary(event) {
    book = event.target.parentNode;
    newBookTitle = book.querySelector('#newTitle').value;
    newBookAuthor = book.querySelector('#newAuthor').value;
    newBookPages = parseInt(book.querySelector('#newPages').value);
    newBook = new Book(newBookTitle, newBookAuthor, newBookPages, false);
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
addToLibrary(new Book('Stuart Turton', 'The seven deaths of Evelyn Hardcastle',350, true));
addToLibrary(new Book('J.R.R. Tolkien', 'The Hobbit', 295, true));
