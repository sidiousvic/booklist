// book constuctor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

// add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");

  // create <tr> element
  const row = document.createElement("tr");
  // append HTML
  row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <th class="delete-book"><a href="#">❌</th>`;
  // append to row
  list.appendChild(row);
};

// show alert
UI.prototype.showAlert = function(message, className) {
  // create div
  const div = document.createElement("div");
  // add classes
  div.className = `alert ${className} u-full-width`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector(".container");
  const form = document.querySelector("h1");
  // insert alert and display
  container.appendChild(div);
  // timeout
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

// remove item
UI.prototype.removeBook = function(target) {
  if (target.parentElement.className === "delete-book")
    target.parentElement.parentElement.remove();
};

// clear fields
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// event listeners
document.getElementById("book-form").addEventListener("submit", function(e) {
  // get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  // instantiate book and ui
  const book = new Book(title, author, isbn);

  // instantiate UI
  const ui = new UI();

  // validate
  if (title === "" || author === "" || isbn === "") {
    // error alert
    return ui.showAlert("Please fill all fields", "error");
  }
  // add book to ui
  ui.addBookToList(book);
  // success alert
  ui.showAlert("Book added", "success");

  // clear fields
  ui.clearFields();

  // store in local storage
  //   storeBookInLocalStorage(book);

  e.preventDefault();
});

// event listener for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  //instantiate UI
  const ui = new UI();
  ui.removeBook(e.target);
  ui.showAlert("Book removed", "success");
});
