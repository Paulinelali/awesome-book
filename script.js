const addBookBtn = document.querySelector('.add-book');
const bookName = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const form = document.querySelector('.add-book-form');

//Check local storage for booklist
let booklist = JSON.parse(localStorage.getItem('booklist')) || [];
if (booklist.length > 0) {
    booklist.forEach(book => {
        bookName.value = book.title;
        bookAuthor.value = book.author;
        addBook();
        form.reset();
    });
};

addBookBtn.addEventListener('click', addBook)


function addBook() {
    const bookObj = {
        title: bookName.value,
        author: bookAuthor.value,
    }
    booklist.push(bookObj);
    localStorage.setItem('booklist', JSON.stringify(booklist))

    const books = document.querySelector('.books');
    console.log(books);
    const book = document.createElement('div');
    book.classList.add('book');
    book.innerHTML = `
    <p>${bookObj.title}</p>
    <p>${bookObj.author}</p>
    `;

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'Remove';
    removeBtn.addEventListener('click', () => {
        //remove book from bookList
    });
    book.appendChild(removeBtn);
    books.appendChild(book);

    form.reset();
}

// localStorage.clear();
