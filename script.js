const myLibrary = [];

function Book(name,author,year) {
    this.name = name;
    this.author = author;
    this.year = year;
}

function addBookToLibrary() {
    const bookName = prompt("What's the book's name?");
    const bookAuthor = prompt("Who's the book's author?");
    const bookYear = prompt("In what year was the book published?");
    const newBookObject = new Book(bookName,bookAuthor,bookYear);
    myLibrary.push(newBookObject);
}
