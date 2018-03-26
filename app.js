// BOOK CONSTRUCTOR
// Handle creating the book object 
function Book(date, title, author) {
    this.date = date;
    this.title = title;
    this.author = author;
}



// UI CONSTRUCTOR
// Set of prototype methods to add and delete the books, and show the alerts
function UI() {}
// Empty function, everything else will go inside the prototype

// Add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById("book-list");
    // Create a tr element
    const row = document.createElement("tr");
    // Insert cols
    row.innerHTML = `
    <td>${book.date}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td><a href="#" class="delete"></a></td>
    `;

    list.appendChild(row);
}

// Show alert
UI.prototype.showAlert = function(message, className) {
    // Create a div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3s
    setTimeout(function() {
        document.querySelector(".alert").remove();
    }, 3000);
}

// Delete book
UI.prototype.deleteBook = function(target) {
    if (target.className === "delete") {
        // <td> then <tr>, (basic DOM traversing), remove it from the DOM
        target.parentElement.parentElement.remove();
    }
}

// Clear fields
UI.prototype.clearFields = function() {
    document.getElementById("date").value = "";
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
}



// EVENT LISTENER FOR ADD BOOK
document.getElementById("book-form").addEventListener("submit", function(e){
    // First we want to submit these fields so let's create the variables
    // Get form values
    const date = document.getElementById("date").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    
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

    // Prevent the form from submitting, stops the initial behavior
    e.preventDefault();
});

// EVENT LISTENER FOR DELETE BOOK
document.getElementById("book-list").addEventListener("click", function(e) {

    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Show an alert
    ui.showAlert("Book removed", "success");

    e.preventDefault();
});