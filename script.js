const addBookBtn = document.querySelector('.add-book');
const bookName = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const form = document.querySelector('.add-book-form');
​
let booklist = [];
​
class book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
​
  getTitle() {
    return this.title;
  }
​
  getAuthor() {
    return this.author;
  }
};
​
class bookshelf {
  constructor() {
    this.booklist = [];
    this.teal = true;
  }
​
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
}



function removeBook(book) {
  let x = 0;
  for (let i = 0; i < booklist.length; i += 1) {
    if (booklist[i].title === book.title) {
      x = i;
    }
  }
  booklist.splice(x, 1);
  localStorage.setItem('booklist', JSON.stringify(booklist));
}
let teal = true;
function appendToDOM(title, author) {
  const bookObj = {
    title,
    author,
  };
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
    removeBook(bookObj);
    localStorage.setItem('booklist', JSON.stringify(booklist));
  });

  if (teal) {
    book.classList.add('teal');
    removeBtn.classList.add('teal-btn');
    teal = false;
  } else {
    teal = true;
  };

  book.appendChild(removeBtn);
  books.appendChild(book);
}

// Check local storage for booklist

if (localStorage.getItem('booklist') !== null) {
  booklist = JSON.parse(localStorage.getItem('booklist'));
}
if (booklist.length > 0) {
  booklist.forEach((book) => {
    appendToDOM(book.title, book.author);
  });
}

function addBook() {
  if (bookName.value !== '' && bookAuthor.value !== '') {
    const bookObj = {
      title: bookName.value,
      author: bookAuthor.value,
    };

    booklist.push(bookObj);
    localStorage.setItem('booklist', JSON.stringify(booklist));
    appendToDOM(bookObj.title, bookObj.author);

    form.reset();
  }
}
addBookBtn.addEventListener('click', addBook);

// 
