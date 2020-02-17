let myLibrary = [];

function Book(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
    this.createId = function() {
        return 'xxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
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
        let bookNodeDelete = document.createElement('button');

        bookNodeTitle.textContent = this.title;
        bookNodeAuthor.textContent = 'by ' + this.author;
        bookNodePages.textContent = this.pages + ' pages';
        bookNodeDelete.textContent = 'Remove';

        bookNode.appendChild(bookNodeTitle);
        bookNode.appendChild(bookNodeAuthor);
        bookNode.appendChild(bookNodePages);
        bookNodeDelete.addEventListener('click', removeFromLibrary);
        bookNode.appendChild(bookNodeDelete);

        return bookNode;
    }
}

function renderLibrary() {
    bookShelf = document.querySelector('book-shelf');
    while (bookShelf.firstChild) {
        bookShelf.removeChild(bookShelf.firstChild);
    }
    myLibrary.forEach(book => {
        bookNode = book.toNode();
        bookShelf.appendChild(bookNode);
    });
}

function addToLibrary(book) {
    myLibrary.push(book);
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
