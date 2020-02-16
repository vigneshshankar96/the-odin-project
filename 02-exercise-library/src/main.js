
function book(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function() {
        var readStatus = 'not read yet';
        if (this.isRead) {
            readStatus = 'completed read';
        }
        return this.name + ' by ' + this.author + ', ' + this.pages + ' pages, ' + readStatus;
    }
}

theHobbit = new book('The Hobbit',  'J.R.R. Tolkien', 295, true);
console.log(theHobbit.info());
