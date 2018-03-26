class Book {
    constructor(title, author, date) {
        this.title = title;
        this.author = author;
        this.date = date;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById("book-list");
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.date}</td>
        <td><a href="#" class="delete"></a></td>
        `;
        list.appendChild(row);
    }
    showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        setTimeout(function(){
            document.querySelector(".alert").remove();
        }, 3000);
    }

    deleteBook(target) {
        if (target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("date").value = "";
    }
}



// EVENT LISTENER FOR ADD BOOK
document.getElementById("book-form").addEventListener("submit", function(e){
    // First we want to submit these fields so let's create the variables
    // Get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const date = document.getElementById("date").value;
    // Once we submit these, we want to instantiate the Book constructor
    // Instantiate a book
    const book = new Book(title, author, date);
    // We want to add a book to the table, the UI object will take care of that
    // Instantiate UI
    const ui = new UI();
    // Validation
    if (title === "" || author === "") {
        // Error alert
        ui.showAlert("Please fill in the fields.");
    } else {
        // Add book to list
        ui.addBookToList(book);
        // Show success
        ui.showAlert("Book added!", "success");
        // Clear fields
        // Just after a book is added to the list
        ui.clearFields();
    }
    // Prevent the form from submitting, stops the intial behavior
    e.preventDefault();
});

// EVENT LISTENER FOR DELETE BOOK
document.getElementById("book-list").addEventListener("click", function (e) {
    // Instantiate UI
    const ui = new UI();
    // Delete book
    ui.deleteBook(e.target);
    // Show an alert
    ui.showAlert("Book removed", "success");
    e.preventDefault();
});