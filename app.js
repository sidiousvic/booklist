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
        <th class="remove-book"><a href="#">❌</th>`;
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

//EVENT LISTENERS
// event listener for form
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

    // success alert
    ui.showAlert("Book added", "success");

    // clear fields
    ui.clearFields();

    // store in local storage
    // storeBookInLocalStorage(book);
  }

  e.preventDefault();
});

// event listener for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  //instantiate UI
  const ui = new UI();
  console.log(ui);
  ui.removeBook(e.target);
  ui.showAlert("Book removed", "success");
});
