class Library {
    constructor (){
        this.library = [];
        this.#setInitialLibrary();
    }
    addBook ({number, name,author,year,pages,isRead}) {
        this.library.push({number, name, author, year, pages, isRead});
    }
    removeBook (number) {
        this.library.splice(number-1, 1);
        this.#updateBookNumbers();
    }
    #updateBookNumbers () {
        this.library.forEach ( (book, index) => {
            book.number = index+1;
        } )
    }
    #setInitialLibrary () {
        this.library.push({number:1, name:"Jaraed", author:"Mammad", year: 1984, pages: 134, isRead: true});
    }
    get getLibrary() {
        return this.library;
    }
}
class Table {
    constructor (libraryObject) {
        this.libraryObject=libraryObject;
    }
    update () {
        const tableNode = document.querySelector(".table");
        const tbodyNode = tableNode.querySelector("tbody");
        const library = this.libraryObject.getLibrary;
        tbodyNode.innerHTML='';
        library.forEach ( (bookRowObject , index) => {
            let row = tbodyNode.insertRow(-1);
            bookRowObject.number = index+1;

            [bookRowObject.number, bookRowObject.name, bookRowObject.author ,
            bookRowObject.year, bookRowObject.pages] .forEach ( (field, index) => {
                    let cell = row.insertCell(index);
                    cell.innerHTML = field;
                } )
            let cell = row.insertCell(-1);
            cell.innerHTML = '<input type="checkbox">';

            const deletCell = row.insertCell(-1);
            deletCell.innerHTML = '<button class="delete">Delete</button>';
            console.log("update table function");
        })
        this.#setDeleteButtonsFunctionality();
    }
    #setDeleteButtonsFunctionality () {
        const deleteButtons = document.querySelectorAll(".table tbody button[class='delete']");
        const isReadCheckButtons = document.querySelectorAll(".table tbody input[type='checkbox']");
        deleteButtons.forEach ( (button) => {
            button.addEventListener ("click", (event) => {
                const rowNumber = event.target.parentNode.parentNode.rowIndex;
                console.log(rowNumber);
                this.libraryObject.removeBookFromLibrary(rowNumber);
                this.update();
                console.log(this.libraryObject);
        })
        })
    }
}


function doAllTheWork () {
    const myLibrary = [{number:1, name:"Jaraed", author:"Mammad", year: 1984, pages: 134, isRead: true}];
    function addBookToLibrary(bookName, bookAuthor, bookYear, bookPages, bookIsRead) {
        // const bookName = prompt("What's the book's name?");
        // const bookAuthor = prompt("Who's the book's author?");
        // const bookYear = prompt("In what year was the book published?");
        const newBookObject = new Book(0, bookName,bookAuthor,bookYear, bookPages, bookIsRead);
        myLibrary.push(newBookObject);
        updateTable();
        // function addToTable () {
        //     const table = document.querySelector(".table");
        //     const row = table.insertRow(-1);
        //     const rowNumber = table.querySelector("tbody").childElementCount;
        //     const rowNumberCell = row.insertCell(0);
        //     rowNumberCell.innerHTML = rowNumber;
        //     //Put data information in cells in rows
        //     [bookName, bookAuthor, bookYear, bookPages, bookIsRead].forEach ( (tableField, index) => {
        //         let cell = row.insertCell(index + 1);
        //         cell.innerHTML = tableField;
        //     } )
        //     const deletCell = row.insertCell(-1);
        //     deletCell.innerHTML = '<button class="delete">Delete</button>';
        //     addRemoveBooksFunction();
        // }
        function Book(number, name,author,year,pages,isRead) {
            this.number = number;
            this.name = name;
            this.author = author;
            this.year = year;
            this.pages = pages;
            this.isRead = isRead;
        }
    }
    function updateTable () {
        const table = document.querySelector(".table");
        const tbody = table.querySelector("tbody");
        tbody.innerHTML='';
        myLibrary.forEach ( (bookRowObject , index) => {
            let row = tbody.insertRow(-1);
            bookRowObject.number = index+1;

            [bookRowObject.number, bookRowObject.name, bookRowObject.author ,
                bookRowObject.year, bookRowObject.pages].forEach ( (field, index) => {
                    let cell = row.insertCell(index);
                    cell.innerHTML = field;
                } )
            let cell = row.insertCell(-1);
            cell.innerHTML = '<input type="checkbox">';

            const deletCell = row.insertCell(-1);
            deletCell.innerHTML = '<button class="delete">Delete</button>';
            console.log("update table function");
        })
        addRemoveToggleBooksFunction();
    }
    function addRemoveToggleBooksFunction () {  
        const deleteButtons = document.querySelectorAll(".table tbody button[class='delete']");
        const isReadCheckButtons = document.querySelectorAll(".table tbody input[type='checkbox']");
        deleteButtons.forEach ( (button) => {
            button.addEventListener ("click", (event) => {
                const rowNumber = event.target.parentNode.parentNode.rowIndex;
                console.log(rowNumber);
                myLibrary.splice(rowNumber-1, 1);
                updateTable();
                console.log(myLibrary);
                myLibrary.forEach ( (book, index) => {
                    book.number = index+1;
                } )
        })
        })
    }
    function checkForm () {
        const form = document.querySelector(".form");
        const bookName = document.querySelector(".form > :nth-child(1) > input");
        const authorName = document.querySelector(".form > :nth-child(2) > input");
        const year = document.querySelector(".form > :nth-child(3) > input");
        const pages = document.querySelector(".form > :nth-child(4) > input");
        const readOrNot = document.querySelector(".form > :nth-child(5) > input");
        const submit = document.querySelector(".form > :nth-child(6)");
        const errorElements = document.querySelectorAll(".form .error");
        //Check on each form's input elements, one by one
        [bookName, authorName, year, pages, readOrNot].forEach ((input) => {
            const errorSection = input.nextElementSibling;
            const type = input.getAttribute("name");
            input.addEventListener("input" , (event) => {
                if (type !== "read-or-not" && !input.validity.valid) {
                    showError(input, type);
                    event.preventDefault();
                }
                else {
                    errorSection.textContent="";
                    errorSection.className = "error";
                }
            });
        })
        //Add books to the library array and also
        //check on form submission validity and all the input elements
        form.addEventListener ("submit" , (event) => {
            let isThereError = false;
            [bookName, authorName, year, pages, readOrNot].forEach ((input) => {
                const type = input.getAttribute("name");
                if (type !== "read-or-not" && !input.validity.valid) {
                    isThereError = true;
                    showError(input, type);

                    event.preventDefault();
                }
            });
            if (!isThereError) {
                addBookToLibrary(bookName.value,
                authorName.value, year.value,
                pages.value, readOrNot.checked);

                console.log(myLibrary);
                [bookName, authorName, year, pages, readOrNot].forEach ((input) => {
                    input.value="";
                });
                event.preventDefault();
            }
        })

        function showError (field , type) {
            const errorSection = field.nextElementSibling;
            if (field.validity.valueMissing) {
                errorSection.textContent = "Enter " + type;
            }
            else if (field.validity.typeMismatch) {
                errorSection.textContent = "Entered value needs to be " + type;
            }
            errorSection.className = "error active";
        }
    }
    addRemoveToggleBooksFunction();
    checkForm();
}
// doAllTheWork();
