const addBookBtn = document.querySelector('.add-book');
const bookName = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
addBookBtn.addEventListener('click', addBook)

let bookList = [];

function addBook() {
    const bookObj = {
        title: bookName.value,
        author: bookAuthor.value,
    }
    bookList.push(bookObj);

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

    localStorage.setItem('booklist', JSON.stringify(booklist))
    document.querySelector('.add-book-form').reset();
}
