function doAllTheWork () {
    const myLibrary = [];
    function addBookToLibrary(bookName, bookAuthor, bookYear, bookPages, bookIsRead) {
        // const bookName = prompt("What's the book's name?");
        // const bookAuthor = prompt("Who's the book's author?");
        // const bookYear = prompt("In what year was the book published?");
        const newBookObject = new Book(bookName,bookAuthor,bookYear, bookPages, bookIsRead);
        myLibrary.push(newBookObject);

        function Book(name,author,year,pages,isRead) {
            this.name = name;
            this.author = author;
            this.year = year;
            this.pages = pages;
            this.isRead = isRead;
        }
    addBookToLibrary(bookName, bookAuthor, bookYear, bookPages, bookIsRead);
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
                if (!input.validity.valid) {
                    showError(input, type);
                    event.preventDefault();
                }
                else {
                    errorSection.textContent="";
                    errorSection.className = "error";
                }
            });
        })
        //Check on form submission validity and all the input elements
        form.addEventListener ("submit" , (event) => {
            [bookName, authorName, year, pages, readOrNot].forEach ((input) => {
                const type = input.getAttribute("name");
                if (!input.validity.valid) {
                    showError(input, type);
                    event.preventDefault();
                }
                else {

                }
            })
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
    } checkForm();
}