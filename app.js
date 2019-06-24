class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // create <tr> element
    const row = document.createElement("tr");
    // append HTML
    row.innerHTML = `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <th class="remove-book"><a href="#" class="x">❌</th>`;
    // append to row
    list.appendChild(row);
  }

  showAlert(message, className) {
    // create div
    const div = document.createElement("div");
    // add classes
    div.className = `alert ${className} u-full-width`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector(".container");
    // insert alert and display
    container.appendChild(div);
    // timeout
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  removeBook(target) {
    if (target.parentElement.className === "remove-book")
      target.parentElement.parentElement.remove();
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static getBooks() {
    // fetch books from local storage
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    // add book to local storage
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(book) {
    const books = Store.getBooks();
    // remove from local storage (avoids removing duplicates)
    for (let i in books) {
      console.log(books[i]);
      if (book === books[i].isbn) books.splice(i, 1);
      break;
    }
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// display books on DOM load
document.addEventListener("DOMContentLoaded", Store.displayBooks());

//EVENT LISTENERS

document.getElementById("book-form").addEventListener("submit", function(e) {
  // get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  // instantiate book and ui
  const book = new Book(title, author, isbn);
  // instantiate UI
  const ui = new UI();
  console.log(ui);
  // validate
  if (title === "" || author === "" || isbn === "") {
    // error alert
    ui.showAlert("Please fill all fields", "error");
  } else {
    // add book to ui
    ui.addBookToList(book);
    console.log(book);
    // store in local storage
    Store.addBook(book);
    // success alert
    ui.showAlert("Book added", "success");
    // clear fields
    ui.clearFields();
  }
  e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", function(e) {
  if (e.target.classList.contains("x")) {
    //instantiate UI
    const ui = new UI();
    // remove book from UI
    ui.removeBook(e.target);
    // remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // display alert
    ui.showAlert("Book removed", "success");
  }
});
