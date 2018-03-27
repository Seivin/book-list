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

document.getElementById("book-form").addEventListener("submit", function(e){
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const date = document.getElementById("date").value;

    const book = new Book(title, author, date);
    const ui = new UI();

    if (title === "" || author === "") {
        ui.showAlert("Please fill in the fields.");
    } else {
        ui.addBookToList(book);
        ui.showAlert("Book added!", "success");
        ui.clearFields();
    }
    e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", function (e) {
    const ui = new UI();

    ui.deleteBook(e.target);
    ui.showAlert("Book removed", "success");
    e.preventDefault();
});