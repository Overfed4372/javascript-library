(function () {
    class Library {
        constructor (){
            this.library = [];
            this.#setInitialLibrary();
        }
        addBook ({name,author,year,pages,isRead}) {
            this.library.push({name, author, year, pages, isRead});
            this.#updateBookNumbers();
        }
        removeBook (number) {
            this.library.splice(number-1, 1);
            this.#updateBookNumbers();
        }
        checkReadBook (number,isRead) {
            this.library[number-1].isRead = isRead;
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
            this.update();
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
                bookRowObject.isRead === true? cell.childNodes[0].click(): "";
    
                const deletCell = row.insertCell(-1);
                deletCell.innerHTML = '<button class="delete">Delete</button>';
                //console.log("update table function");
            })
            this.#setDeleteButtonsFunctionality();
            this.#setReadButtonsFunctionallity();
        }
        #setDeleteButtonsFunctionality () {
            const deleteButtons = document.querySelectorAll(".table tbody button[class='delete']");
            deleteButtons.forEach ( (button) => {
                button.addEventListener ("click", (event) => {
                    const rowNumber = event.target.parentNode.parentNode.rowIndex;
                    //console.log(rowNumber);
                    this.libraryObject.removeBook(rowNumber);
                    this.update();
                    // console.log(this.libraryObject);
            })
            })
        }
        #setReadButtonsFunctionallity () {
            const isReadButtons = document.querySelectorAll(".table tbody input[type='checkbox']");
            isReadButtons.forEach ( (button) => {
                button.addEventListener("click" , (event) => {
                    const rowNumber = event.target.parentNode.parentNode.rowIndex;
                    event.target.checked ? this.libraryObject.checkReadBook(rowNumber,true) 
                    : this.libraryObject.checkReadBook(rowNumber,false);
                    // console.log(this.libraryObject);
                } );  
            }  );
        }
    }
    class Form {
        static #form = document.querySelector(".form");
        static #bookName = Form.#form.querySelector(":nth-child(1) > input");
        static #authorName = Form.#form.querySelector(":nth-child(2) > input");
        static #year = Form.#form.querySelector(":nth-child(3) > input");
        static #pages = Form.#form.querySelector(":nth-child(4) > input");
        static #readOrNot = Form.#form.querySelector(":nth-child(5) > input");
        static #submit = Form.#form.querySelector(":nth-child(6)");
        static #errorElements = Form.#form.querySelectorAll(".error");
        constructor (libraryObject, tableObject) {
            this.libraryObject = libraryObject;
            this.tableObject = tableObject;
        }
        check () {
            [Form.#bookName, Form.#authorName, Form.#year, Form.#pages, Form.#readOrNot]
            .forEach ((input) => {
                const errorSection = input.nextElementSibling;
                const type = input.getAttribute("name");
                input.addEventListener("input" , (event) => {
                    if (type !== "read-or-not" && !input.validity.valid) {
                        Form.#showError(input, type);
                        event.preventDefault();
                    }
                    else {
                        errorSection.textContent="";
                        errorSection.className = "error";
                    }
                });
            })
            //Add books to the library and table objects and also
            //check on form submission validity and all the input elements
            Form.#form.addEventListener ("submit" , (event) => {
                let isThereError = false;
                [Form.#bookName, Form.#authorName, Form.#year, Form.#pages, Form.#readOrNot]
                .forEach ((input) => {
                    const type = input.getAttribute("name");
                    if (type !== "read-or-not" && !input.validity.valid) {
                        isThereError = true;
                        Form.#showError(input, type);
                        event.preventDefault();
                    }
                });
                if (!isThereError) {
                    this.libraryObject.addBook
                    ({name: Form.#bookName.value,
                    author: Form.#authorName.value, 
                    year: Form.#year.value,
                    pages: Form.#pages.value, 
                    isRead: Form.#readOrNot.checked});
                    this.tableObject.update();
    
                    //console.log(this.libraryObject);
                    [Form.#bookName, Form.#authorName, Form.#year, Form.#pages, Form.#readOrNot]
                    .forEach ((input) => {
                        input.value="";
                    });
                    event.preventDefault();
                }
            })
        }
        static #showError (field , type) {
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
    const library = new Library ();
    const table = new Table (library);
    const form = new Form (library, table);

    form.check();
}
)();
