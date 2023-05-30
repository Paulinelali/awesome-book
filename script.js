/* eslint-disable max-classes-per-file */
const addBookBtn = document.querySelector('.add-book');
const bookName = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const form = document.querySelector('.add-book-form');

let booklist = [];

class book {
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
};

class bookshelf {
  constructor() {
    this.booklist = [];
    this.teal = true;
  }

  addBook(book) {
    if (book.getTitle() !== '' && book.getAuthor() !== '') {
      const bookObj = {
        title: this.title,
        author: this.author,
      };
      this.booklist.push(book);
      console.log(this.booklist);
      localStorage.setItem('booklist', JSON.stringify(this.booklist));
      this.appendToDOM(book);
      form.reset();
    };
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
    };

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

const bookShelf = new bookshelf();
if (localStorage.getItem('booklist') !== null) {
  booklist = JSON.parse(localStorage.getItem('booklist'));
}
if (booklist.length > 0) {
  bookShelf.setBooklist(booklist);
}
addBookBtn.addEventListener('click', () => {
  const title = bookName.value;
  const author = bookAuthor.value;
  const newBook = new book(title, author);
  bookShelf.addBook(newBook);
});
