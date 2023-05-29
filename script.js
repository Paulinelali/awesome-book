const addBookBtn = document.querySelector('.add-book');
const bookName = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const form = document.querySelector('.add-book-form');

//Check local storage for booklist
let booklist = [];
if (localStorage.getItem('booklist') !== null) {
    booklist = JSON.parse(localStorage.getItem('booklist'));
}
if (booklist.length > 0) {
    booklist.forEach(book => {
        appendToDOM(book.title, book.author);
    });
};

function appendToDOM(title, author) {
    const bookObj = {
        title: title,
        author: author,
    };
    const books = document.querySelector('.books');
    const book = document.createElement('div');
    book.classList.add('book');
    book.innerHTML = `
    <p>${bookObj.title}</p>
    <p>${bookObj.author}</p>
    `;

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'Remove';
    removeBtn.addEventListener('click', () => {
        book.remove();
        removeBook(bookObj);
        localStorage.setItem('booklist', JSON.stringify(booklist));
    });
    book.appendChild(removeBtn);
    books.appendChild(book);
}

addBookBtn.addEventListener('click', addBook)


function addBook() {
    if (bookName.value !== '' && bookAuthor.value !== '') {
        
    
    const bookObj = {
        title: bookName.value,
        author: bookAuthor.value,
    }

    booklist.push(bookObj);
    localStorage.setItem('booklist', JSON.stringify(booklist));
    appendToDOM(bookObj.title, bookObj.author);

    form.reset();
}
}

// localStorage;
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
