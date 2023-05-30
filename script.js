/* eslint-disable max-classes-per-file */
const section = document.querySelector('.books');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  getTitle() {
    return this.title;
  }

  getAuthor() {
    return this.author;
  }
}

class Bookshelf {
  constructor() {
    this.booklist = [];
    this.teal = true;
  }

  addBook(book) {
    if (book.getTitle() !== '' && book.getAuthor() !== '') {
      this.booklist.push(book);
      localStorage.setItem('booklist', JSON.stringify(this.booklist));
    }
  }

  removeBook(book) {
    let x = 0;
    for (let i = 0; i < this.booklist.length; i += 1) {
      if (this.booklist[i].title === book.title) {
        x = i;
      }
    }
    this.booklist.splice(x, 1);
    localStorage.setItem('booklist', JSON.stringify(this.booklist));
  }

  appendToDOM(bookObj) {
    const books = document.querySelector('.books');
    const book = document.createElement('div');
    book.classList.add('book');
    book.innerHTML = `
      <p>"${bookObj.title}" by ${bookObj.author}</p>
      `;

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => {
      book.remove();
      this.removeBook(bookObj);
      localStorage.setItem('booklist', JSON.stringify(this.booklist));
    });

    if (this.teal) {
      book.classList.add('teal');
      removeBtn.classList.add('teal-btn');
      this.teal = false;
    } else {
      this.teal = true;
    }

    book.appendChild(removeBtn);
    books.appendChild(book);
  }

  getBooklist() {
    return this.booklist;
  }

  setBooklist(booklist) {
    section.innerHTML = '';
    this.booklist = booklist;
    booklist.forEach((bookObj) => {
      this.appendToDOM(bookObj);
    });
  }

  restockBookshelf() {
    document.title = 'Awesome Books | All Books';
    section.innerHTML = '<h1>All awesome books</h1>';
    this.booklist.forEach((bookObj) => {
      this.appendToDOM(bookObj);
    });
  }
}

const bookShelf = new Bookshelf();
if (localStorage.getItem('booklist') !== null && localStorage.getItem('booklist').length > 0) {
  bookShelf.setBooklist(JSON.parse(localStorage.getItem('booklist')));
}

const formToggle = document.querySelector('#new');
section.innerHTML = '';
formToggle.addEventListener('click', () => {
  document.title = 'Awesome Books | New Book';
  section.innerHTML = `
    <h2>Add a new book</h2>
    <form class="add-book-form">
      <input type="text" placeholder="Title" id="title" required>
      <input type="text" placeholder="Author" id="author" required>
      <button type="button" class="add-book">Add</button>
    </form>
  `;
  const bookName = document.querySelector('#title');
  const bookAuthor = document.querySelector('#author');
  const addBookBtn = document.querySelector('.add-book');
  const form = document.querySelector('.add-book-form');

  addBookBtn.addEventListener('click', () => {
    const title = bookName.value;
    const author = bookAuthor.value;
    const newBook = new Book(title, author);
    bookShelf.addBook(newBook);
    form.reset();
  });


});

const restockBtn = document.querySelector('#list');
restockBtn.addEventListener('click', () => {
  bookShelf.restockBookshelf();
});


// bookShelf.restockBookshelf();
