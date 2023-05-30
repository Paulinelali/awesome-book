/* eslint-disable max-classes-per-file */
const addBookBtn = document.querySelector('.add-book');
const bookName = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const form = document.querySelector('.add-book-form');

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
      this.appendToDOM(book);
      form.reset();
    }
  }

  removeBook(book) {
    let x = 0;
    for (let i = 0; i < this.booklist.length; i += 1) {
      if (this.booklist[i].title === book.title) {
        x = i;
      }
    }
    booklist.splice(x, 1);
    localStorage.setItem('booklist', JSON.stringify(booklist));
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
      localStorage.setItem('booklist', JSON.stringify(booklist));
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
    this.booklist = booklist;
    booklist.forEach((bookObj) => {
      this.appendToDOM(bookObj);
    });
  }
}

const bookShelf = new Bookshelf();
if (localStorage.getItem('booklist') !== null && localStorage.getItem('booklist').length > 0) {
  bookShelf.setBooklist(JSON.parse(localStorage.getItem('booklist')));
}
addBookBtn.addEventListener('click', () => {
  const title = bookName.value;
  const author = bookAuthor.value;
  const newBook = new Book(title, author);
  bookShelf.addBook(newBook);
});
